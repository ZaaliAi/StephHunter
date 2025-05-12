
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-primary-foreground py-24 sm:py-32 md:py-40 min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Placeholder for a background image pattern or subtle texture if desired */}
      <div className="absolute inset-0 opacity-10">
         {/* Example of a subtle pattern - replace with actual SVG or remove if not needed 
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#smallGrid)" /></svg>
         */}
      </div>
       {/* Optional: Add a subtle image overlay if desired, ensure it's a professional, abstract, or blurred image */}
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(6).png?alt=media&token=ad280ac2-418b-4684-a86e-acd400d05061"
        alt="Stephanie Hunter hero image"
        layout="fill"
        objectFit="cover"
        className="opacity-100" /* Adjusted opacity for visibility */
        priority
        data-ai-hint="professional woman portrait" /* Updated hint */
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

