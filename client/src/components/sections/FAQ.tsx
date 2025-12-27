import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="py-9">
      <div className="wrap">
        <h2 className="text-[28px] font-bold mb-2.5 text-foreground">FAQ</h2>
        <p className="text-muted-foreground mb-4">Common questions agencies ask before consolidating their stack.</p>

        <Accordion type="single" collapsible className="space-y-2.5">
          <AccordionItem value="item-1" className="border border-[var(--border-color)] bg-[var(--card-base-bg)] rounded-2xl px-3.5">
            <AccordionTrigger className="hover:no-underline font-extrabold text-[15px] py-4 text-foreground">Do we have to replace everything at once?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-[15px] pb-4">
              No. Most agencies start with client workspaces + delivery + reporting, then migrate CRM and billing after v1 proves value.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-[var(--border-color)] bg-[var(--card-base-bg)] rounded-2xl px-3.5">
            <AccordionTrigger className="hover:no-underline font-extrabold text-[15px] py-4 text-foreground">Will this work for retainers and projects?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-[15px] pb-4">
              Yes. The platform supports both recurring (retainer) workflows and milestone-based project delivery, with approvals and scope tracking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-[var(--border-color)] bg-[var(--card-base-bg)] rounded-2xl px-3.5">
            <AccordionTrigger className="hover:no-underline font-extrabold text-[15px] py-4 text-foreground">Why will the AI be more accurate than “generic ChatGPT workflows”?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-[15px] pb-4">
              Because AIPivot unifies your operational context (scope, tasks, comms, invoices) so agents retrieve the right facts before acting.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-[var(--border-color)] bg-[var(--card-base-bg)] rounded-2xl px-3.5">
            <AccordionTrigger className="hover:no-underline font-extrabold text-[15px] py-4 text-foreground">Can clients access their workspace?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-[15px] pb-4">
              Yes, with permissioning. Clients can view status, approve deliverables, and see relevant documents without exposing internal notes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
