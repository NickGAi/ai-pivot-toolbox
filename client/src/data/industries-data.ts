export interface IndustryData {
  slug: string;
  industry: string;
  headline: string;
  tagline: string;
  painHook: string;
  intro: string;
  painPoints: { title: string; desc: string }[];
  topServices: { name: string; slug: string; benefit: string }[];
  stats: { value: string; label: string; source: string }[];
  caseStudy: { result: string; detail: string; metrics: string[] };
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const industriesData: IndustryData[] = [
  {
    slug: "ai-for-real-estate",
    industry: "Real Estate",
    headline: "AI Automation for Real Estate Agencies in Australia",
    tagline: "Handle more enquiries, book more inspections, convert more buyers — without more staff.",
    painHook: "Right now, somewhere between 40% and 60% of your buyer enquiries are going unanswered. Not because your agents don't care — because those enquiries land at 9pm on a Tuesday when everyone's gone home. The buyer waits five minutes, then submits to the next agency on the list. Meanwhile your team is spending Monday morning manually booking inspections, chasing CRM updates, and following up leads that have already gone cold. Every missed enquiry is a lost listing. Every hour on admin is an hour not spent closing deals.",
    intro: "Australian real estate agencies receive hundreds of property enquiries every week. Most get slow responses, incomplete follow-up, and missed leads after hours. AI Pivot Toolbox deploys AI voice agents, chatbots, and workflow automation that respond instantly 24/7, qualify buyer and renter intent, book inspections, and sync everything to your CRM — for less than the cost of a part-time admin.",
    painPoints: [
      { title: "After-hours enquiries go unanswered", desc: "Most buyer enquiries arrive outside business hours. Without 24/7 response, leads go cold before you call back." },
      { title: "Agents waste time on unqualified leads", desc: "Hours spent on tyre-kickers who aren't ready to buy, when that time should go to serious buyers." },
      { title: "Inspection bookings are a manual process", desc: "Coordinating inspection times across multiple agents and properties via email and phone is a massive time sink." },
      { title: "Follow-up falls through the cracks", desc: "Without automated follow-up sequences, hot leads cool off and listings lose momentum." },
      { title: "CRM data is always out of date", desc: "Manual CRM updates mean contact records are incomplete, duplicate, or stale — making reporting unreliable." },
    ],
    topServices: [
      { name: "AI Voice Agent", slug: "ai-voice-agents", benefit: "Answers inbound property enquiries 24/7, qualifies buyer intent, and books inspections automatically" },
      { name: "AI Chatbot", slug: "ai-chatbot-australia", benefit: "Engages website visitors instantly, captures their requirements, and routes them to the right listing or agent" },
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates CRM updates, follow-up sequences, and inspection confirmations — no manual work" },
      { name: "AI Lead Nurturing", slug: "ai-voice-agents", benefit: "Keeps leads warm with automated email and SMS follow-up until they're ready to buy" },
    ],
    stats: [
      { value: "400+", label: "Buyer enquiries handled monthly by AI for one real estate client", source: "AI Pivot deployments" },
      { value: "60%", label: "Reduction in manual admin for property management", source: "AI Pivot deployments" },
      { value: "24/7", label: "Availability — AI answers calls and chats at any hour", source: "AI Pivot Toolbox" },
    ],
    caseStudy: {
      result: "Real estate agency handling 400+ buyer enquiries monthly without extra staff",
      detail: "An Australian real estate agency with 8 agents was missing 40–50% of inbound enquiries after hours and spending 15+ hours per week on manual inspection booking and follow-up. AI Pivot Toolbox deployed an AI voice agent for inbound calls, an AI chatbot on their website, and automated follow-up sequences via their CRM. The result: 100% of enquiries responded to within 90 seconds, inspection bookings automated, and 15 hours of admin eliminated per week.",
      metrics: ["100% of enquiries responded to within 90 seconds", "15 hours of admin eliminated per week", "22% increase in inspection bookings in 60 days", "Zero missed after-hours leads"],
    },
    faqs: [
      { q: "How does AI handle real estate enquiries without an agent?", a: "The AI voice agent is trained on your property listings, pricing, availability, and common buyer questions. It can answer FAQs, qualify buyer intent (price range, timeline, property type), check inspection availability, and book times directly into the agent's calendar — all without human involvement. Complex queries or serious buyers are escalated to a human agent with a full conversation transcript." },
      { q: "Which real estate CRMs does the AI integrate with?", a: "We integrate with REX, Agentbox, Vault RE, PropertyMe, Console Cloud, Salesforce, and most major real estate CRMs. Integration includes automated contact creation, lead source tracking, and follow-up sequence triggers based on lead status." },
      { q: "Can AI automation help with property management as well as sales?", a: "Yes. For property management, the most impactful automations are: maintenance request triage and dispatch, rent arrears reminder sequences, lease renewal workflows, and routine inspection scheduling. These typically save property managers 8–12 hours per week." },
    ],
    metaTitle: "AI Automation for Real Estate Agencies Australia | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian real estate agencies. Handle 400+ enquiries monthly, book inspections 24/7, and automate CRM updates — without extra staff. Free strategy call.",
  },
  {
    slug: "ai-for-healthcare",
    industry: "Healthcare",
    headline: "AI Automation for Healthcare Practices in Australia",
    tagline: "Fewer no-shows. Less admin. More time for patients.",
    painHook: "Your practitioners spent years training to help patients — not to chase referral letters, leave reminder voicemails, and manually reconcile Medicare billing. Yet that's exactly where the hours go. The average Australian healthcare practice loses $1,200–$2,000 per week to no-shows alone, while clinical admin staff spend half their day on tasks that haven't changed since the fax machine. Patients call after hours and hang up without booking. Documents sit in inboxes waiting to be entered manually. It's not a staffing problem — it's a systems problem.",
    intro: "Australian healthcare practices face a relentless administrative burden — appointment scheduling, referral management, patient reminders, billing, and compliance documentation. AI Pivot Toolbox builds AI automation that integrates with practice management software, reduces no-shows by up to 60%, and saves clinical admin staff 10–20 hours per week — while maintaining full compliance with Australian privacy requirements.",
    painPoints: [
      { title: "High no-show and cancellation rates", desc: "No-shows cost practices thousands per week in lost revenue and wasted appointment slots." },
      { title: "Manual referral coordination", desc: "GP referrals to specialists involve phone calls, faxes, and manual follow-up — consuming hours of admin time." },
      { title: "After-hours appointment requests", desc: "Patients who call after hours often go to a competitor rather than leave a message." },
      { title: "Billing and Medicare reconciliation", desc: "Manual billing processes create delays, errors, and significant time costs for front desk staff." },
      { title: "Privacy Act compliance burden", desc: "Managing patient data across systems creates compliance risk and documentation overhead." },
    ],
    topServices: [
      { name: "AI Voice Agent", slug: "ai-voice-agents", benefit: "Books appointments, handles FAQs, and sends reminders 24/7 — integrated with your practice management software" },
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates referral processing, billing prep, and patient communication workflows" },
      { name: "AI Chatbot", slug: "ai-chatbot-australia", benefit: "Handles online appointment requests, pre-consultation questions, and intake form collection" },
      { name: "CRM Integrations", slug: "ai-integrations", benefit: "Connects your practice management system with billing, referral, and communication tools" },
    ],
    stats: [
      { value: "60%", label: "Reduction in appointment no-shows with AI reminders", source: "AI Pivot deployments" },
      { value: "10–20hrs", label: "Admin saved per week per practice", source: "AI Pivot deployments" },
      { value: "100%", label: "Privacy Act 1988 compliant — all implementations", source: "AI Pivot Toolbox" },
    ],
    caseStudy: {
      result: "Healthcare practice reduced no-shows from 22% to 8% in 90 days",
      detail: "A multi-practitioner allied health practice was losing 22% of appointments to no-shows and spending 8 hours per week on manual reminder calls. AI Pivot Toolbox deployed an automated reminder system with two-way SMS, an AI voice agent for after-hours bookings, and an online intake automation. No-shows dropped to 8% within 90 days, after-hours booking requests increased 35%, and the front desk saved 8 hours per week on manual calls.",
      metrics: ["No-show rate reduced from 22% to 8%", "8 hours per week saved on reminder calls", "35% increase in after-hours booking requests", "Zero manual intake form data entry"],
    },
    faqs: [
      { q: "Is AI automation compliant with Australian healthcare privacy laws?", a: "Yes. All AI Pivot Toolbox healthcare implementations are designed to comply with the Privacy Act 1988, Australian Privacy Principles (APPs), and My Health Records Act. We implement data minimisation, access controls, full audit trails, and ensure patient data is only processed through compliant platforms. We do not store patient health information on third-party platforms without appropriate data processing agreements." },
      { q: "Which practice management systems do you integrate with?", a: "We integrate with Best Practice, Medical Director, Genie Solutions, Cliniko, Power Diary, Nookal, Coreplus, and most major Australian practice management systems. Integration enables automated appointment reminders, real-time availability checking, and patient record syncing without manual data entry." },
      { q: "Can AI handle Medicare and billing processes?", a: "AI can automate the preparation and routing of billing data, but cannot submit Medicare claims directly (this requires a registered provider). We automate the billing preparation workflow — extracting consultation codes, matching to patient records, and preparing claim batches for review — reducing the time required for billing by 60–80%." },
    ],
    metaTitle: "AI Automation for Healthcare Practices Australia | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian healthcare and allied health practices. Reduce no-shows by 60%, save 10–20 hours of admin weekly, and automate referral and billing workflows. Free strategy call.",
  },
  {
    slug: "ai-for-legal",
    industry: "Legal",
    headline: "AI Automation for Law Firms in Australia",
    tagline: "Less admin. More billable hours. Better client experience.",
    painHook: "The average Australian solicitor writes off 2–3 hours of non-billable admin every single day. That's 10–15 hours a week — roughly $1,500–$3,000 in uncaptured revenue, per fee earner, every week. Conflict checks done manually. New clients onboarded with spreadsheets and email chains. Disbursements missed because nobody remembered to record them. Documents chased three times before they arrive. Every one of those tasks is necessary — but none of it needs a lawyer to do it. And right now, every one of them does.",
    intro: "Australian law firms lose thousands in billable hours each week to non-billable admin — client intake, document collection, billing, appointment scheduling, and follow-up. AI Pivot Toolbox builds legal-specific AI automation that handles the admin load, improves client response times, and lets your lawyers focus on the work that actually generates revenue. Built with Privacy Act compliance and legal professional obligations in mind.",
    painPoints: [
      { title: "Client intake is slow and manual", desc: "Collecting conflict checks, engagement letters, ID verification, and initial information takes hours of non-billable time." },
      { title: "Document requests and chasing", desc: "Following up clients for documents, signatures, and information is a constant drain on legal assistants." },
      { title: "Unbilled disbursements and time", desc: "Manual billing processes mean billable time and disbursements regularly go uncaptured." },
      { title: "After-hours enquiries", desc: "Potential clients calling after hours often move to a competitor rather than wait for a callback." },
      { title: "Compliance documentation overhead", desc: "AML/CTF checks, file notes, and compliance records create significant documentation workload." },
    ],
    topServices: [
      { name: "AI Chatbot", slug: "ai-chatbot-australia", benefit: "Initial matter intake 24/7 — captures matter type, urgency, and client details before booking a consultation" },
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates document collection, conflict checks, and client onboarding workflows" },
      { name: "AI Voice Agent", slug: "ai-voice-agents", benefit: "Answers after-hours enquiries, takes initial details, and books consultations into your calendar" },
      { name: "CRM Integrations", slug: "ai-integrations", benefit: "Connects your practice management system with billing, document, and communication tools" },
    ],
    stats: [
      { value: "28hrs", label: "Admin saved per week at one legal practice", source: "AI Pivot deployments" },
      { value: "45min → 90sec", label: "New client setup time after CRM automation", source: "AI Pivot deployments" },
      { value: "100%", label: "Privacy Act and legal professional obligation compliant", source: "AI Pivot Toolbox" },
    ],
    caseStudy: {
      result: "Law firm saved 28 hours of admin per week across 3 fee earners",
      detail: "A boutique commercial law firm with 3 solicitors was spending 28 hours per week on non-billable admin — client intake, document chasing, billing preparation, and scheduling. AI Pivot Toolbox automated the intake process (chatbot captures matter type and books consultations), document collection (automated reminders with DocuSign integration), and billing prep (time entry review and disbursement capture). Fee earners recovered 9+ hours each per week.",
      metrics: ["28 hours of admin saved per week", "Client intake reduced from 45 minutes to 5 minutes", "100% of disbursements captured automatically", "After-hours enquiries converted to consultations"],
    },
    faqs: [
      { q: "Is AI automation appropriate for a regulated legal practice?", a: "Yes, with the right implementation. AI Pivot Toolbox focuses on automating administrative processes — not legal advice or decision-making. Our implementations comply with the Privacy Act 1988, the relevant state law society rules on client data handling, and AML/CTF requirements. All AI outputs are reviewed by a human before any client-facing action is taken." },
      { q: "Can AI handle conflict of interest checks?", a: "AI can automate the data collection phase of conflict checking — capturing new client and matter details, searching against your existing client database, and flagging potential conflicts for review. The final conflict determination remains with the supervising solicitor. This typically reduces conflict check time from 30 minutes to under 5 minutes." },
      { q: "What practice management systems do you integrate with?", a: "We integrate with LEAP, Actionstep, Smokeball, FilePro, Clio, and most major Australian legal practice management systems. We also integrate with document management systems (NetDocuments, iManage) and e-signing platforms (DocuSign, Adobe Sign)." },
    ],
    metaTitle: "AI for Law Firms Australia | Legal Admin Automation | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian law firms. Automate client intake, document collection, and billing prep. Save 28+ hours of non-billable admin weekly. Privacy Act compliant. Free strategy call.",
  },
  {
    slug: "ai-for-accounting",
    industry: "Accounting",
    headline: "AI Automation for Accounting Firms in Australia",
    tagline: "Less data entry, more advisory. That's how accounting firms grow.",
    painHook: "Your accountants are qualified professionals — yet most of their week is spent keying transactions into Xero, chasing clients for bank statements that are three weeks overdue, and manually preparing BAS returns that AI could draft in minutes. Tax time shouldn't feel like a death march. But when your team is drowning in low-value data entry from July to October every year, advisory work gets squeezed out entirely. Clients who need strategic guidance get a harried email and a rushed phone call. That's not the practice you built — and it's not what your clients are paying for.",
    intro: "Australian accounting firms are under pressure to do more with less — more advisory work, more client service, less time on manual data entry, reconciliation, and document chasing. AI Pivot Toolbox builds accounting-specific automation that integrates with Xero and MYOB, automates the low-value tasks, and frees your accountants to do the work clients actually pay for.",
    painPoints: [
      { title: "Manual data entry and reconciliation", desc: "Hours spent entering transactions, matching receipts, and reconciling accounts that AI can handle automatically." },
      { title: "Document collection from clients", desc: "Chasing clients for bank statements, receipts, and records consumes significant admin time each month." },
      { title: "BAS and compliance lodgements", desc: "Preparing and reviewing BAS, IAS, and annual returns involves significant manual data handling." },
      { title: "Client communication and follow-up", desc: "Keeping clients informed of deadlines, outstanding items, and lodgement status is a constant admin burden." },
      { title: "ATO correspondence management", desc: "Tracking and responding to ATO correspondence across multiple clients creates audit risk and stress." },
    ],
    topServices: [
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates document collection, Xero/MYOB reconciliation, and client communication workflows" },
      { name: "CRM Integrations", slug: "ai-integrations", benefit: "Connects your practice management with Xero, MYOB, ATO portals, and client communication tools" },
      { name: "AI Chatbot", slug: "ai-chatbot-australia", benefit: "Handles client queries, collects documents, and answers common tax questions 24/7" },
      { name: "Invoice Automation", slug: "workflow-automation", benefit: "Automates billing, WIP reporting, and fee collection for your practice" },
    ],
    stats: [
      { value: "$2–$3", label: "Cost per invoice with AI vs $15–$20 manually", source: "AI Pivot deployments" },
      { value: "90%+", label: "Error reduction in automated reconciliation processes", source: "AI Pivot deployments" },
      { value: "Xero + MYOB", label: "Native integration with Australia's leading accounting platforms", source: "AI Pivot Toolbox" },
    ],
    caseStudy: {
      result: "Accounting firm eliminated 20 hours of monthly reconciliation work",
      detail: "A mid-sized accounting firm with 6 accountants was spending 20+ hours per month on manual bank reconciliation, receipt matching, and Xero data entry across their client base. AI Pivot Toolbox automated the reconciliation workflow using AI document processing to extract transaction data, match receipts, and flag exceptions for review. The team now reviews rather than enters — saving 20 hours monthly and eliminating reconciliation errors.",
      metrics: ["20 hours of monthly reconciliation eliminated", "Error rate in reconciliation dropped to near zero", "Client document collection automated with reminder sequences", "BAS preparation time reduced by 40%"],
    },
    faqs: [
      { q: "Can AI automation integrate with Xero and MYOB?", a: "Yes. AI Pivot Toolbox has deep integration experience with Xero and MYOB — including bank reconciliation automation, invoice processing, report generation, and client portal connections. We also integrate with Xero Practice Manager and MYOB AccountRight for practice management workflows." },
      { q: "Is automated accounting compliant with ATO requirements?", a: "All our accounting automations maintain full audit trails and human review checkpoints before any data is submitted to the ATO. Automated processes handle data collection and preparation; a licensed accountant reviews and approves before lodgement. This meets ATO requirements for registered tax agents." },
      { q: "Can AI help with BAS preparation?", a: "AI can significantly streamline BAS preparation by automating transaction categorisation, GST calculation, and data aggregation from Xero or MYOB. The AI prepares a draft BAS with all figures populated and flags unusual transactions for review — reducing prep time by 60–80% while maintaining the accountant's review and lodgement responsibility." },
    ],
    metaTitle: "AI for Accounting Firms Australia | Xero & MYOB | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian accounting firms. Automate Xero/MYOB reconciliation, document collection, and client communication. Save 20+ hours monthly. Free strategy call.",
  },
  {
    slug: "ai-for-hospitality",
    industry: "Hospitality",
    headline: "AI Automation for Hospitality Businesses in Australia",
    tagline: "Handle reservations, reviews, and guest questions — automatically.",
    painHook: "Saturday night service. The kitchen is at capacity, every table is full, the floor team is sprinting — and the phone rings. Again. A staff member breaks away to answer a reservation enquiry, loses their flow, and the table they were serving notices. Meanwhile your Google rating sits at 4.1 stars because three negative reviews from last month still haven't been responded to. No-shows cost you $800 in prep and lost covers last weekend alone. None of this is your team's fault. It's what happens when a hospitality business tries to run on manual processes in a 24/7 world.",
    intro: "Australian hospitality businesses face staffing pressures, rising costs, and guests who expect instant responses at any hour. AI Pivot Toolbox builds AI automation for restaurants, hotels, cafés, and accommodation providers that handles reservations, answers guest questions, responds to reviews, and manages loyalty communications — freeing your team to focus on the guest experience.",
    painPoints: [
      { title: "Phone calls during service", desc: "Staff answering reservation calls during peak service hurts the customer experience for guests already in-venue." },
      { title: "Slow responses to online enquiries", desc: "Guests who don't get a quick response to booking enquiries move on to the next option." },
      { title: "Managing online reviews manually", desc: "Responding to Google and TripAdvisor reviews across multiple locations takes hours per week." },
      { title: "No-shows and last-minute cancellations", desc: "No-shows cost hospitality businesses thousands per month in wasted prep and lost revenue." },
      { title: "Staff scheduling and communication", desc: "Coordinating rosters, shift changes, and staff communications is a constant management burden." },
    ],
    topServices: [
      { name: "AI Voice Agent", slug: "ai-voice-agents", benefit: "Takes reservations, answers menu/hours questions, and handles special requests 24/7 — no interruption to service" },
      { name: "Reputation Management AI", slug: "ai-seo-australia", benefit: "Responds to Google and TripAdvisor reviews within hours — with custom, on-brand responses" },
      { name: "AI Chatbot", slug: "ai-chatbot-australia", benefit: "Handles online booking enquiries, dietary requests, and event enquiries via your website" },
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates no-show reminders, post-visit review requests, and loyalty communications" },
    ],
    stats: [
      { value: "0.4★", label: "Average Google rating increase in 90 days with AI review management", source: "AI Pivot deployments" },
      { value: "30%", label: "Reduction in no-shows with automated reminder sequences", source: "AI Pivot deployments" },
      { value: "100%", label: "Of reviews responded to within 2 hours", source: "AI Pivot deployments" },
    ],
    caseStudy: {
      result: "Melbourne hospitality group responding to 100% of Google reviews within 2 hours",
      detail: "A Melbourne hospitality group with 4 venues was manually responding to 80+ weekly reviews across Google, TripAdvisor, and Yelp — taking 6+ hours per week and often leaving reviews unanswered for days. AI Pivot Toolbox deployed automated review management that monitors all platforms, generates context-aware responses matching the brand voice, and posts within 2 hours. Google ratings improved 0.4 stars across all venues within 90 days.",
      metrics: ["100% of reviews responded to within 2 hours", "0.4-star average rating improvement across 4 venues", "6 hours per week of manual review management eliminated", "35% increase in 5-star review volume from automated post-visit requests"],
    },
    faqs: [
      { q: "Can an AI voice agent take restaurant reservations?", a: "Yes. The AI voice agent handles inbound reservation calls, checks availability via your booking system (ResDiary, SevenRooms, OpenTable, or similar), takes party size, date, time, and special requirements, and confirms the booking — all without staff involvement. It can also manage the waiting list and send confirmation messages." },
      { q: "How does AI review management work?", a: "Our reputation management system monitors your Google, TripAdvisor, and Facebook reviews in real time. When a new review is posted, AI generates a context-aware response that matches your brand voice — acknowledging specific points from the review, thanking positive reviewers, and professionally addressing criticism. Responses are either auto-posted or sent for approval before posting, depending on your preference." },
      { q: "Can AI help with staff scheduling?", a: "AI can automate the communication side of scheduling — shift notifications, availability collection, and roster change requests via SMS or a staff app. For full scheduling optimisation (demand forecasting, labour cost minimisation), we integrate with dedicated workforce management tools like Deputy or Tanda." },
    ],
    metaTitle: "AI Automation for Hospitality Australia | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian restaurants, hotels, and hospitality businesses. Handle reservations 24/7, manage reviews automatically, reduce no-shows. Free strategy call.",
  },
  {
    slug: "ai-for-construction",
    industry: "Construction",
    headline: "AI Automation for Construction Businesses in Australia",
    tagline: "Less paperwork. Faster quotes. Better project visibility.",
    painHook: "You lost that commercial fitout contract last month — not because your price was wrong, but because the quote took three days and the client went with someone faster. Right now your estimator is manually pulling specs out of email attachments, populating a quote template line by line. Your accounts team is matching supplier invoices to purchase orders by hand. Your site supervisors are printing and filing SWMS on Monday morning instead of running their teams. Construction businesses don't die from bad jobs — they die from paper cuts. Thousands of small, manual tasks that compound every single week.",
    intro: "Australian construction businesses are drowning in paperwork — quotes, contracts, compliance documents, supplier invoices, and project reports. AI Pivot Toolbox builds automation for builders, contractors, and construction companies that speeds up quoting, automates document processing, and connects your systems — reducing admin by 40+ hours per month.",
    painPoints: [
      { title: "Slow quoting and estimating", desc: "Manual quote preparation takes days and creates bottlenecks that cost contracts to faster competitors." },
      { title: "Supplier invoice processing", desc: "Processing supplier invoices, matching to purchase orders, and coding for accounting is a major admin burden." },
      { title: "Compliance documentation", desc: "SWMS, JSAs, site inductions, and compliance certificates require constant manual management across projects." },
      { title: "Subcontractor coordination", desc: "Managing subcontractor schedules, payments, and communication across multiple sites is time-intensive." },
      { title: "Progress reporting", desc: "Manual project progress reports for clients and internal management take hours to compile each week." },
    ],
    topServices: [
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates quote preparation, invoice processing, compliance document management, and reporting" },
      { name: "CRM Integrations", slug: "ai-integrations", benefit: "Connects your estimating, project management, and accounting systems to eliminate double-handling" },
      { name: "AI Voice Agent", slug: "ai-voice-agents", benefit: "Handles inbound enquiries and lead qualification while your team is on site" },
      { name: "Invoice Automation", slug: "workflow-automation", benefit: "Automates supplier invoice matching, coding, and Xero/MYOB reconciliation" },
    ],
    stats: [
      { value: "3 days → 4hrs", label: "Quote turnaround improvement with AI workflow", source: "AI Pivot deployments" },
      { value: "15hrs", label: "Admin saved per week with supplier invoice automation", source: "AI Pivot deployments" },
      { value: "85%", label: "Cost reduction in invoice processing with AI", source: "AI Pivot deployments" },
    ],
    caseStudy: {
      result: "WA construction business cut quote turnaround from 3 days to 4 hours",
      detail: "A Perth-based commercial construction company was taking 3 days to produce quotes because estimators manually extracted spec information from email attachments and populated quote templates. AI Pivot Toolbox built an automation that uses AI to extract job specifications from email attachments, pre-populates the quote template with the relevant line items and supplier rates, and alerts the estimator for review and sign-off. Quote turnaround is now 4 hours.",
      metrics: ["Quote turnaround reduced from 3 days to 4 hours", "15 hours per week saved on supplier invoice processing", "Zero missed compliance document deadlines", "Real-time project cost visibility via automated reporting"],
    },
    faqs: [
      { q: "Can AI automate construction quoting and estimating?", a: "AI can automate the data extraction and template population phase of quoting — reading project specifications from PDFs and emails, pulling relevant line items, and populating your estimating software. The final review, pricing decisions, and sign-off remain with your estimator. This typically cuts quote preparation time by 60–80% while keeping the human expert in control of pricing." },
      { q: "What construction software can you integrate with?", a: "We integrate with Buildxact, Procore, Aconex, Jobpac, Timberline, Xero, MYOB, and most major Australian construction and accounting platforms. We also build integrations with supplier portals and procurement systems." },
      { q: "Can AI help with compliance documentation on construction sites?", a: "AI can automate the routing, tracking, and reminder processes for compliance documents — ensuring SWMS are reviewed before work starts, inductions are completed, and certifications are current. Document management integrates with your existing systems and sends automated alerts when compliance items are due for renewal." },
    ],
    metaTitle: "AI for Construction Australia | Quote Automation | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian builders and construction companies. Faster quotes, automated invoicing, compliance document management. Save 40+ hours monthly. Free strategy call.",
  },
  {
    slug: "ai-for-finance",
    industry: "Finance & Mortgage Broking",
    headline: "AI Automation for Finance and Mortgage Brokers in Australia",
    tagline: "Pre-qualify more leads. Process more applications. Win more clients.",
    painHook: "A prospective borrower submits an enquiry on your website at 7:43pm. You see it the next morning and call them back at 9:15am. In those 13 hours, two other brokers have already spoken to them. One has already sent a product comparison. Finance leads are perishable — response time is everything, and manual processes guarantee you'll always be late. Then there's the document chase. Payslips. Bank statements. Tax returns. Three follow-up emails to get one complete package. And at the end of the week, you've spent 15 hours qualifying and chasing — and settled maybe two loans. The ceiling on your business isn't your expertise. It's your capacity to handle leads manually.",
    intro: "Australian finance brokers and financial planners are competing for clients who expect instant responses and seamless processes. AI Pivot Toolbox deploys AI voice agents, chatbots, and workflow automation that pre-qualify loan enquiries, automate document collection, and keep clients informed throughout the process — letting brokers focus on the advice and relationships that win business.",
    painPoints: [
      { title: "Unqualified leads consuming broker time", desc: "Hours spent on enquiries that don't convert because initial qualification isn't happening fast enough." },
      { title: "Document collection from clients", desc: "Chasing payslips, bank statements, and tax returns is slow, manual, and frustrating for everyone." },
      { title: "After-hours enquiries lost to competitors", desc: "Finance leads who don't get an immediate response often submit to a competitor within hours." },
      { title: "Client update calls and emails", desc: "Keeping clients informed during application processing is time-consuming but critical for retention." },
      { title: "Compliance and audit trail", desc: "Maintaining compliant records and audit trails across all client interactions adds significant admin burden." },
    ],
    topServices: [
      { name: "AI Voice Agent", slug: "ai-voice-agents", benefit: "Pre-qualifies loan enquiries 24/7 — captures income, employment, loan purpose, and urgency before booking a discovery call" },
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates document collection, credit check preparation, and client status updates throughout the application" },
      { name: "AI Chatbot", slug: "ai-chatbot-australia", benefit: "Handles website enquiries, answers common loan questions, and qualifies prospects before broker engagement" },
      { name: "CRM Integrations", slug: "ai-integrations", benefit: "Connects your broker CRM with lender portals, document systems, and communication tools" },
    ],
    stats: [
      { value: "200+", label: "Loan enquiries pre-qualified monthly by AI for one broker client", source: "AI Pivot deployments" },
      { value: "90 sec", label: "Average response time to new finance enquiries", source: "AI Pivot deployments" },
      { value: "40%", label: "Reduction in time spent on unqualified leads", source: "AI Pivot deployments" },
    ],
    caseStudy: {
      result: "Sydney finance broker pre-qualifying 200+ loan enquiries monthly on autopilot",
      detail: "A Sydney mortgage broker was spending 3–4 hours per day on initial phone calls to qualify loan enquiries — many of which didn't convert. AI Pivot Toolbox deployed an AI voice agent that answers inbound calls, captures employment status, income, loan amount, and purpose, and books a discovery call with the broker only when the lead meets qualification criteria. Unqualified enquiries are redirected with educational resources. The broker now spends 3–4 hours per week on initial qualification instead of 3–4 hours per day.",
      metrics: ["200+ enquiries pre-qualified monthly without broker time", "Discovery call conversion rate increased 35%", "Response to new enquiries: under 90 seconds", "Broker time saved: 15+ hours per week on qualification"],
    },
    faqs: [
      { q: "Is AI suitable for AFSL-regulated financial services businesses?", a: "Yes, with the right implementation boundaries. AI Pivot Toolbox automates administrative and communication processes — not financial advice. The AI pre-qualifies leads, collects documents, and keeps clients informed; licensed advisors retain all advice and recommendation responsibilities. All implementations are designed with ASIC guidance on digital advice and AI in financial services in mind." },
      { q: "Which broker CRMs do you integrate with?", a: "We integrate with Salestrekker, MyCRM, Mercury, Connective Essentials, Broker Engine, and most major Australian mortgage broking CRMs. We also integrate with ApplyOnline, Lender portals, and document management systems." },
      { q: "Can AI help with the document collection required for loan applications?", a: "Yes. We build automated document collection workflows that send clients a branded request with a secure upload portal, send reminders for outstanding documents, check document completeness and legibility, and route completed packages to the broker and relevant lender portal. This typically reduces document collection time by 70%." },
    ],
    metaTitle: "AI for Finance & Mortgage Brokers Australia | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian finance brokers and financial planners. Pre-qualify 200+ leads monthly, automate document collection, respond in 90 seconds. Free strategy call.",
  },
  {
    slug: "ai-for-retail",
    industry: "Retail & eCommerce",
    headline: "AI Automation for Retail & eCommerce Businesses in Australia",
    tagline: "More sales, fewer support tickets, less manual work.",
    painHook: "68% of your online shoppers will abandon their cart tonight. Most of them will never hear from you again. At the same time, your support inbox is filling up with \"where's my order\" emails that take 3 minutes each to answer manually — the same question, three hundred times a week. Your customer service team is spending their entire day answering things a chatbot could resolve in 10 seconds. Meanwhile, a competitor with half your product range is outselling you because they respond instantly, follow up automatically, and never leave a review unanswered. The gap between you and them isn't inventory. It's automation.",
    intro: "Australian retail and eCommerce businesses are competing against Amazon and global players on customer experience and speed. AI Pivot Toolbox builds AI chatbots, workflow automations, and integrations that give Australian retailers enterprise-grade customer service and operational efficiency — at a price that makes sense for SMBs. Handle 1,000+ customer queries monthly without a proportional increase in support staff.",
    painPoints: [
      { title: "High volume of repetitive customer queries", desc: "Order status, returns, product questions — the same questions answered hundreds of times per week by human staff." },
      { title: "Cart abandonment", desc: "60–70% of online shoppers abandon their cart. Most businesses have no automated recovery process." },
      { title: "Inventory and supplier integration", desc: "Manual inventory management and supplier communications create stock errors and delayed restocking." },
      { title: "After-hours customer service", desc: "Customers shop at night and on weekends. Without 24/7 support, queries pile up and satisfaction drops." },
      { title: "Review and reputation management", desc: "Responding to product reviews on Google, Facebook, and marketplaces takes hours of manual work." },
    ],
    topServices: [
      { name: "AI Chatbot", slug: "ai-chatbot-australia", benefit: "Handles order tracking, returns, product questions, and recommendations 24/7 — integrated with Shopify or WooCommerce" },
      { name: "Workflow Automation", slug: "workflow-automation", benefit: "Automates cart abandonment sequences, post-purchase follow-ups, and inventory alerts" },
      { name: "CRM Integrations", slug: "ai-integrations", benefit: "Connects your eCommerce platform with your CRM, email marketing, accounting, and fulfilment systems" },
      { name: "Reputation Management", slug: "ai-seo-australia", benefit: "Automated review requests and AI-generated responses across Google, Facebook, and marketplaces" },
    ],
    stats: [
      { value: "40%", label: "Reduction in customer service workload with AI chatbot", source: "AI Pivot deployments" },
      { value: "24/7", label: "Customer support coverage without proportional staff increase", source: "AI Pivot Toolbox" },
      { value: "15%", label: "Average increase in cart recovery rate with automated sequences", source: "AI Pivot deployments" },
    ],
    caseStudy: {
      result: "Melbourne eCommerce retailer cut customer service workload by 40%",
      detail: "A Melbourne homewares eCommerce business with 2,000+ monthly orders was drowning in customer service emails — 80% asking about order status, returns, and product questions. AI Pivot Toolbox built a Shopify-integrated AI chatbot that handles these queries automatically, a post-purchase automation for proactive shipping updates, and an abandoned cart recovery sequence. Customer service volume dropped 40%, cart recovery improved 12%, and one staff member was redeployed from support to buying.",
      metrics: ["40% reduction in customer service email volume", "12% improvement in cart recovery rate", "Order status queries: 100% automated", "Staff redeployed from support to higher-value work"],
    },
    faqs: [
      { q: "Can the AI chatbot integrate with Shopify?", a: "Yes. We have native Shopify integration — the chatbot can look up real-time order status, check inventory, process return requests, make product recommendations based on browsing history, and capture leads. WooCommerce, Magento, and BigCommerce integrations are also available." },
      { q: "How does cart abandonment automation work?", a: "When a shopper adds items to their cart and leaves without purchasing, the automation triggers a sequence — typically a reminder email at 1 hour, a second email at 24 hours with social proof, and optionally an SMS at 48 hours. Each message is personalised to the specific cart contents. Average cart recovery improvement is 10–18% for Australian retailers." },
      { q: "Can AI help manage a large product catalogue?", a: "AI can automate several catalogue management tasks — generating product descriptions from specifications, identifying pricing errors or outliers, syncing inventory across platforms, and flagging out-of-stock products for reorder. For businesses with large SKU counts, this alone saves dozens of hours per week." },
    ],
    metaTitle: "AI Automation for Retail & eCommerce Australia | AI Pivot Toolbox",
    metaDescription: "AI automation for Australian retailers and eCommerce businesses. Handle 1,000+ customer queries monthly, automate cart recovery, and reduce support workload by 40%. Free strategy call.",
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industriesData.find(i => i.slug === slug);
}
