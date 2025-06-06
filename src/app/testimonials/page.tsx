
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, Building, Star } from 'lucide-react'; // Added Star back for gold stars

// Updated client testimonials
const clientTestimonials = [
  {
    quote: "I recently had the opportunity to attend some training on The Power and Importance of Attachment with Steph and was totally engaged from beginning to end, even though it was on Zoom. I learned a tremendous amount that will help me in my role mentoring young lads. Thank you Steph!",
    name: "Graham Frost",
    organisation: "", // Organisation not specified
  },
  {
    quote: "Steph is a bundle of joy and lights up any room. Steph will make you feel safe and cared for, seen and understood. Steph is highly experienced and skilled but is also very humble and approachable.",
    name: "Ciara McClelland",
    organisation: "", // Changed to empty string to display name as title
  },
  {
    quote: "Try as I may, I really cannot come up with a punchy few words which would do justice to how to best describe Stephanie's special, unique and positive impact upon those children and adults she works with, cares for and is committed to. Stephanie's enthusiasm, kindness, knowledge, expertise and continual postitive affirmation of others is both envigorating and enabling. Stephanie is one of the genuinely lovely professionals I have bbeen lucky enough to meet along the way. My team and I loved working with Stephanie and genuinely look forward to doing so again. I cannot recommened Stephanie high enough :)",
    name: "Eddie O'Hara",
    organisation: "", // Organisation not specified
  },
  {
    quote: "The first thing I would say about Steph's training is that her knowledge and passion for her subject shine through, but above all, her breadth of experience. Safeguarding roles are stressful in their nature and the training can often feel heavy, but Steph had so many lovely, child-centred examples, it kept in mind why we do what we do. All of this was packaged up in the legislation and best practice we need to do the roles to the best of our ability. I came out of the training energised to do better and am hugely grateful.",
    name: "Tristana Rodriguez",
    organisation: "", // Organisation not specified, using name as title
  }
];

// Updated trustedByLogos with actual URLs and custom size for last two
const trustedByLogos = [
  {
    name: "Social Work England",
    src: "https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/social_work_england_logo_bordered.png?alt=media&token=42f73c4c-4ac5-4b6e-94da-25faba9aa8dc"
  },
  {
    name: "NHS England",
    src: "https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/National_Health_Service_(England)_logo.svg.png?alt=media&token=71219b4b-3c0a-4a31-a6de-4fdfbba99e39"
  },
  {
    name: "Barnardo's",
    src: "https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Barnardos_slogan.webp?alt=media&token=7e0d2d6b-9d5e-4bb2-8945-e03e00605053"
  },
  {
    name: "YoungMinds",
    src: "https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/YoungMinds-New-logo.png?alt=media&token=b97b963b-21e5-4aae-b0b9-5e0a67f786c0"
  },
  {
    name: "10 Downing Street",
    src: "https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/10_Downing_Street_logo.png?alt=media&token=f2fba8fa-ec74-4d5d-966a-8fd828d603b7",
    size: "large" // Custom size identifier
  },
  {
    name: "House of Lords",
    src: "https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/4aba954f2698316c45621d8665f2d825.jpg?alt=media&token=79cca158-eefe-4be2-9fd0-eabd3d197b28",
    size: "large" // Custom size identifier
  }
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader 
        title="Client Experiences & Recognition" 
        description="Hear from those who have benefited from Stephanie's expertise and see who trusts her services." 
      />
      
      {/* Client Testimonials Section */}
      <SectionWrapper id="client-testimonials">
        <div className="text-center mb-12">
          <Quote className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Client Testimonials</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how Stephanie has made a difference through her keynote speaking, training, and consultancy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {clientTestimonials.map((testimonial, index) => (
            <Card key={`testimonial-${index}`} className="flex flex-col bg-background hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  {testimonial.organisation ? (
                    <CardTitle className="text-lg text-primary">{testimonial.organisation}</CardTitle>
                  ) : (
                    <CardTitle className="text-lg text-primary">{testimonial.name}</CardTitle> // Show name if no org
                  )}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <blockquote className="italic text-muted-foreground mb-4 flex-grow">
                  " {testimonial.quote} "
                </blockquote>
                {/* Removed name from under description */}
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Trusted By Section */}
      <SectionWrapper id="trusted-by" className="bg-secondary/20">
        <div className="text-center mb-12">
          <Building className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Trusted By</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stephanie is proud to have worked with a diverse range of esteemed organisations.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {trustedByLogos.map((logo, index) => (
            <div key={`logo-${index}`} className="p-4">
              <img 
                src={logo.src} 
                alt={logo.name} 
                className={`object-contain transition-all duration-300 ${logo.size === 'large' ? 'h-14 md:h-20' : 'h-12 md:h-16'}`}
              />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
