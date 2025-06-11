
'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Mic, BookText, ExternalLink, Newspaper, Download } from 'lucide-react';
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
  imageFit?: 'cover' | 'contain';
  isDownload?: boolean;
}

// Interface for fetched blog posts (can be shared from a types file)
interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  createdAt: Timestamp | Date; 
  featuredImageUrl?: string; // Uncommented this line
}

const staticMediaItems: MediaItem[] = [
  {
    type: 'Academic Profile & Research',
    title: "Stephanie Hunter's Published Research",
    description: "Stephanie Hunter (2016) Evaluation of Sunderland Children’s Services adoption team’s use of the adoption support fund. Project Report. Sunderland City Council, Sunderland.",
    icon: BookText,
    link: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/ASF%20-%20final%20evaluation%20PDF.pdf?alt=media&token=129b0ace-6784-44a5-8776-f1928131d61a',
    linkLabel: "Download Research PDF",
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/186a396fd0cab5c4fb2a83f2adb860df_f64e5906bf.webp?alt=media&token=40395e57-46ae-4e0a-a4f5-86640d66e07a',
    imageHint: "academic profile research paper",
    isDownload: true
  },
  {
    type: 'Published Research & Film',
    title: 'Award-Winning Research Film on Care-Experienced Adults',
    description: "Stephanie's published research with care-experienced adults was awarded funding by Social Work England to produce a film which has been nationally and internationally recognised and applauded.",
    icon: Film,
    link: '#', 
    linkLabel: 'Learn More',
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_6194.jpeg?alt=media&token=31d6929f-2fef-4422-b3de-106dca1751e3', 
    imageHint: 'award presentation photo' 
  },
  {
    type: 'Webinars',
    title: 'Engaging Webinars on Trauma and Mental Health',
    description: "Stephanie regularly hosts and participates in webinars covering a range of topics including trauma recovery, mental health in the workplace, and innovative safeguarding techniques. These sessions are designed to be interactive and accessible to a wide audience.",
    icon: Mic,
    link: '#', 
    linkLabel: 'View Past Webinars (Example)',
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_6312.JPEG?alt=media&token=4b42cee1-7320-40d8-8500-b42d84caa513', 
    imageHint: 'webinar presentation' 
  },
  {
    type: 'Publications',
    title: 'Contributions to Professional Publications',
    description: "Stephanie has authored and co-authored articles and chapters in various professional publications and books, sharing her expertise on adoption, trauma-informed care, and ethical leadership. Her written work aims to advance knowledge and promote best practices.",
    icon: BookText,
    link: '#', 
    linkLabel: 'Explore Publications (Example)',
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_6186.jpeg?alt=media&token=57ade064-1744-4101-aef5-0fea5c8d28c2', 
    imageHint: 'professional portrait' 
  },
  {
    type: 'Training Film',
    title: 'Collaborative Training Film with Social Work England',
    description: "Stephanie played a key role in a significant training film produced in partnership with Social Work England, focusing on best practices in ethical decision-making and trauma-informed approaches within social work. This film is utilized for professional development across the sector.",
    icon: Film,
    link: '#', 
    linkLabel: 'Learn More (Example)',
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_6191.jpeg?alt=media&token=582a2679-aeab-4430-b229-f9f648460a1e',
    imageHint: 'professional portrait for training film',
    imageFit: 'contain' 
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
            createdAt: data.createdAt, 
            featuredImageUrl: data.featuredImageUrl || undefined // Ensured this is included
          } as BlogPost;
        });
        setBlogPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog posts: ", error);
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
        <h2 className="text-3xl font-semibold text-primary mb-8">Featured Contributions</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 mb-16">
          {staticMediaItems.map((item, index) => (
            <Card key={`media-${index}`} className="flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:w-1/3 relative">
                <Image 
                  src={item.image || 'https://via.placeholder.com/400x250?text=Media+Image'}
                  alt={item.title}
                  width={400}
                  height={250}
                  className={`${item.imageFit === 'contain' ? 'object-contain' : 'object-cover'} w-full h-48 md:h-full`}
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
                      <a href={item.link} target="_blank" rel="noopener noreferrer" download={item.isDownload}>
                        {item.linkLabel} {item.isDownload ? <Download className="ml-2 h-4 w-4" /> : <ExternalLink className="ml-2 h-4 w-4" />}
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-semibold text-primary mb-8 pt-8 border-t border-border">Latest Blog Posts</h2>
        {isLoadingPosts ? (
          <p>Loading blog posts...</p>
        ) : blogPosts.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                {/* Placeholder for featured image in blog list */}
                {post.featuredImageUrl && (
                  <div className="relative w-full h-48">
                    <Image 
                      src={post.featuredImageUrl} 
                      alt={post.title} 
                      fill 
                      style={{objectFit: 'cover'}} 
                      className="rounded-t-lg"
                    />
                  </div>
                )}
                <CardHeader className={!post.featuredImageUrl ? 'pt-6' : ''}>
                  <div className="flex items-center mb-2">
                    <Newspaper className="h-5 w-5 text-accent mr-2" />
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
