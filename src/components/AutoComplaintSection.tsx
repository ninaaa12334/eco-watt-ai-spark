import SectionWrapper from "./SectionWrapper";
import { FileText, Send, CheckCircle } from "lucide-react";

const AutoComplaintSection = () => (
  <SectionWrapper id="auto-complaint" className="bg-muted/30">
    <div className="text-center mb-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Action</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">Auto Complaint Generator</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
        Based on bill analysis and detected anomalies, the system generates a formal, evidence-based complaint ready to send to your electricity provider.
      </p>
    </div>

    <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-primary" />
        <h3 className="font-display font-semibold text-foreground">Generated Complaint Draft</h3>
      </div>

      <div className="p-5 rounded-xl bg-card border border-border/50 mb-5 font-mono text-sm text-foreground leading-relaxed">
        <p className="mb-3"><span className="font-semibold">Subject:</span> Formal Complaint — Suspicious Electricity Billing Anomalies</p>
        <p className="mb-3">Dear Customer Service,</p>
        <p className="mb-3">
          I am writing to report suspicious patterns identified in my recent electricity bills. Analysis of my consumption data from October 2025 to March 2026 reveals the following anomalies:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-3 text-muted-foreground">
          <li>December 2025: 21% unexpected increase in consumption with no change in household behavior</li>
          <li>March 2026: Usage 35% above the 6-month average</li>
          <li>Night tariff switch detected as delayed by 15–30 minutes on multiple occasions</li>
          <li>Daytime consumption charged at peak rates during expected off-peak hours</li>
        </ul>
        <p className="text-muted-foreground">I request a review of my meter and billing records. Supporting data analysis is attached.</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="btn-primary-eco flex-1"><Send className="w-4 h-4" /> Send to Provider</button>
        <button className="btn-outline-eco"><FileText className="w-4 h-4" /> Download PDF</button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-eco-success">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>Complaint includes specific dates, patterns, and supporting analysis</span>
      </div>
    </div>
  </SectionWrapper>
);

export default AutoComplaintSection;
