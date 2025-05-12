
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Mic, BookText, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const mediaItems = [
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
  return (
    <>
      <PageHeader 
        title="Media & Contributions" 
        description="Sharing knowledge and insights through various platforms." 
      />
      <SectionWrapper>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
          {mediaItems.map((item, index) => (
            <Card key={index} className="flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:w-1/3 relative">
                <Image 
                  src={item.image}
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
                     {/* Replace '#' with actual links when available */}
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
        <div className="mt-16 text-center">
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
