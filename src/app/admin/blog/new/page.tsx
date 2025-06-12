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
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { User } from 'firebase/auth';

interface AddNewBlogPostPageProps {
  user: User; // User object passed from withAuth HOC
}

function AddNewBlogPostPage({ user }: AddNewBlogPostPageProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadingImage, setIsUploadingImage] = useState(false);


  useEffect(() => {
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
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      setUploadProgress(0);
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (title.trim() === '' || slug.trim() === '' || (content.trim() === '' || content === '<p><br></p>')) {
      setError('Title, Slug, and Content are required.');
      setIsLoading(false);
      return;
    }

    if (!user) { // Check for user prop
      setError('You must be logged in to create a post.');
      setIsLoading(false);
      return;
    }

    let featuredImageUrl = '';

    if (imageFile) {
      setIsUploadingImage(true);
      const imageRef = ref(storage, `blogImages/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      try {
        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            (uploadError) => reject(uploadError),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              featuredImageUrl = downloadURL;
              resolve();
            }
          );
        });
      } catch (uploadError: any) {
        setError(`Image upload failed: ${uploadError.message}`);
        setIsLoading(false);
        setIsUploadingImage(false);
        return;
      }
      setIsUploadingImage(false);
    }

    const postData = {
      title,
      slug,
      content,
      excerpt,
      authorId: user.uid, // Use user prop
      authorName: user.displayName || user.email, // Use user prop
      status: 'published',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      featuredImageUrl: featuredImageUrl || null,
    };

    try {
      await addDoc(collection(db, 'blogPosts'), postData);
      router.push('/admin/blog');
    } catch (err: any) {
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
          <Label htmlFor="title">Title</Label>
          <Input id="title" type="text" value={title} onChange={handleTitleChange} placeholder="Enter blog post title" required />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" type="text" value={slug} onChange={(e) => setSlug(generateSlug(e.target.value))} placeholder="auto-generated-from-title" required />
        </div>

        <div>
          <Label htmlFor="featuredImage">Featured Image (Optional)</Label>
          <Input id="featuredImage" type="file" accept="image/*" onChange={handleImageChange} />
          {isUploadingImage && <Progress value={uploadProgress} className="w-full mt-2 h-2" />}
          {imagePreviewUrl && (
            <div className="mt-4 relative w-full max-w-xs h-48">
              <Image src={imagePreviewUrl} alt="Selected image preview" fill style={{objectFit: 'contain'}} />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt (Optional)</Label>
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary...\" rows={3} />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <QuillEditor value={content} onChange={handleContentChange} placeholder="Write your blog post content here..." />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(AddNewBlogPostPage);
