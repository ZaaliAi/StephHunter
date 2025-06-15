"use client";

import { usePathname } from 'next/navigation';
import SectionWrapper from './SectionWrapper';
import { Button } from './ui/button';
import Link from 'next/link';
import { MessageSquare, Linkedin } from 'lucide-react';

export default function ContactCTA() {
  const pathname = usePathname();

  // We don't want to show the CTA on the contact or media pages
  if (pathname === '/contact' || pathname === '/media') {
    return null;
  }

  return (
    <SectionWrapper>
      <div className="text-center">
        <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          Reach out to discuss your needs and how Stephanie can support your goals.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">Get In Touch</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
            <Link href="https://www.linkedin.com/in/stephanie-hunter-dip-s-w-ba-bsc-ma-pgce-fhea-08633890/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}