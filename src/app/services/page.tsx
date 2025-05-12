
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Briefcase, Users, Heart, Shield, Users2, Brain } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 'keynotes',
    title: 'Keynote Speaking',
    icon: Users,
    description: 'Engaging and insightful keynote presentations tailored to inspire and inform your audience. Stephanie delivers powerful messages on critical topics, drawing from her extensive experience and research.',
    focusAreas: ['Trauma-informed care principles', 'Ethical leadership in challenging environments', 'Building resilient communities', 'The future of safeguarding practices', 'Mental health advocacy and support systems', 'Innovations in adoption support'],
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(3).jpg?alt=media&token=cb9d1d8c-9ef2-47be-b895-3139cecf5f2d',
    imageHint: 'public speaking conference'
  },
  {
    id: 'training',
    title: 'Bespoke Training',
    icon: Briefcase,
    description: 'Customized training programs designed to equip professionals and organizations with the skills and knowledge to implement trauma-informed and ethical practices effectively. Interactive workshops and comprehensive modules available.',
    focusAreas: ['Advanced trauma-informed practice', 'Safeguarding vulnerable adults and children', 'Specialized adoption support training', 'Mental health first aid and awareness', 'Developing ethical decision-making frameworks', 'Leadership in compassionate care'],
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(4).jpg?alt=media&token=efc27740-aba1-477f-af3a-2898c59a80a9',
    imageHint: 'workshop training'
  },
  {
    id: 'consultancy',
    title: 'Consultancy Services',
    icon: BookOpen,
    description: 'Expert consultancy to help organizations review, develop, and enhance their services, policies, and strategies. Stephanie provides strategic guidance to foster environments of best practice and continuous improvement.',
    focusAreas: ['Organizational trauma-informed audits', 'Policy development and review for safeguarding', 'Service design for adoption and foster care', 'Mental health strategy implementation', 'Ethical frameworks for service delivery', 'Change management for compassionate cultures'],
    image: 'https://picsum.photos/seed/c0nsult/600/400',
    imageHint: 'business meeting consultation'
  },
];

const focusIcons = {
  trauma: Heart,
  safeguarding: Shield,
  adoption: Users2,
  'mental health': Brain,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader 
        title="Services Offered" 
        description="Tailored solutions to empower individuals and organizations in trauma-informed practice, ethical leadership, and compassionate care." 
      />
      
      {services.map((service, index) => (
        <SectionWrapper key={service.id} id={service.id} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
          <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense md:[&>*:first-child]:col-start-2' : ''}`}>
            <div className="space-y-6">
              <service.icon className="h-12 w-12 text-accent mb-2" />
              <h2 className="text-3xl font-semibold text-primary">{service.title}</h2>
              <p className="text-lg text-muted-foreground">{service.description}</p>
              
              <h3 className="text-xl font-medium text-primary pt-4">Focus Areas Include:</h3>
              <ul className="space-y-2">
                {service.focusAreas.map((area, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-accent mr-2 mt-1">&#10003;</span> {/* Checkmark */}
                    <span className="text-muted-foreground">{area}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6">
                <Link href="/contact">Enquire about {service.title}</Link>
              </Button>
            </div>
             <div>
              <Image 
                src={service.image}
                alt={service.title}
                width={600}
                height={400}
                className="rounded-xl shadow-2xl object-cover aspect-[3/2]"
                data-ai-hint={service.imageHint}
              />
            </div>
          </div>
        </SectionWrapper>
      ))}

      <SectionWrapper className="bg-primary text-primary-foreground">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stephanie is passionate about collaborating to create meaningful change. If you're looking for an expert to guide, train, or inspire, get in touch to discuss your specific requirements.
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">Book a Consultation</Link>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}

