import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedServices />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
