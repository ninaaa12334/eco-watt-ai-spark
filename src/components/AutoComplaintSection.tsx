import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";
import { FileText, Send, CheckCircle } from "lucide-react";

const AutoComplaintSection = () => {
  const { lang, t } = useLanguage();
  const c = t.complaint;

  return (
    <SectionWrapper id="auto-complaint" className="bg-muted/30">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{c.label[lang]}</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">{c.title[lang]}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{c.desc[lang]}</p>
      </div>
      <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="font-display font-semibold text-foreground">{c.draftTitle[lang]}</h3>
        </div>
        <div className="p-5 rounded-xl bg-card border border-border/50 mb-5 font-mono text-sm text-foreground leading-relaxed">
          <p className="mb-3"><span className="font-semibold">{c.subject[lang]}:</span> {c.subjectText[lang]}</p>
          <p className="mb-3">{c.greeting[lang]}</p>
          <p className="mb-3">{c.body[lang]}</p>
          <ul className="list-disc pl-5 space-y-1 mb-3 text-muted-foreground">
            {c.bullets.map((b, i) => <li key={i}>{b[lang]}</li>)}
          </ul>
          <p className="text-muted-foreground">{c.closing[lang]}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary-eco flex-1"><Send className="w-4 h-4" /> {c.sendBtn[lang]}</button>
          <button className="btn-outline-eco"><FileText className="w-4 h-4" /> {c.downloadBtn[lang]}</button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-eco-success">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{c.includesNote[lang]}</span>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AutoComplaintSection;
