
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import PageHeader from '@/components/PageHeader'; // Correct import
import SectionWrapper from '@/components/SectionWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
// Removed ReactMarkdown import as we'll use dangerouslySetInnerHTML for Quill's HTML output

interface BlogPostData {
  id: string;
  title: string;
  content: string; // This will be HTML from Quill
  excerpt?: string;
  slug: string;
  authorName?: string;
  createdAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostBySlug = useCallback(async (slugToFetch: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const postsCollection = collection(db, 'blogPosts');
      const q = query(
        postsCollection,
        where('slug', '==', slugToFetch),
        where('status', '==', 'published')
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setPost(null);
      } else {
        const postDoc = querySnapshot.docs[0];
        const data = postDoc.data() as DocumentData;
        setPost({
          id: postDoc.id,
          title: data.title || 'Untitled Post',
          content: data.content || '<p>No content available.</p>', // Ensure content is always a string
          excerpt: data.excerpt || '',
          slug: data.slug,
          authorName: data.authorName || 'Anonymous',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        } as BlogPostData);
      }
    } catch (err) {
      console.error("Error fetching post by slug: ", err);
      setError("Failed to load the blog post. Please try again later.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug);
    }
  }, [slug, fetchPostBySlug]);

  if (isLoading) {
    return (
      <SectionWrapper>
        <div className="text-center py-10"><p>Loading blog post...</p></div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper>
        <div className="text-center py-10"><p className="text-destructive">{error}</p></div>
      </SectionWrapper>
    );
  }

  if (!post) {
    notFound();
  }

  const formatDate = (dateValue: Timestamp | Date | undefined) => {
    if (!dateValue) return 'N/A';
    if (dateValue instanceof Timestamp) {
      return dateValue.toDate().toLocaleDateString();
    }
    return (dateValue as Date).toLocaleDateString();
  };

  return (
    <>
      <PageHeader title={post.title} description={`Published on ${formatDate(post.createdAt)} by ${post.authorName || 'Admin'}`} />
      <SectionWrapper>
        {/* 
          The 'prose' classes from Tailwind Typography will style the raw HTML output from Quill.
          Ensure @tailwindcss/typography plugin is installed and configured in your tailwind.config.ts.
        */}
        <article 
          className="prose prose-lg dark:prose-invert mx-auto max-w-3xl py-8" 
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/media">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Media & Blog
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
