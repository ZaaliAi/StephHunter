
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Removed Sparkles
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Media', href: '/media' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [pathname]);


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 text-primary hover:text-accent transition-colors">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/stephanie-hunter.firebasestorage.app/o/1%20(1).png?alt=media&token=715f7993-5c5c-48ed-b7b5-17505ac5a339"
              alt="Stephanie Hunter Logo"
              width={225} 
              height={56} 
              className="object-contain"
              priority
            />
            {/* <Sparkles className="h-7 w-7" />
            <span className="text-xl font-semibold">Stephanie Hunter</span> */}
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild
                className={cn(
                  "text-foreground hover:bg-accent/10 hover:text-accent",
                  pathname === item.href && "text-accent font-semibold"
                )}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
             <Button asChild className="ml-2">
                <Link href="/contact">Book Stephanie</Link>
              </Button>
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg pb-4">
          <nav className="flex flex-col items-center space-y-2 px-4 pt-2">
            {navItems.map((item) => (
               <Button key={item.name} variant="ghost" asChild className={cn(
                "w-full text-center",
                pathname === item.href && "bg-accent/20 text-accent font-semibold"
              )}>
                <Link href={item.href} onClick={() => setIsOpen(false)}>{item.name}</Link>
              </Button>
            ))}
            <Button asChild className="w-full mt-2">
              <Link href="/contact" onClick={() => setIsOpen(false)}>Book Stephanie</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

