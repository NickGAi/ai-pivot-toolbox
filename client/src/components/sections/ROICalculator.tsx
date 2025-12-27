import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const TOOLS = [
  "ClickUp", "Asana", "Monday.com", "Trello",
  "HubSpot", "Pipedrive", "Salesforce",
  "Slack", "Google Workspace", "Microsoft 365",
  "Notion", "Confluence",
  "Zapier", "Make.com",
  "Harvest", "Toggl", "Clockify",
  "Xero", "QuickBooks",
  "Figma", "Miro"
];

const DEFAULT_TOOLS = new Set(["ClickUp", "Slack", "HubSpot", "Notion"]);

export function ROICalculator() {
  const [selectedTools, setSelectedTools] = useState<Set<string>>(DEFAULT_TOOLS);
  const [inputs, setInputs] = useState({
    adminHours: 6,
    meetHours: 3,
    teamSize: 8,
    hourlyRate: 65,
    toolCost: 25,
    reworkPct: 8
  });

  const toggleTool = (tool: string) => {
    const next = new Set(selectedTools);
    if (next.has(tool)) next.delete(tool);
    else next.add(tool);
    setSelectedTools(next);
  };

  const results = useMemo(() => {
    const toolCount = selectedTools.size;
    
    // Annual SaaS
    const annualSaaS = toolCount * inputs.toolCost * inputs.teamSize * 12;

    // Annual Coordination Time
    const weeklyCoordHours = (inputs.adminHours + inputs.meetHours) * inputs.teamSize;
    const annualCoord = weeklyCoordHours * inputs.hourlyRate * 52;

    const weeklyTotalHours = (inputs.adminHours + inputs.meetHours) * inputs.teamSize;
    const weeklyReworkHours = weeklyTotalHours * (inputs.reworkPct / 100);
    const annualRework = weeklyReworkHours * inputs.hourlyRate * 52;

    const total = annualSaaS + annualCoord + annualRework;

    return {
      total,
      breakdown: { saas: annualSaaS, coord: annualCoord, rework: annualRework, toolCount }
    };
  }, [selectedTools, inputs]);

  const currency = (n: number) => n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="roi" className="py-9">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <div>
            <h2 className="text-3xl font-bold mb-2.5 text-foreground">Agency ROI Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Estimate what your agency loses to tool sprawl, context switching, and admin. Directional benchmark only.
            </p>

            <div className="card-base p-[18px]">
              <div className="font-extrabold mb-2 text-foreground">Which tools are you currently using?</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                {TOOLS.map(tool => (
                  <label 
                    key={tool} 
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-[14px] border cursor-pointer select-none transition-colors",
                      selectedTools.has(tool) ? "border-primary/50 bg-primary/10 text-primary" : "border-[var(--border-color)] bg-[var(--card-base-bg)] text-foreground"
                    )}
                  >
                    <input 
                      type="checkbox" 
                      className="accent-primary w-4 h-4 rounded"
                      checked={selectedTools.has(tool)}
                      onChange={() => toggleTool(tool)}
                    />
                    <span className="text-sm">{tool}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: "adminHours", label: "Admin + coordination (hrs/person/wk)", min: 0, step: 1 },
                  { id: "meetHours", label: "Internal meetings (hrs/person/wk)", min: 0, step: 1 },
                  { id: "teamSize", label: "Team size", min: 1, step: 1 },
                  { id: "hourlyRate", label: "Avg loaded hourly cost (USD)", min: 0, step: 5 },
                  { id: "toolCost", label: "Avg tool cost per user/mo (USD)", min: 0, step: 5 },
                  { id: "reworkPct", label: "Rework from misalignment (%)", min: 0, step: 1 },
                ].map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-muted-foreground text-[13px] mb-1.5">{field.label}</label>
                    <input 
                      id={field.id}
                      type="number"
                      className="w-full px-3 py-3 rounded-[14px] border border-[var(--border-color)] bg-[var(--card-base-bg)] text-foreground outline-none focus:border-primary/55 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.15)] transition-all"
                      min={field.min}
                      step={field.step}
                      // @ts-ignore
                      value={inputs[field.id]}
                      // @ts-ignore
                      onChange={(e) => setInputs({...inputs, [field.id]: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3.5 rounded-2xl border border-dashed border-[var(--border-color)] bg-secondary/10">
                <div className="text-muted-foreground text-[13px]">Estimated annual waste</div>
                <div className="text-[30px] font-black tracking-[-0.3px] my-1 text-foreground">{currency(results.total)}</div>
                <div className="text-muted-foreground text-[13px] leading-relaxed">
                  SaaS: {currency(results.breakdown.saas)} ({results.breakdown.toolCount} tools) + 
                  Coordination: {currency(results.breakdown.coord)} + 
                  Rework: {currency(results.breakdown.rework)}
                </div>
              </div>

              <div className="text-[12px] text-muted-foreground/80 mt-2.5">
                Includes: annual SaaS cost + admin/meeting time + rework time estimate (as % of total time).
              </div>
            </div>
          </div>

          <div className="card-base p-[18px]">
            <div className="font-black text-lg text-foreground">What AIPivot replaces for agencies</div>
            <p className="text-muted-foreground text-sm mt-2 mb-6">
              Most agencies are stitched together with CRMs + PM tools + docs + chat + invoicing + dashboards.
              AIPivot consolidates the system and makes the data usable for AI.
            </p>

            <div className="space-y-2.5">
              {[
                { badge: "1", title: "Unify client delivery", desc: "Workstreams, approvals, deliverables, and comms in one client workspace." },
                { badge: "2", title: "Stop losing scope", desc: "SOWs + change requests + status updates linked to tasks and billing." },
                { badge: "3", title: "Deploy coordination agents", desc: "Agents handle follow-ups, summaries, updates, and reporting." }
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
                  <div className="w-[30px] h-[30px] shrink-0 rounded-xl flex items-center justify-center font-black bg-primary/20 border border-primary/35 text-foreground">
                    {step.badge}
                  </div>
                  <div>
                    <div className="font-extrabold mb-0.5 text-foreground">{step.title}</div>
                    <div className="text-muted-foreground text-[13px]">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a className="btn w-full justify-center" href="#agents">See the agency agent suite</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
