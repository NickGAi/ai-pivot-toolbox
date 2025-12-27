export function Agents() {
  const agents = [
    { h: "Account Manager Agent", d: "Drafts weekly client updates, tracks sentiment, and flags renewal risk." },
    { h: "Project Manager Agent", d: "Meeting notes → tasks, owners, due dates, and status summaries." },
    { h: "Scope Guard Agent", d: "Detects scope creep signals and prompts change requests or approvals." },
    { h: "Sales Follow-up Agent", d: "Pipeline nudges, next steps, and follow-ups that don’t fall through." },
    { h: "Proposal + SOW Agent", d: "Builds SOW drafts from templates + prior wins + client context." },
    { h: "Delivery QA Agent", d: "Checks deliverables against brief, acceptance criteria, and past feedback." },
    { h: "Reporting Agent", d: "Weekly KPI snapshots and performance narratives for retainers." },
    { h: "Ops Analyst Agent", d: "Finds bottlenecks across clients, workload, utilization, and margins." }
  ];

  return (
    <section id="agents" className="py-9">
      <div className="wrap">
        <h2 className="text-3xl font-bold mb-2.5 text-foreground">Agency AI agents</h2>
        <p className="text-muted-foreground mb-4">These agents are designed around the coordination and documentation burden that wrecks delivery focus.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {agents.map((a, i) => (
            <div key={i} className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
              <div className="font-extrabold mb-1 text-foreground">{a.h}</div>
              <div className="text-muted-foreground text-[13px]">{a.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
