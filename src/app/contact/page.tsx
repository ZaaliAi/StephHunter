
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Get In Touch" 
        description="Stephanie would love to hear from you. Reach out to discuss your needs or book her for your next event." 
      />
      <SectionWrapper>
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-6">Direct Contact</h3>
              <div className="flex items-center space-x-3 mb-3 p-4 bg-secondary/20 rounded-lg shadow-sm">
                <Mail className="h-7 w-7 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Email</p>
                  <a href="mailto:hello@stephaniehunter.co.uk" className="text-muted-foreground hover:text-accent transition-colors text-base sm:text-lg break-all">
                    hello@stephaniehunter.co.uk
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-3 p-4 bg-secondary/20 rounded-lg shadow-sm">
                <Phone className="h-7 w-7 text-accent flex-shrink-0" />
                 <div>
                  <p className="font-semibold text-lg">Phone</p>
                  <a href="tel:07881246965" className="text-muted-foreground hover:text-accent transition-colors text-base sm:text-lg">
                    07881 246965
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-6">Follow on Social Media</h3>
              <div className="flex justify-start">
                <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/10">
                  <Link href="https://www.linkedin.com/in/stephanie-hunter-dip-s-w-ba-bsc-ma-pgce-fhea-08633890/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-6">Availability</h3>
              <p className="text-lg text-muted-foreground">
                Stephanie is available for keynote speaking engagements, bespoke training sessions, and consultancy projects nationally and internationally. Please reach out via email or phone with your specific requirements and timeline, and she will get back to you promptly.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
