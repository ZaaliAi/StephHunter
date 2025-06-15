
import HeroSection from '@/components/HeroSection';
import SectionWrapper from '@/components/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Briefcase, MessageSquare, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <SectionWrapper className="bg-background">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Empowering Change, Inspiring Growth
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Steph Hunter has thirty years social work experience over twenty in management and leadership including Clinical Director and Head of quality and practice and Principal Social Worker. She has undergone extensive additional training in relation to attachment and trauma.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(7).png?alt=media&token=5aaad9c8-79b4-4229-9431-e838e065f82b" 
              alt="Stephanie Hunter professional image"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-contain aspect-[3/2]"
              data-ai-hint="professional portrait"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">A Message from Stephanie</h3>
            <p className="text-muted-foreground">
              "My work is driven by a commitment to ethical practice and the belief that understanding trauma is key to unlocking human potential. I partner with organisations and individuals to build resilience, foster compassionate leadership, and create lasting positive change. Let's work together to make a meaningful difference."
            </p>
            <Button asChild variant="outline">
              <Link href="/about">Learn More About Stephanie <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-secondary text-secondary-foreground">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Stephanie Can Help</h2>
          <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            Explore a range of services designed to meet your specific needs, from engaging keynote speeches to comprehensive consultancy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-background text-foreground hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Keynote Speaking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Inspiring talks on trauma, safeguarding, self-care, adoption, and promoting the best outcomes for cared-for children.</CardDescription>
               <Button variant="link" asChild className="mt-4 p-0 text-accent">
                <Link href="/services#keynotes">Discover Keynotes <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-background text-foreground hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Bespoke Training</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Tailored training programs to enhance skills and knowledge in ethical, trauma-informed practices.</CardDescription>
              <Button variant="link" asChild className="mt-4 p-0 text-accent">
                <Link href="/services#training">Explore Training <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-background text-foreground hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Consultancy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Expert advice and strategic guidance to improve services and organisational approaches.</CardDescription>
              <Button variant="link" asChild className="mt-4 p-0 text-accent">
                <Link href="/services#consultancy">Learn About Consultancy <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
         <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
      </SectionWrapper>
    </>
  );
}
