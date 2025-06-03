
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {currentYear} Stephanie Hunter. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          <Link href="/admin/login" className="hover:underline">
            Admin Log In
          </Link>
        </p>
        {/* Optional: Add social media links or other footer content here */}
      </div>
    </footer>
  );
}
