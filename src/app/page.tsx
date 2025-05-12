
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
            Stephanie Hunter is dedicated to transforming practices and fostering environments where individuals and organizations can thrive. With expertise in trauma-informed care, ethical leadership, and impactful training, Stephanie offers a unique blend of professional insight and compassionate engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_1678.jpg?alt=media&token=49e18d1b-ba8d-4e58-ad0c-91367f47fa31" 
              alt="Stephanie Hunter professional image"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover aspect-[3/2]"
              data-ai-hint="professional portrait"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">A Message from Stephanie</h3>
            <p className="text-muted-foreground">
              "My work is driven by a commitment to ethical practice and the belief that understanding trauma is key to unlocking human potential. I partner with organizations and individuals to build resilience, foster compassionate leadership, and create lasting positive change. Let's work together to make a meaningful difference."
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
              <Users className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Keynote Speaking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Inspiring and informative talks on trauma, safeguarding, adoption, and mental health.</CardDescription>
               <Button variant="link" asChild className="mt-4 p-0 text-accent">
                <Link href="/services#keynotes">Discover Keynotes <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-background text-foreground hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <Briefcase className="h-10 w-10 text-accent mb-2" />
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
              <BookOpen className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Consultancy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Expert advice and strategic guidance to improve services and organizational approaches.</CardDescription>
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

      <SectionWrapper>
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Reach out to discuss your needs and how Stephanie can support your goals.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
