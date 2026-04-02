import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import AutomationSection from "@/components/AutomationSection";
import ImpactSection from "@/components/ImpactSection";
import SDGSection from "@/components/SDGSection";
import ResponsibleAISection from "@/components/ResponsibleAISection";
import FutureSection from "@/components/FutureSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <HowItWorksSection />
    <FeaturesSection />
    <DemoSection />
    <AutomationSection />
    <ImpactSection />
    <SDGSection />
    <ResponsibleAISection />
    <FutureSection />
    <Footer />
  </div>
);

export default Index;
