import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { Brain, FileSearch, ListChecks } from "lucide-react";

const icons = [Brain, FileSearch, ListChecks];
const colors = ["bg-primary/10 text-primary", "bg-secondary/10 text-secondary", "bg-eco-warning/10 text-eco-warning"];

const SolutionSection = () => {
  const { lang, t } = useLanguage();
  const s = t.solution;

  return (
    <SectionWrapper id="solution" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{s.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{s.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{s.desc[lang]}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {s.items.map((a, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="glass-card p-8 text-center group hover:eco-glow transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${colors[i]}`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{a.title[lang]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc[lang]}</p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default SolutionSection;
