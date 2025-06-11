'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import QuillEditor from '@/components/QuillEditor';
import withAuth from '@/auth/withAuth';
import PageHeader from '@/components/PageHeader';
import { db, auth, storage } from '@/lib/firebase'; // Added storage
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Storage functions
import Image from 'next/image'; // For image preview
import { Progress } from '@/components/ui/progress'; // For upload progress

function AddNewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Image upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    // Clean up object URL
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      setUploadProgress(0); // Reset progress for new file
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setIsUploadingImage(false); // Reset image uploading state initially
    setUploadProgress(0);

    if (title.trim() === '' || slug.trim() === '' || (content.trim() === '' || content === '<p><br></p>')) {
      setError('Title, Slug, and Content are required.');
      setIsLoading(false);
      return;
    }
    if (!auth.currentUser) {
      setError('You must be logged in to create a post.');
      setIsLoading(false);
      return;
    }

    console.log('Current user UID:', auth.currentUser.uid);

    let featuredImageUrl = '';

    if (imageFile) {
      setIsUploadingImage(true);
      const imageRef = ref(storage, `blogImages/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      try {
        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (uploadError) => {
              console.error("Upload Error:", uploadError);
              setError(`Image upload failed: ${uploadError.message}`);
              reject(uploadError);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                featuredImageUrl = downloadURL;
                resolve();
              } catch (urlError) {
                console.error("Get URL Error:", urlError);
                setError(`Failed to get image URL: ${urlError.message}`);
                reject(urlError);
              }
            }
          );
        });
      } catch (uploadProcessError) {
        setIsLoading(false);
        setIsUploadingImage(false);
        return; 
      }
      setIsUploadingImage(false);
    }

    // Using the SIMPLIFIED postData for debugging from previous step
    const postData: any = {
      title: title,
      slug: slug,
      content: content,
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName || auth.currentUser.email,
      status: 'published',
      // createdAt: serverTimestamp(), // Temporarily removed for debugging
      // updatedAt: serverTimestamp(), // Temporarily removed for debugging
      // excerpt: excerpt,          // Temporarily removed for debugging
    };

    if (featuredImageUrl) { // Add image URL if it was uploaded
      postData.featuredImageUrl = featuredImageUrl;
    }
    
    console.log('SIMPLIFIED Data being published to Firestore:', postData);

    try {
      const blogPostsCollection = collection(db, 'blogPosts');
      await addDoc(blogPostsCollection, postData);
      router.push('/admin/blog');
    } catch (err) {
      console.error('Error submitting blog post:', err);
      setError('Failed to submit blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="Add New Blog Post" />

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-md mt-6">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-card-foreground">Title</Label>
          <Input id="title" type="text" value={title} onChange={handleTitleChange} placeholder="Enter blog post title" className="mt-1" required />
        </div>

        <div>
          <Label htmlFor="slug" className="block text-sm font-medium text-card-foreground">Slug</Label>
          <Input id="slug" type="text" value={slug} onChange={(e) => setSlug(generateSlug(e.target.value))} placeholder="auto-generated-from-title" className="mt-1" required />
          <p className="mt-1 text-xs text-muted-foreground">User-friendly URL. Auto-generated but can be edited.</p>
        </div>

        <div>
          <Label htmlFor="featuredImage" className="block text-sm font-medium text-card-foreground">Featured Image (Optional)</Label>
          <Input id="featuredImage" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          {isUploadingImage && <Progress value={uploadProgress} className="w-full mt-2 h-2" />} 
          {imagePreviewUrl && (
            <div className="mt-4 relative w-full max-w-xs h-48">
              <Image src={imagePreviewUrl} alt="Selected image preview" fill style={{objectFit: 'contain'}} className="rounded-md border" />
            </div>
          )}
          <p className="mt-1 text-xs text-muted-foreground">Choose an image to display with your blog post.</p>
        </div>

        <div>
          <Label htmlFor="excerpt" className="block text-sm font-medium text-card-foreground">Excerpt (Optional)</Label>
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary of the blog post..." className="mt-1" rows={3} />
          <p className="mt-1 text-xs text-muted-foreground">A brief summary that might be shown in post listings.</p>
        </div>

        <div>
          <Label htmlFor="content" className="block text-sm font-medium text-card-foreground mb-1">Content</Label>
          <QuillEditor value={content} onChange={handleContentChange} placeholder="Write your blog post content here..." />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading || isUploadingImage}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || isUploadingImage}>
            {isLoading ? (isUploadingImage ? `Uploading Image (${Math.round(uploadProgress)}%)...` : 'Publishing...') : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(AddNewBlogPostPage);
