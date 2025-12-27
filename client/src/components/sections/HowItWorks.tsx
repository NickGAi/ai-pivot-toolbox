export function HowItWorks() {
  return (
    <section id="how" className="py-9">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <div className="card-base p-[18px]">
            <h2 className="text-[28px] font-bold mt-0 mb-2.5">How it works for agencies</h2>
            <p className="text-muted mb-4">
              AIPivot becomes the system of record for client work. That’s what makes agents accurate:
              they can “see” the deal, scope, deliverables, last conversation, current blockers, and billing status.
            </p>

            <div className="h-px bg-white/10 mb-4"></div>
            
            <div className="space-y-2.5">
              {[
                { badge: "A", title: "One client workspace", desc: "Every client gets a single timeline: comms, tasks, docs, approvals, invoices." },
                { badge: "B", title: "Structured delivery data", desc: "Clean entities (clients, projects, deliverables) so reporting and AI are reliable." },
                { badge: "C", title: "Agents automate coordination", desc: "Meeting notes → action items, follow-ups, status updates, weekly reporting." }
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start p-3.5 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="w-[30px] h-[30px] shrink-0 rounded-xl flex items-center justify-center font-black bg-[rgba(124,92,255,0.22)] border border-[rgba(124,92,255,0.35)] text-foreground">
                    {step.badge}
                  </div>
                  <div>
                    <div className="font-extrabold mb-0.5">{step.title}</div>
                    <div className="text-muted text-[13px]">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-[18px]">
            <div className="font-black text-lg mb-2.5">Outcomes agencies care about</div>
            
            <div className="space-y-2.5">
              {[
                { badge: "↑", title: "Higher margin per client", desc: "Less rework, fewer misalignments, less admin overhead." },
                { badge: "↓", title: "Less “where is that?”", desc: "No more hunting across Slack/Docs/PM tools for context." },
                { badge: "≡", title: "Consistent delivery cadence", desc: "Templates + SOPs + automated weekly updates keep clients calm." }
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start p-3.5 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="w-[30px] h-[30px] shrink-0 rounded-xl flex items-center justify-center font-black bg-[rgba(124,92,255,0.22)] border border-[rgba(124,92,255,0.35)] text-foreground">
                    {step.badge}
                  </div>
                  <div>
                    <div className="font-extrabold mb-0.5">{step.title}</div>
                    <div className="text-muted text-[13px]">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a className="btn btn-primary w-full justify-center" href="#book">Book a discovery call</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
