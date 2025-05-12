
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react'; // Example icons

export default function ContactPage() {
  return (
    <>
      <PageHeader 
        title="Get In Touch" 
        description="Stephanie would love to hear from you. Reach out to discuss your needs or book her for your next event." 
      />
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-6">Send a Message</h2>
            <ContactForm />
          </div>
          <div className="space-y-8 md:mt-[76px]"> {/* mt to align roughly with form title */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3">Direct Contact</h3>
              <div className="flex items-center space-x-3 mb-3 p-3 bg-secondary/20 rounded-md">
                <Mail className="h-6 w-6 text-accent" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:stephanie.hunter.consulting@example.com" className="text-muted-foreground hover:text-accent transition-colors">
                    stephanie.hunter.consulting@example.com
                  </a>
                   <p className="text-xs text-muted-foreground/70">(Example email - please update)</p>
                </div>
              </div>
              {/* Optional: Add Phone or Address if provided by user */}
              {/* 
              <div className="flex items-center space-x-3 mb-3 p-3 bg-secondary/20 rounded-md">
                <Phone className="h-6 w-6 text-accent" />
                 <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                    +1 (234) 567-890 (Placeholder)
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-md">
                <MapPin className="h-6 w-6 text-accent" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">
                    Based in [City, Country] - Available Nationally & Internationally (Placeholder)
                  </p>
                </div>
              </div>
              */}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3">Availability</h3>
              <p className="text-muted-foreground">
                Stephanie is available for keynote speaking engagements, bespoke training sessions, and consultancy projects nationally and internationally. Please reach out with your specific requirements and timeline, and she will get back to you promptly.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
