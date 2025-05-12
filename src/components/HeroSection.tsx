
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-primary-foreground py-24 sm:py-32 md:py-40 min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Opacity filter div */}
      <div className="absolute inset-0 bg-primary/30 z-0"></div>
      
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(1).jpg?alt=media&token=ba4d3c35-6043-4c96-8afb-704f736779f6"
        alt="Stephanie Hunter hero image"
        layout="fill"
        objectFit="cover"
        className="opacity-50" 
        priority
        data-ai-hint="professional woman portrait" 
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 drop-shadow-md">
          Stephanie Hunter
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-primary-foreground/90 mb-4 drop-shadow-sm">
          Keynote Speaker | Consultant | Trainer
        </p>
        <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto mb-10 drop-shadow-sm">
          Championing trauma-informed, ethical practice with compassion and integrity.
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Link href="/contact">Book Stephanie</Link>
        </Button>
      </div>
    </div>
  );
}

