
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed from Geist_Sans to Inter
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ // Changed from Geist_Sans to Inter
  variable: '--font-geist-sans', // Kept CSS variable name
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
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
