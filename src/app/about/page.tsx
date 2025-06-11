
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About Stephanie Hunter" 
        description="Trauma responsive and attachment informed work, underpinned by extensive post-graduate training." 
      />
      <SectionWrapper>
        <div className="flow-root"> {/* Manages the floating child element */}
          <div className="md:float-right md:ml-6 lg:ml-8 mb-6 md:w-2/5 lg:w-1/3"> {/* Image container: floats right on md+, has margin, and responsive width */}
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/IMG_6312.JPEG?alt=media&token=4b42cee1-7320-40d8-8500-b42d84caa513" 
              alt="Stephanie Hunter"
              width={500}
              height={600}
              className="rounded-xl shadow-2xl object-cover w-full h-auto aspect-[4/5]" /* Adjusted for responsiveness */
              data-ai-hint="professional woman"
            />
          </div>
          <div className="space-y-6"> {/* Text container - removed max-w-2xl mx-auto to allow flow */}
            <h2 className="text-3xl font-semibold text-primary">A Commitment to Compassion and Integrity</h2>
            <p className="text-md text-muted-foreground font-medium">Dip S/W, BA, BSC, MA, PGCE, FHEA</p>
            <p className="text-lg text-muted-foreground">
              Stephanie Hunter is a highly experienced keynote speaker, consultant, and trainer with over thirty years in the field. She is renowned for her deep expertise in trauma-informed practice, mental health, ethical leadership, and safeguarding. Stephanie has dedicated her career to championing the needs of vulnerable populations and fostering environments of healing, growth, and resilience.
            </p>
            <p className="text-lg text-muted-foreground">
              Her approach is rooted in a profound understanding of the impact of trauma, combined with a practical, evidence-based methodology. Stephanie excels at translating complex concepts into accessible and actionable strategies for professionals and organisations across various sectors.
            </p>
            <p className="text-lg text-muted-foreground">
              As a national and international speaker, Stephanie captivates audiences with her engaging style, insightful perspectives, and unwavering commitment to ethical practice. She empowers listeners to adopt compassionate, effective approaches in their work, leading to better outcomes and more supportive communities.
            </p>
            <p className="text-lg text-muted-foreground">
              Stephanie's expertise is widely recognized, and she has been trusted to deliver training and keynotes by a diverse range of prestigious organizations. These include Social Work England, NHS England, Malta International ACAMH, the Dublin Unity Conference, Young Minds, Barnardo’s, L30 Relational Systems, Cafcass, Action for Children, Young People Now, Insight, Aurora Education Group, Teeside, Durham and Northumbria University Conferences, and the House of Lords.
            </p>
          </div>
        </div>

        {/* Core Values & Philosophy section remains unchanged */}
        <div className="mt-16 pt-12 border-t">
          <h3 className="text-2xl font-semibold text-primary text-center mb-8">Core Values & Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-secondary/30 rounded-lg shadow-md">
              <h4 className="text-xl font-medium mb-2">Ethical Practice</h4>
              <p className="text-muted-foreground text-sm">Upholding the highest ethical standards in all engagements, ensuring integrity and respect.</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg shadow-md">
              <h4 className="text-xl font-medium mb-2">Compassionate Engagement</h4>
              <p className="text-muted-foreground text-sm">Fostering connection and understanding through empathy and genuine care.</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg shadow-md">
              <h4 className="text-xl font-medium mb-2">Trauma-Informed Approach</h4>
              <p className="text-muted-foreground text-sm">Recognising the pervasive impact of trauma and integrating this knowledge into all services.</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
