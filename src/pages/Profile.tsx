import { useState } from "react";
import Navbar from "@/components/Navbar";
import DemoSection from "@/components/DemoSection";
import BillCheckerSection from "@/components/BillCheckerSection";
import BillAnomalyAlerts from "@/components/BillAnomalyAlerts";
import ImpactSection from "@/components/ImpactSection";
import SmartApplianceSetup from "@/components/SmartApplianceSetup";
import { useLanguage } from "@/i18n/LanguageContext";
import { useDashboard } from "@/hooks/useEnergy";
import { FileText } from "lucide-react";

const Profile = () => {
  const { lang } = useLanguage();
  const { data: dashboard, isLoading } = useDashboard();
  const [showComplaintTool, setShowComplaintTool] = useState(false);
  const [complaintInput, setComplaintInput] = useState("");

  const topWasteDevices =
    dashboard?.devices
      ?.filter((d) => (d.waste_kwh || 0) > 0)
      .sort((a, b) => (b.waste_kwh || 0) - (a.waste_kwh || 0))
      .slice(0, 3) || [];

  const recommendations = dashboard?.recommendations || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto space-y-10">
        <section className="glass-card p-6 md:p-8 rounded-2xl">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            {lang === "sq" ? "Profili im energjetik" : "My Energy Profile"}
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            {lang === "sq"
              ? "Ky panel ruan kursimet, pajisjet dhe faturat tuaja — një përmbledhje personale e ndikimit tuaj."
              : "This dashboard keeps your savings, devices, and bills in one place — your personal impact summary."}
          </p>
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              {lang === "sq" ? "Duke ngarkuar të dhënat e profilit..." : "Loading your profile data..."}
            </p>
          )}
          {!isLoading && dashboard && (
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="text-xs text-muted-foreground">
                  {lang === "sq" ? "Kursime mujore të vlerësuara" : "Estimated monthly savings"}
                </div>
                <div className="text-2xl font-display font-bold text-primary mt-1">
                  €{(dashboard.estimatedSavings || 0).toFixed(2)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="text-xs text-muted-foreground">
                  {lang === "sq" ? "Pikët e energjisë" : "Energy score"}
                </div>
                <div className="text-2xl font-display font-bold text-secondary mt-1">
                  {dashboard.energyScore}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-eco-teal/5 border border-eco-teal/20">
                <div className="text-xs text-muted-foreground">
                  {lang === "sq" ? "CO₂ e shmangur" : "CO₂ avoided"}
                </div>
                <div className="text-2xl font-display font-bold text-eco-teal mt-1">
                  {dashboard.co2Reduction.toFixed(1)} kg
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {lang === "sq" ? "Burimet kryesore të humbjeve" : "Top waste sources"}
            </h2>
            {topWasteDevices.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {lang === "sq"
                  ? "Shtoni pajisje në 'Smart Appliance Setup' për të parë burimet kryesore të humbjeve."
                  : "Add devices in Smart Appliance Setup to see your top waste sources."}
              </p>
            ) : (
              <ul className="space-y-3 text-sm">
                {topWasteDevices.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/60 border border-border/40"
                  >
                    <div>
                      <div className="font-medium text-foreground">{d.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {d.room} · {d.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {lang === "sq" ? "Humbje të vlerësuara" : "Est. waste"}
                      </div>
                      <div className="text-sm font-semibold text-destructive">
                        {(d.waste_kwh || 0).toFixed(2)} kWh
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              {lang === "sq" ? "Rekomandime personale" : "Personalized recommendations"}
            </h2>
            {recommendations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {lang === "sq"
                  ? "Përdorni 'Smart Appliance Setup' dhe 'Bill Checker' për të gjeneruar rekomandime personale."
                  : "Use Smart Appliance Setup and Bill Checker to generate personalized recommendations."}
              </p>
            ) : (
              <ul className="space-y-3 text-sm">
                {recommendations.map((r) => (
                  <li
                    key={r.id}
                    className="p-3 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-foreground">
                        {lang === "sq" ? r.text_sq : r.text_en}
                      </p>
                      <span className="text-xs font-medium text-primary whitespace-nowrap">
                        {(lang === "sq" ? "Ndikim: " : "Impact: ") + (r.priority || "—")}
                      </span>
                    </div>
                    {(r.estimated_savings_kwh || r.estimated_savings_eur) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {lang === "sq" ? "Kursime të vlerësuara: " : "Estimated savings: "}
                        {r.estimated_savings_kwh
                          ? `${r.estimated_savings_kwh.toFixed(1)} kWh `
                          : ""}
                        {r.estimated_savings_eur
                          ? `(~€${r.estimated_savings_eur.toFixed(2)})`
                          : ""}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section>
          <div className="mb-2">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
              {lang === "sq" ? "Smart Appliance Setup" : "Smart Appliance Setup"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {lang === "sq"
                ? "Menaxhoni të gjitha pajisjet tuaja këtu: shtim manual, ngarkim fotosh, verifikim AI, editim dhe fshirje."
                : "Manage all your appliances here: manual add, photo upload, AI detection, edit, and delete."}
            </p>
          </div>
          <SmartApplianceSetup />
        </section>

        <DemoSection />
        <BillCheckerSection />
        <BillAnomalyAlerts />

        <section className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {lang === "sq" ? "Auto Complaint Generator" : "Auto Complaint Generator"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {lang === "sq"
                  ? "Klikoni butonin për të hapur gjeneratorin e ankesës dhe shkruani detajet tuaja."
                  : "Click the button to open the complaint generator and type your details."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowComplaintTool((prev) => !prev)}
              className="btn-outline-eco text-sm"
            >
              <FileText className="w-4 h-4" />
              {showComplaintTool
                ? lang === "sq"
                  ? "Mbylle"
                  : "Close"
                : lang === "sq"
                  ? "Hap Gjeneratorin"
                  : "Open Generator"}
            </button>
          </div>

          {showComplaintTool && (
            <div className="mt-5 space-y-4">
              <textarea
                value={complaintInput}
                onChange={(e) => setComplaintInput(e.target.value)}
                placeholder={
                  lang === "sq"
                    ? "Shkruani problemin tuaj (p.sh. data e faturës, anomalia, ndërrimi i tarifës, zona juaj)..."
                    : "Type your issue (e.g. bill date, anomaly, tariff switching problem, your area)..."
                }
                className="w-full min-h-[120px] px-3 py-2.5 rounded-xl border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-sm text-foreground whitespace-pre-wrap">
                {complaintInput.trim()
                  ? `${
                      lang === "sq" ? "Ankesë e Gjeneruar:\n\n" : "Generated Complaint:\n\n"
                    }${
                      lang === "sq"
                        ? "I/E nderuar Shërbimi i Klientëve,\n\nPo paraqes këtë ankesë lidhur me faturimin/tarifimin e energjisë elektrike. Bazuar në të dhënat e mia dhe verifikimet e fundit, kam vërejtur këto çështje:\n\n"
                        : "Dear Customer Service,\n\nI am submitting this complaint regarding my electricity billing/tariff behavior. Based on my data and recent checks, I observed the following issues:\n\n"
                    }${complaintInput}\n\n${
                      lang === "sq"
                        ? "Kërkoj rishikim të rastit dhe korrigjim të faturimit nëse konfirmohen mospërputhje.\n\nFaleminderit."
                        : "I request a full review of this case and billing correction if discrepancies are confirmed.\n\nThank you."
                    }`
                  : lang === "sq"
                    ? "Shkruani detajet sipër për të gjeneruar automatikisht draftin e ankesës."
                    : "Type details above to auto-generate your complaint draft."}
              </div>
            </div>
          )}
        </section>

        <ImpactSection />
      </main>
    </div>
  );
};

export default Profile;

