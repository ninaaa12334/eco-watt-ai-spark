import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyItMattersSection from "@/components/WhyItMattersSection";
import SDGSection from "@/components/SDGSection";
import ResponsibleAISection from "@/components/ResponsibleAISection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <HowItWorksSection />
    <WhyItMattersSection />
    <SDGSection />
    <ResponsibleAISection />
    <Footer />
  </div>
);

export default Index;
