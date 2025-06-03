
'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Mic, BookText, ExternalLink, Newspaper } from 'lucide-react'; // Added Newspaper icon for blog
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';

// Interface for existing media items
interface MediaItem {
  type: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  linkLabel: string;
  image: string;
  imageHint: string;
}

// Interface for fetched blog posts (can be shared from a types file)
interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  createdAt: Timestamp | Date; // Firestore timestamp or Date object
  // Add featuredImage field if you plan to have images for blog posts
  // featuredImageUrl?: string;
}

const staticMediaItems: MediaItem[] = [
  {
    type: 'Training Film',
    title: 'Collaborative Training Film with Social Work England',
    description: "Stephanie played a key role in a significant training film produced in partnership with Social Work England, focusing on best practices in ethical decision-making and trauma-informed approaches within social work. This film is utilized for professional development across the sector.",
    icon: Film,
    link: '#', // Placeholder link
    linkLabel: 'Learn More (Example)',
    image: 'https://picsum.photos/seed/film1/400/250',
    imageHint: 'film production'
  },
  {
    type: 'Webinars',
    title: 'Engaging Webinars on Trauma and Mental Health',
    description: "Stephanie regularly hosts and participates in webinars covering a range of topics including trauma recovery, mental health in the workplace, and innovative safeguarding techniques. These sessions are designed to be interactive and accessible to a wide audience.",
    icon: Mic,
    link: '#', // Placeholder link
    linkLabel: 'View Past Webinars (Example)',
    image: 'https://picsum.photos/seed/webinar2/400/250',
    imageHint: 'online presentation'
  },
  {
    type: 'Publications',
    title: 'Contributions to Professional Publications',
    description: "Stephanie has authored and co-authored articles and chapters in various professional publications and books, sharing her expertise on adoption, trauma-informed care, and ethical leadership. Her written work aims to advance knowledge and promote best practices.",
    icon: BookText,
    link: '#', // Placeholder link
    linkLabel: 'Explore Publications (Example)',
    image: 'https://picsum.photos/seed/pubs3/400/250',
    imageHint: 'books articles'
  },
];

export default function MediaPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const postsCollection = collection(db, 'blogPosts');
        const q = query(
          postsCollection, 
          where('status', '==', 'published'), 
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            slug: data.slug || '',
            createdAt: data.createdAt, // Firestore Timestamp
            // featuredImageUrl: data.featuredImageUrl || undefined
          } as BlogPost;
        });
        setBlogPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog posts: ", error);
        // Optionally set an error state to display to the user
      }
      setIsLoadingPosts(false);
    };

    fetchPosts();
  }, []);

  const formatDate = (dateValue: Timestamp | Date | undefined) => {
    if (!dateValue) return 'N/A';
    if (dateValue instanceof Timestamp) {
      return dateValue.toDate().toLocaleDateString();
    }
    return (dateValue as Date).toLocaleDateString();
  };

  return (
    <>
      <PageHeader 
        title="Media & Contributions" 
        description="Sharing knowledge and insights through various platforms." 
      />
      <SectionWrapper>
        {/* Existing Media Items */}
        <h2 className="text-3xl font-semibold text-primary mb-8">Featured Contributions</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 mb-16">
          {staticMediaItems.map((item, index) => (
            <Card key={`media-${index}`} className="flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:w-1/3 relative">
                {/* Using a placeholder if item.image is not a valid URL for Next/Image */}
                <Image 
                  src={item.image || 'https://via.placeholder.com/400x250?text=Media+Image'}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-48 md:h-full"
                  data-ai-hint={item.imageHint}
                />
              </div>
              <div className="md:w-2/3 flex flex-col">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <item.icon className="h-6 w-6 text-accent mr-3" />
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">{item.type}</span>
                  </div>
                  <CardTitle className="text-2xl text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base text-muted-foreground">{item.description}</CardDescription>
                </CardContent>
                {item.link !== '#' && (
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.linkLabel} <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Blog Posts Section */}
        <h2 className="text-3xl font-semibold text-primary mb-8 pt-8 border-t border-border">Latest Blog Posts</h2>
        {isLoadingPosts ? (
          <p>Loading blog posts...</p>
        ) : blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                {/* Optional: Add featured image for blog posts if you have one */}
                {/* post.featuredImageUrl && (
                  <div className="relative w-full h-48">
                    <Image src={post.featuredImageUrl} alt={post.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
                  </div>
                ) */}
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Newspaper className="h-5 w-5 text-accent mr-2" /> {/* Blog Icon */}
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-primary">{post.title}</CardTitle>
                </CardHeader>
                {post.excerpt && (
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base text-muted-foreground">{post.excerpt}</CardDescription>
                  </CardContent>
                )}
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/blog/${post.slug}`}> 
                      Read More <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No blog posts published yet. Check back soon!</p>
        )}

        <div className="mt-16 text-center pt-8 border-t border-border">
            <p className="text-lg text-muted-foreground mb-4">
                For media inquiries or to discuss potential collaborations, please get in touch.
            </p>
            <Button asChild>
                <Link href="/contact">Contact Stephanie</Link>
            </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
