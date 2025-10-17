// src/app/page.tsx
// This is a Server Component by default

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedJobs from '@/components/FeaturedJobs';
import Footer from '@/components/Footer';

// Define the main page component
export default function HomePage() {
  return (
    // You might want to define the font/styles in the main layout (app/layout.tsx)
    // but we'll apply a basic container here.
    <div className="min-h-screen bg-white font-sans antialiased">
      
      {/* The Header component is used at the top of the page.
        In a real application, you might put this in app/layout.tsx if it's universal.
      */}
      <Header />
      
      {/* Main content area */}
      <main>
        {/* The Hero section with the main headline and CTA */}
        <Hero />
        
        {/* The "Empleos destacados" section */}
        <FeaturedJobs />
      </main>
      
      {/* The Footer with user info and links */}
      <Footer />
      
    </div>
  );
}