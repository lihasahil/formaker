import CTA from "./_components/CTA";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
