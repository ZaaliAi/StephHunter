
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
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
    focusAreas: ['Trauma-informed care principles', 'Ethical leadership in challenging environments', 'Building resilient communities', 'Contemporary social work practice includes contextual and transitional safeguarding.', 'Mental health awareness and evidence-based practice.', 'Co-production and lived experience.', 'Innovations in adoption support'],
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(3).jpg?alt=media&token=cb9d1d8c-9ef2-47be-b895-3139cecf5f2d',
    imageHint: 'public speaking conference'
  },
  {
    id: 'training',
    title: 'Bespoke Training',
    icon: Briefcase,
    description: 'Customized training programs are designed to equip professionals and organisations with the skills and knowledge to implement trauma-informed and ethical practices effectively. Interactive workshops and comprehensive modules are available.',
    focusAreas: ['Advanced trauma-informed practice', 'Safeguarding vulnerable adults and children', 'Best practice in supporting families formed by adoption, kinship, fostering, and residential childcare.', 'Evidence-based mental health care practices.', 'Developing ethical decision-making frameworks', 'Trauma-responsive and compassionate leadership'],
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(4).jpg?alt=media&token=efc27740-aba1-477f-af3a-2898c59a80a9',
    imageHint: 'workshop training'
  },
  {
    id: 'consultancy',
    title: 'Consultancy Services',
    icon: BookOpen,
    description: 'Expert consultancy to help organisations review, develop, and enhance their services, policies, and strategies. Stephanie provides strategic guidance to foster environments of best practice and continuous improvement.',
    focusAreas: ['Organisational trauma-informed audits', 'Policy development and review for safeguarding', 'Service design for adoption and foster care', 'Mental health strategy implementation', 'Ethical frameworks for service delivery', 'Change management for compassionate cultures', 'Service Evaluation', 'Safeguarding reviews', 'Supervision (group and individual)'],
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(5).jpg?alt=media&token=b131c070-8de6-41d3-b8fd-3a1fab6625f4',
    imageHint: 'business meeting consultation'
  },
  {
    id: 'webinars',
    title: 'Webinars & Media Engagements',
    icon: Users, 
    description: 'Stephanie has delivered commissioned training webinars for organizations such as The Children and Trauma Community Hub (which hosts the National Adoption Hub - CATCH), as well as various other charities and councils. She has also regularly spoken on the radio and participated in press interviews, sharing her expertise on related topics.',
    focusAreas: ['Commissioned training webinars for charities and councils', 'Expert contributions for radio broadcasts', 'Press interviews on trauma, adoption, and mental health', 'Insights for national adoption hubs and community initiatives'],
    image: 'https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_6310.JPEG?alt=media&token=eb26de3f-d171-425e-8778-3d29d7891da7', 
    imageHint: 'webinar or online presentation'
  }
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader 
        title="Services Offered" 
        description="Tailored solutions to empower individuals and organisations in trauma-informed practice, ethical leadership, and compassionate care." 
      />
      
      {services.map((service, index) => {
        // Split focusAreas for two-column layout
        const middleIndex = service.focusAreas ? Math.ceil(service.focusAreas.length / 2) : 0;
        const firstHalf = service.focusAreas ? service.focusAreas.slice(0, middleIndex) : [];
        const secondHalf = service.focusAreas ? service.focusAreas.slice(middleIndex) : [];

        return (
          <SectionWrapper key={service.id} id={service.id} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-6 md:mb-8">
              {/* Image container */}
              <div className={`w-full ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                <Image 
                  src={service.image}
                  alt={service.title}
                  width={600} 
                  height={400}
                  className="rounded-xl shadow-2xl object-cover aspect-[3/2] w-full h-auto"
                  data-ai-hint={service.imageHint}
                />
              </div>
              {/* Primary Text (Icon, Title, Description) */}
              <div className={`space-y-4 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                <service.icon className="h-12 w-12 text-accent mb-2" />
                <h2 className="text-3xl font-semibold text-primary">{service.title}</h2>
                <p className="text-lg text-muted-foreground">{service.description}</p>
              </div>
            </div>
            
            {/* Secondary Text (Focus Areas, Button) - Full width below */}
            <div className="w-full">
              {service.focusAreas && service.focusAreas.length > 0 && (
                <>
                  <h3 className="text-xl font-medium text-primary pt-4 mb-4 text-center">Focus Areas Include:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 max-w-2xl mx-auto mb-6">
                    <ul className="list-none p-0 space-y-2">
                      {firstHalf.map((area, i) => (
                        <li key={`col1-${service.id}-${i}`} className="flex items-start">
                          <span className="text-accent mr-2 mt-1">&#10003;</span>
                          <span className="text-muted-foreground">{area}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="list-none p-0 space-y-2">
                      {secondHalf.map((area, i) => (
                        <li key={`col2-${service.id}-${i}`} className="flex items-start">
                          <span className="text-accent mr-2 mt-1">&#10003;</span>
                          <span className="text-muted-foreground">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <div className="text-center"> {/* Centering the button */}
                <Button asChild>
                  <Link href="/contact">Enquire about {service.title}</Link>
                </Button>
              </div>
            </div>
          </SectionWrapper>
        );
      })}

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
