
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About Stephanie Hunter" 
        description="Passionate advocate for ethical, trauma-informed practice." 
      />
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-primary">A Commitment to Compassion and Integrity</h2>
            <p className="text-lg text-muted-foreground">
              Stephanie Hunter is a highly experienced keynote speaker, consultant, and trainer renowned for her deep expertise in trauma-informed practice, ethical leadership, and safeguarding. With a career spanning several years, Stephanie has dedicated herself to championing the needs of vulnerable populations and fostering environments of healing, growth, and resilience.
            </p>
            <p className="text-lg text-muted-foreground">
              Her approach is rooted in a profound understanding of the impact of trauma, combined with a practical, evidence-based methodology. Stephanie excels at translating complex concepts into accessible and actionable strategies for professionals and organizations across various sectors.
            </p>
            <p className="text-lg text-muted-foreground">
              As a national speaker, Stephanie captivates audiences with her engaging style, insightful perspectives, and unwavering commitment to ethical practice. She empowers listeners to adopt compassionate, effective approaches in their work, leading to better outcomes and more supportive communities.
            </p>
          </div>
          <div>
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/Untitled%20design%20(2).jpg?alt=media&token=31b0c3b7-de48-4648-a5c0-940b02cbddc5" 
              alt="Stephanie Hunter"
              width={500}
              height={600}
              className="rounded-xl shadow-2xl object-cover aspect-[4/5]"
              data-ai-hint="professional woman"
            />
          </div>
        </div>

        <div className="mt-16 pt-12 border-t">
          <h3 className="text-2xl font-semibold text-primary text-center mb-8">Core Values & Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-secondary/30 rounded-lg shadow-md">
              <CheckCircle className="h-10 w-10 text-accent mx-auto mb-3" />
              <h4 className="text-xl font-medium mb-2">Ethical Practice</h4>
              <p className="text-muted-foreground text-sm">Upholding the highest ethical standards in all engagements, ensuring integrity and respect.</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg shadow-md">
              <CheckCircle className="h-10 w-10 text-accent mx-auto mb-3" />
              <h4 className="text-xl font-medium mb-2">Compassionate Engagement</h4>
              <p className="text-muted-foreground text-sm">Fostering connection and understanding through empathy and genuine care.</p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-lg shadow-md">
              <CheckCircle className="h-10 w-10 text-accent mx-auto mb-3" />
              <h4 className="text-xl font-medium mb-2">Trauma-Informed Approach</h4>
              <p className="text-muted-foreground text-sm">Recognizing the pervasive impact of trauma and integrating this knowledge into all services.</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
