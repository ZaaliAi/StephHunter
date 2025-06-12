
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import ContactCTA from '@/components/ContactCTA';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Stephanie Hunter – Keynote Speaker | Consultant | Trainer',
  description: 'Championing trauma-informed, ethical practice with compassion and integrity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <ContactCTA />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}