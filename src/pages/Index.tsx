import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SmartApplianceSetup from "@/components/SmartApplianceSetup";
import SmartInputSection from "@/components/SmartInputSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import BillCheckerSection from "@/components/BillCheckerSection";
import DayNightVerifier from "@/components/DayNightVerifier";
import ConsumptionAnalyzer from "@/components/ConsumptionAnalyzer";
import CommunityMap from "@/components/CommunityMap";
import AutoComplaintSection from "@/components/AutoComplaintSection";
import BillAnomalyAlerts from "@/components/BillAnomalyAlerts";
import SmartBillVerification from "@/components/SmartBillVerification";
import KEDSContactSection from "@/components/KEDSContactSection";
import ImpactSection from "@/components/ImpactSection";
import WhyItMattersSection from "@/components/WhyItMattersSection";
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
    <SmartApplianceSetup />
    <SmartInputSection />
    <FeaturesSection />
    <DemoSection />
    <BillCheckerSection />
    <DayNightVerifier />
    <ConsumptionAnalyzer />
    <CommunityMap />
    <AutoComplaintSection />
    <BillAnomalyAlerts />
    <SmartBillVerification />
    <KEDSContactSection />
    <ImpactSection />
    <WhyItMattersSection />
    <SDGSection />
    <ResponsibleAISection />
    <FutureSection />
    <Footer />
  </div>
);

export default Index;
