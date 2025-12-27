export function Features() {
  const features = [
    { h: "CRM + pipeline", d: "Leads, deals, stages, follow-ups, proposals." },
    { h: "Projects + delivery", d: "Boards, tasks, timelines, owners, dependencies." },
    { h: "Docs + approvals", d: "SOWs, briefs, SOPs, client approvals, versioning." },
    { h: "Invoicing + reporting", d: "Invoices, payment tracking, margin + KPI dashboards." }
  ];

  const workflowFeatures = [
    { h: "Retainers", d: "Recurring delivery + reporting" },
    { h: "Projects", d: "Milestones + approvals" },
    { h: "Change requests", d: "Scope control + billing hooks" },
    { h: "Client comms", d: "Updates, notes, history" }
  ];

  return (
    <section id="replace" className="py-9">
      <div className="wrap">
        <h2 className="text-3xl font-bold mb-2.5 text-foreground">Replace the agency tool stack</h2>
        <p className="text-muted-foreground mb-4">Keep what you love, but stop paying the “integration tax” and losing time to context switching.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <div key={i} className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
              <div className="font-extrabold mb-1 text-foreground">{f.h}</div>
              <div className="text-muted-foreground text-[13px]">{f.d}</div>
            </div>
          ))}
        </div>

        <div className="h-3.5"></div>

        <div className="card-base p-[18px]">
          <div className="font-black mb-4 text-foreground">Agency-native workflows included</div>
          <div className="h-px bg-[var(--border-color)] mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {workflowFeatures.map((f, i) => (
              <div key={i} className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
                <div className="font-extrabold mb-1 text-foreground">{f.h}</div>
                <div className="text-muted-foreground text-[13px]">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
