import Navbar from "@/components/Navbar";
import SmartApplianceSetup from "@/components/SmartApplianceSetup";
import { useLanguage } from "@/i18n/LanguageContext";

const Appliances = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8 mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            {lang === "sq" ? "Smart Appliance Setup" : "Smart Appliance Setup"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {lang === "sq"
              ? "Shtoni, menaxhoni dhe analizoni pajisjet tuaja shtëpiake. Fotot mund të identifikohen automatikisht nga AI – ju i konfirmoni para se të ruhen."
              : "Add, manage and analyze your home appliances. Photos can be auto-identified by AI – you confirm everything before saving."}
          </p>
        </div>
        <SmartApplianceSetup />
      </main>
    </div>
  );
};

export default Appliances;

