
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-primary-foreground py-24 sm:py-32 md:py-40 min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_6225.jpeg?alt=media&token=382d1fa7-5d0f-455a-944d-62117d6df407"
        alt="Stephanie Hunter - engaging portrait"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center 8%' }} // Position is good
        className="opacity-40" // Adjusted opacity for more image visibility
        priority
        data-ai-hint="professional woman smiling"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-20"> 
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 drop-shadow-md">
          Stephanie Hunter
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 drop-shadow-sm">
          Keynote Speaker | Social Work Consultant | Trainer | SILP Methodology Trained Independent Reviewer | Practice Educator | Author | Therapist
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-accent border-primary-foreground/50 hover:bg-primary-foreground/10">
            <Link href="/contact">Book Stephanie</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
