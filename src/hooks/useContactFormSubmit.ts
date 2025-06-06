import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ContactFormValues } from "@/components/ContactForm"; // Assuming this type is exported

// Moved from ContactForm.tsx - In a real app, this might be in an API service
async function submitContactFormApi(data: ContactFormValues): Promise<{ success: boolean; message: string }> {
  console.log("Form data submitted via hook:", data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate a random success/failure for demonstration
  // if (Math.random() > 0.5) {
  //   return { success: true, message: "Your message has been sent successfully!" };
  // } else {
  //   return { success: false, message: "Failed to send message. Please try again." };
  // }
  return { success: true, message: "Your message has been sent successfully! Stephanie will be in touch soon (from the hook)." };
}

interface UseContactFormSubmitOptions {
  // Need to pass the form instance to be able to reset it
  form: ReturnType<typeof useForm<ContactFormValues>>;
}

export function useContactFormSubmit({ form }: UseContactFormSubmitOptions) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitForm(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitContactFormApi(values);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset(); // Reset form on success
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    submitForm,
    isSubmitting,
  };
}
