import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-[54px] pb-[26px]">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-[22px] items-stretch">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pill mb-4">Replace the stack. Protect your margins.</span>
            <h1 className="text-[clamp(34px,4.2vw,54px)] leading-[1.05] tracking-[-0.8px] font-bold mb-3 text-foreground">
              One system to run your agency—<br className="hidden sm:block"/>with AI that actually works.
            </h1>
            <p className="text-muted-foreground text-lg max-w-[62ch] mb-6">
              AIPivot consolidates CRM, projects, docs, approvals, invoicing, and reporting into a single operating system.
              Then AI agents automate the repetitive coordination that kills agency margin: follow-ups, meeting notes, scope updates, and client comms.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <a className="btn btn-primary" href="#book">
                Book a discovery call
                <ArrowRight className="w-4 h-4" />
              </a>
              <a className="btn" href="#roi">Calculate agency ROI</a>
            </div>
            <div className="text-muted-foreground text-[13px] mb-8">For agencies delivering retainers, projects, or performance work—without the tool chaos.</div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { n: "Fewer handoffs", t: "One workflow across sales → delivery → billing" },
                { n: "Less admin", t: "Agents create tasks, summaries, updates" },
                { n: "Cleaner scope control", t: "Approvals + changes tracked end-to-end" }
              ].map((kpi, i) => (
                <div key={i} className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
                  <div className="text-lg font-extrabold text-foreground">{kpi.n}</div>
                  <div className="text-muted-foreground text-[13px] mt-1">{kpi.t}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Hero Card */}
          <motion.div 
            className="card-base p-[18px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between gap-2.5 mb-4">
              <div className="font-black text-lg text-foreground">Agency OS modules</div>
              <span className="pill py-1 px-2 text-xs">Plug in your branding</span>
            </div>
            <div className="h-px bg-[var(--border-color)] mb-4"></div>

            <div className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)] mb-2.5">
              <div className="font-extrabold mb-1 text-foreground">Client workspace</div>
              <div className="text-muted-foreground text-[13px]">One place for timelines, approvals, deliverables, and comms.</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
                <div className="font-extrabold mb-1 text-foreground">CRM</div>
                <div className="text-muted-foreground text-[13px]">Leads, deals</div>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
                <div className="font-extrabold mb-1 text-foreground">Delivery</div>
                <div className="text-muted-foreground text-[13px]">Boards, tasks</div>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
                <div className="font-extrabold mb-1 text-foreground">Docs</div>
                <div className="text-muted-foreground text-[13px]">SOWs, SOPs</div>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-base-bg)]">
                <div className="font-extrabold mb-1 text-foreground">Billing</div>
                <div className="text-muted-foreground text-[13px]">Invoices</div>
              </div>
            </div>

            <a className="btn btn-primary w-full justify-center" href="#demo">Try a demo</a>
            <div className="text-[12px] text-muted-foreground/80 mt-2 text-center">
              Replace demo link with your Loom, live sandbox, or product tour.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
