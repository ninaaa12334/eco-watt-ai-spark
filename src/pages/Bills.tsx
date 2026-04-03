import Navbar from "@/components/Navbar";
import BillCheckerSection from "@/components/BillCheckerSection";
import { useLanguage } from "@/i18n/LanguageContext";

const Bills = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            {lang === "sq" ? "Kontrollues Fature" : "Bill Checker"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {lang === "sq"
              ? "Ngarkoni faturat, verifikoni tarifat ditë/natë dhe ruani historikun tuaj të faturave në një vend."
              : "Upload your bills, verify day/night tariff behavior, and keep a history of your bills in one place."}
          </p>
        </div>
        <BillCheckerSection />
      </main>
    </div>
  );
};

export default Bills;

