import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import AnimatedCounter from "./AnimatedCounter";
import { Zap, DollarSign, TrendingDown, Leaf } from "lucide-react";

const metricIcons = [Zap, DollarSign, TrendingDown, Leaf];
const metricValues = [42, 14.3, 9, 21];
const metricColors = ["text-primary", "text-eco-success", "text-secondary", "text-eco-teal"];
const metricDecimals = [0, 1, 0, 0];

const ImpactSection = () => {
  const { lang, t } = useLanguage();
  const imp = t.impact;

  return (
    <SectionWrapper id="impact">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{imp.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{imp.title[lang]}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {imp.metrics.map((m, i) => {
          const Icon = metricIcons[i];
          return (
            <div key={i} className="glass-card p-8 text-center group hover:eco-glow transition-all duration-300">
              <Icon className={`w-8 h-8 ${metricColors[i]} mx-auto mb-4`} />
              <div className={`text-4xl font-bold font-display ${metricColors[i]} mb-2`}>
                <AnimatedCounter end={metricValues[i]} prefix={m.prefix} suffix={m.suffix} decimals={metricDecimals[i]} />
              </div>
              <p className="text-sm text-muted-foreground">{m.label[lang]}</p>
              <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((metricValues[i] / 50) * 100, 100)}%`, background: "var(--gradient-primary)" }} />
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default ImpactSection;
