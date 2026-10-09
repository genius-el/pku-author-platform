import type { ElementType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CheckCircle2, Clock, FileText, Heart, LockKeyhole, Megaphone, Package, PenLine, Send, Sparkles, Users } from "lucide-react";

import { siteAssets } from "@/components/site-assets";
import { ThinkingCharacterScene } from "@/components/editorial-characters";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { contentCategories, dbaJourney, partnerTypes, resourceTypes, site } from "@/lib/site-data";

export function BadgeNote({ children, tone = "pink" }: { children: ReactNode; tone?: "pink" | "teal" | "butter" | "cream" }) {
  const tones = {
    pink: "bg-pink-soft text-primary",
    teal: "bg-teal/25 text-foreground",
    butter: "bg-accent text-accent-foreground",
    cream: "bg-secondary text-secondary-foreground",
  };
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-bold", tones[tone])}>{children}</span>;
}

export function SectionHeader({ eyebrow, title, children, align = "left" }: { eyebrow?: string; title: string; children?: ReactNode; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="mb-3 text-sm font-bold text-primary">{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight text-balance text-foreground md:text-5xl">{title}</h2>
      {children && <div className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{children}</div>}
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b bg-background">
      <div className="container-page section-space">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-bold text-primary">{eyebrow}</p>}
           <h1 className="font-display text-4xl leading-[1.08] text-balance text-foreground md:text-6xl">{title}</h1>
          {children && <div className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function BookCard({ compact = false }: { compact?: boolean }) {
  return (
    <article className="editorial-card grid overflow-hidden rounded-2xl md:grid-cols-[0.8fr_1.2fr]">
      <div className="grid place-items-center bg-pink-soft p-6">
        <img src={siteAssets.bookMockup} alt="Dear Bank Alert book mockup" loading="lazy" className="w-full max-w-72 rounded-lg object-contain shadow-lift" />
      </div>
      <div className="p-6 md:p-8">
        <BadgeNote tone="butter">Physical-first book</BadgeNote>
        <h3 className="mt-4 font-display text-3xl text-foreground">{site.bookTitle}</h3>
        <p className="mt-2 text-sm font-semibold text-primary">Working subtitle subject to final editorial approval</p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {compact
            ? "A practical student-focused book about creating independent income through value exchange."
            : "A practical business and economic-agency book for students learning how to notice problems, organize useful value, sell it, make independent income and keep the process producing."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="default">
            <Link to="/dear-bank-alert">View book page</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/books">Browse books</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function EmptyState({ icon: Icon = Clock, title, children, action }: { icon?: ElementType; title: string; children: ReactNode; action?: React.ReactNode }) {
  return (
    <div className="border-y border-dashed border-rule bg-paper px-5 py-10 text-center md:px-8">
      <div className="mx-auto grid h-12 w-12 place-items-center bg-background text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-2xl text-foreground">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{children}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function NewsletterPreview() {
  const substackUrl = "https://substack.com/@kutipriscillatemiloluwa?utm_source=share&utm_medium=android&r=2wm14y";
  return (
    <section className="bg-charcoal text-primary-foreground">
      <div className="container-page grid gap-8 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <SectionHeader eyebrow="Good Mornings With Kuku" title="Letters for people who like to think before the world gets noisy.">
          <span className="text-primary-foreground/75">
            Good Mornings With Kuku is currently published and delivered through Substack. The PKU website is the discovery layer for the writing.
          </span>
        </SectionHeader>
        <div className="border border-primary-foreground/15 bg-primary-foreground/8 p-5">
          <p className="text-sm leading-7 text-primary-foreground/75">Open the current newsletter home to read and subscribe.</p>
          <Button asChild variant="butter" className="mt-4">
            <a href={substackUrl} target="_blank" rel="noreferrer">
              SEND ME THE LETTERS
              <Send aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AuthorIntro({ compact = false }: { compact?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
          <div className="max-w-4xl border-l-4 border-primary pl-6 md:pl-10">
            <SectionHeader eyebrow="A little about me" title="Hi. I’m Kuku." />
            <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
              <p>I have spent a lot of my life thinking about a question that refuses to leave me alone:</p>
              <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">Why do some people take what they have been given and build remarkable lives with it, while other people spend years circling the same possibilities?</p>
              <p>My work lives inside that question.</p>
              <p>I care about agency, purpose, work, money, faith, leadership, relationships, execution and the very practical business of building a life that does not happen to you by accident.</p>
              {!compact && (
                <>
                  <p className="font-display text-xl text-foreground md:text-2xl">I teach. I coach. I write. I build things.</p>
                  <p>And if you are here because you know there is more to do with your life than simply react to whatever comes next, you are in the right place.</p>
                </>
              )}
            </div>
            <Button asChild variant="charcoal" className="mt-8">
              <Link to="/about">
                MORE ABOUT ME
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ThinkingCharacterScene className="mx-auto w-32 sm:w-40 lg:w-full" />
        </div>
      </div>
    </section>
  );
}

export function ResourceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resourceTypes.map((item, index) => (
        <article key={item} className={cn("rounded-2xl border p-5", index % 3 === 0 ? "bg-pink-soft" : index % 3 === 1 ? "bg-teal/20" : "bg-accent/45")}>
          <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="mt-4 font-display text-xl text-foreground">{item}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Placeholder resource card. Final file, access rules and download behaviour will be added later.</p>
        </article>
      ))}
    </div>
  );
}

export function WritingPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("grid gap-4", compact ? "sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-5")}>
      {contentCategories.map((item) => (
        <article key={item} className={cn("rounded-2xl border bg-card shadow-soft", compact ? "p-4" : "p-5")}>
          <PenLine className="h-4 w-4 text-primary" aria-hidden="true" />
          <h3 className={cn("mt-3 font-display text-foreground", compact ? "text-lg leading-snug" : "text-xl")}>{item}</h3>
          {compact ? (
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Coming soon.</p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Coming soon.</p>
          )}
        </article>
      ))}
    </div>
  );
}

export function PurchasePlaceholder() {
  return (
    <div className="rounded-3xl bg-secondary p-6 md:p-8">
      <BadgeNote tone="pink">Commerce placeholder</BadgeNote>
      <h3 className="mt-4 font-display text-3xl text-foreground">Preorders open in October.</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Dear Bank Alert launches on October 29, with public sales beginning October 30.
      </p>
      <div className="mt-6 grid gap-3 text-sm">
        {[
          "Price: TBD",
          "Formats: physical book and ebook intended from launch",
          "Delivery: Nigeria-wide only; charged separately; no pickup",
          "Public sales begin: October 30, 2026",
        ].map((item) => <div key={item} className="rounded-full bg-background px-4 py-3 font-semibold text-foreground">{item}</div>)}
      </div>
      <Button variant="default" disabled className="mt-6">JOIN THE PREORDER LIST</Button>
    </div>
  );
}

export function DbaFaq() {
  const faqs = [
    ["What is Dear Bank Alert about?", "Approved answer placeholder: this section will describe the book using final editorial language before launch."],
    ["Who is the book for?", "It is intentionally written for university and polytechnic students, especially those learning to create independent income."],
    ["Is the book physical or digital?", "Both a physical book and an ebook are intended from launch."],
    ["How will delivery work?", "Physical-book delivery will be available across Nigeria, charged separately, with no pickup option. Fulfilment timing will be shared once production details are confirmed."],
    ["Are resources included?", "The book will include a downloadable digital implementation toolkit: practical worksheets, templates and exercises that help readers implement the book."],
    ["Can organisations or campus partners order in bulk?", "Get in touch through the contact page and tell me what you have in mind."],
  ];
  return (
    <Accordion type="single" collapsible className="rounded-2xl border bg-card px-4">
      {faqs.map(([question, answer], index) => (
        <AccordionItem key={question} value={`item-${index}`}>
          <AccordionTrigger className="font-sans text-base font-bold hover:no-underline">{question}</AccordionTrigger>
          <AccordionContent className="text-sm leading-7 text-muted-foreground">{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function PartnerTypeGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {partnerTypes.map((type) => (
        <div key={type} className="rounded-2xl bg-secondary p-5">
          <Users className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="mt-4 font-display text-xl">{type}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Application and referral workflow will be connected later.</p>
        </div>
      ))}
    </div>
  );
}

export function OutcomePlaceholder() {
  return (
    <EmptyState icon={Heart} title="Reader stories will appear after consent and review.">
      The original DBA has participant evidence to curate, but nothing is published here until permissions, verification and approved story copy are ready.
    </EmptyState>
  );
}

export function ProductEcosystem() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <div className="rounded-3xl bg-pink-soft p-6">
        <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl">Dear Bank Alert</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">The first major product in the PKU author ecosystem.</p>
      </div>
      <div className="rounded-3xl bg-secondary p-6">
        <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl">Future books</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">Reserved for future publications once confirmed.</p>
      </div>
      <div className="rounded-3xl bg-teal/20 p-6">
        <Package className="h-6 w-6 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl">Programmes and resources</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">Prepared for future offers without presenting them as available now.</p>
      </div>
    </div>
  );
}

export function ProcessList({ items = dbaJourney }: { items?: readonly string[] }) {
  return (
    <ol className="grid gap-3">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl bg-background p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span>
          <span className="min-w-0 pt-1 text-sm font-semibold leading-6 text-foreground">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export const shellIcons = { CheckCircle2, LockKeyhole, Megaphone };
