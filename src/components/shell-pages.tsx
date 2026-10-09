import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ClipboardList, CreditCard, FileCheck2, FileText, LockKeyhole, ShieldCheck, ShoppingCart, Truck, UserRound } from "lucide-react";

import { EmptyState, PageHeader } from "@/components/site-sections";
import { MarginScribble, PaperPlaneMark } from "@/components/editorial-marks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommerceShell({ kind }: { kind: "cart" | "checkout" | "confirmation" | "account" }) {
  const content = {
    cart: {
      eyebrow: "Cart",
      title: "Your things",
      copy: "Go find something useful.",
      icon: ShoppingCart,
      state: "Nothing here yet.",
      action: <Button asChild><Link to="/resources">EXPLORE RESOURCES</Link></Button>,
    },
    checkout: {
      eyebrow: "Checkout",
      title: "Almost there.",
      copy: "Check your details, make your payment and I’ll take it from there.",
      icon: CreditCard,
      state: "Payment opens here soon.",
       action: <div><Button disabled aria-describedby="payment-status">COMPLETE PAYMENT</Button><p id="payment-status" className="mt-3 text-xs text-muted-foreground">Payment opens here soon.</p></div>,
    },
    confirmation: {
      eyebrow: "Order confirmation",
      title: "Done.",
      copy: "Your payment went through. Check your email for the next step or access details.",
      icon: CheckCircle2,
      state: "Payment success",
      action: <Button asChild variant="outline"><Link to="/resources">EXPLORE RESOURCES</Link></Button>,
    },
    account: {
      eyebrow: "Account",
      title: "Customer account and resource access will be connected later.",
      copy: "Authentication, order history and purchaser-only resources are intentionally deferred.",
      icon: UserRound,
      state: "Sign-in is not enabled yet.",
      action: undefined,
    },
  }[kind];
  const Icon = content.icon;

  return (
    <>
      <PageHeader eyebrow={content.eyebrow} title={content.title}><p>{content.copy}</p></PageHeader>
      <section className="bg-background">
        <div className="container-page grid gap-8 py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <EmptyState icon={Icon} title={content.state} action={content.action}>{content.copy}</EmptyState>
          <div className="border-l-2 border-primary bg-secondary p-6">
            <h2 className="font-display text-3xl">Future commerce structure</h2>
            <div className="mt-6 grid gap-3 text-sm">
              {[
                "Product summary",
                "Customer information",
                "Delivery details",
                "Payment verification",
                "Fulfilment status",
                "Resource access",
               ].map((item) => <div key={item} className="border-b border-border bg-background px-4 py-3 font-semibold">{item}</div>)}
            </div>
            <Button asChild variant="charcoal" className="mt-6"><Link to="/dear-bank-alert">Return to Dear Bank Alert</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

const partnershipFields = ["Your name", "Organisation", "Email", "What are you building?", "What would you like me to do?", "Who is it for?", "When is it happening?", "Budget / commercial context", "Anything else I should know?"];

export function PartnersShell({ register = false }: { register?: boolean }) {
  return (
    <>
      <PageHeader eyebrow="Partnerships" title={<>Have an idea?<br />Let’s see if it makes sense.</>}>
        <div className="space-y-4">
          <p>I am interested in thoughtful work with people and organisations building things that genuinely matter.</p>
          <p>That can include speaking, teaching, youth development, education, community experiences, campaigns, strategic collaborations and projects where my work around agency, growth, earning, leadership or execution is useful.</p>
          <p>Please give me enough context to understand what you are actually proposing.</p>
          <p className="font-display text-2xl text-foreground">“Hi, collab?” is fighting for its life.</p>
        </div>
      </PageHeader>
       <section className="relative overflow-hidden bg-paper"><div className="container-page py-16 md:py-20">
        <form className="mx-auto max-w-4xl border bg-background p-6 md:p-9" aria-label="Partnership form preview">
          <h2 className="font-display text-4xl">Tell me about it.</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {partnershipFields.map((label, index) => (
              <label key={label} className={`grid gap-2 text-sm font-bold ${index >= 3 ? "md:col-span-2" : ""}`}>
                {label}
                 {index >= 3 ? <textarea disabled aria-describedby="partner-status" className="min-h-24 rounded-lg border bg-secondary p-4" /> : <input type={label === "Email" ? "email" : "text"} disabled aria-describedby="partner-status" className="h-12 rounded-lg border bg-secondary px-4" />}
              </label>
            ))}
          </div>
           <Button type="button" disabled aria-describedby="partner-status" className="mt-7">SEND THE DETAILS <ArrowRight aria-hidden="true" /></Button>
           <p id="partner-status" className="mt-3 text-xs text-muted-foreground">Partnership enquiries open here soon.</p>
        </form>
         <PaperPlaneMark className="doodle-faint absolute bottom-5 right-6 hidden w-24 lg:block" />
      </div>
      </section>
    </>
  );
}

export function OutcomesShell({ submit = false }: { submit?: boolean }) {
  return (
    <>
      <PageHeader eyebrow="Reader stories" title={<>I like ideas.<br />I like evidence more.</>}>
        <div className="space-y-4">
          <p>The point of my work is not for you to leave saying, “That was nice.”</p>
          <p>I want something to move.</p>
          <div className="font-display text-2xl leading-relaxed text-foreground"><p>A decision.</p><p>A habit.</p><p>A business.</p><p>A relationship.</p><p>An income stream.</p><p>A piece of work.</p><p>A way of thinking.</p></div>
          <p>This is where I keep some of the stories people have allowed me to share.</p>
        </div>
      </PageHeader>
       <section className="relative overflow-hidden bg-background">
        <div className="container-page grid gap-8 py-16 lg:grid-cols-[1fr_1fr]">
          <EmptyState icon={FileCheck2} title="No approved stories published yet.">I will only share reader stories after permission and review.</EmptyState>
          <form className="border bg-card p-6 md:p-8" aria-label="Reader story form preview">
            <h2 className="font-display text-4xl">Did something move?</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground"><p>If something I wrote, taught, coached or built helped you make a meaningful change, I would love to hear what happened.</p><p>Tell me what you used, what changed and what the result looked like.</p><p>I will never publish your story publicly without permission.</p></div>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold">Your real name<input disabled aria-describedby="story-status" className="h-12 rounded-lg border bg-secondary px-4" /></label>
                <label className="grid gap-2 text-sm font-bold">Your email or phone number<input disabled aria-describedby="story-status" className="h-12 rounded-lg border bg-secondary px-4" /></label>
              </div>
              {["What did you use?", "What changed?", "What did the result look like?"].map((label) => (
                 <label key={label} className="grid gap-2 text-sm font-bold">{label}<textarea disabled aria-describedby="story-status" className="min-h-24 rounded-lg border bg-secondary p-4" placeholder="Connection coming later" /></label>
              ))}
               <fieldset className="border-y border-border py-4">
                 <legend className="text-sm font-bold">If approved, how may this be published?</legend>
                 <div className="mt-3 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                   <label className="flex items-center gap-3"><input type="radio" name="story-name" disabled /> With my name</label>
                   <label className="flex items-center gap-3"><input type="radio" name="story-name" disabled /> Anonymously</label>
                 </div>
                 <p className="mt-3 text-xs leading-6 text-muted-foreground">Your real details will remain private and are collected for verification and permission.</p>
               </fieldset>
               <Button type="button" disabled aria-describedby="story-status">SHARE YOUR STORY</Button>
               <p id="story-status" className="text-xs text-muted-foreground">Story sharing opens here soon.</p>
            </div>
         <MarginScribble className="doodle-faint absolute bottom-5 right-6 hidden w-28 lg:block" />
          </form>
        </div>
      </section>
    </>
  );
}

export function LegalShell({ title, description, items }: { title: string; description: string; items: string[] }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title}><p>{description}</p></PageHeader>
      <section className="bg-background">
        <div className="container-page py-16">
          <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-8">
            <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" /><h2 className="font-display text-3xl">Draft placeholder</h2></div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Final legal language must be supplied or reviewed before launch. The sections below show the intended structure only.</p>
            <div className="mt-8 grid gap-3">
              {items.map((item) => <div key={item} className="rounded-2xl bg-secondary p-4 text-sm font-semibold">{item}</div>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContentSubrouteShell({ title, description }: { title: string; description: string }) {
  return (
    <>
      <PageHeader eyebrow="Writing" title={title}><p>{description}</p></PageHeader>
      <section className="bg-background"><div className="container-page py-16"><EmptyState icon={FileText} title="No approved content published yet.">This route is ready for future CMS-driven publishing.</EmptyState></div></section>
    </>
  );
}

export function PlannedAdminNotice() {
  return (
    <div className={cn("rounded-3xl bg-secondary p-6")}>
      <LockKeyhole className="h-6 w-6 text-primary" aria-hidden="true" />
      <h2 className="mt-4 font-display text-3xl">Internal operations are reserved for a protected phase.</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">Admin access, team roles, sensitive data and order operations must be enforced server-side when the backend is implemented.</p>
    </div>
  );
}

export function FulfilmentPreview() {
  return (
    <div className="rounded-3xl bg-secondary p-6">
      <Truck className="h-6 w-6 text-primary" aria-hidden="true" />
      <h2 className="mt-4 font-display text-3xl">Fulfilment workflow placeholder</h2>
      <div className="mt-6 grid gap-3 text-sm">
        {[
          "Order received",
          "Payment confirmed",
          "Delivery details captured",
          "Awaiting dispatch",
          "Dispatched",
          "Delivered or exception recorded",
        ].map((item) => <div key={item} className="rounded-full bg-background px-4 py-3 font-semibold">{item}</div>)}
      </div>
    </div>
  );
}

export function ResourceAccessPreview() {
  return (
    <div className="rounded-3xl bg-teal/20 p-6">
      <ClipboardList className="h-6 w-6 text-primary" aria-hidden="true" />
      <h2 className="mt-4 font-display text-3xl">Resource access placeholder</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">Verified purchasers will later access implementation tools through account or order verification.</p>
    </div>
  );
}
