import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BellRing, Check, Sparkles } from "lucide-react";

import { siteAssets } from "@/components/site-assets";
import { BadgeNote } from "@/components/site-sections";
import { Button } from "@/components/ui/button";
import { AlertJourneyIllustration, BankAlertMark } from "@/components/editorial-marks";
import { BankAlertStoryScene } from "@/components/editorial-characters";
import { routeHead } from "@/lib/page-meta";

export const Route = createFileRoute("/dear-bank-alert")({
  head: () => routeHead(
    "Dear Bank Alert | Build Your First Source of Income as a Student",
    "Dear Bank Alert is Priscilla Kuti-Ukaegbu’s practical guide for students who want to build a real, repeatable source of income before graduation.",
    "/dear-bank-alert",
  ),
  component: DearBankAlertPage,
});

const learningPoints = [
  "identify something useful you can sell;",
  "choose an income path that makes sense for your current reality;",
  "package what you know, can do, can learn or can access;",
  "position yourself so people understand why they should trust you;",
  "find and approach potential customers;",
  "sell without begging, spamming or pretending;",
  "learn from your first sales;",
  "turn one alert into a repeatable income skill.",
];

const audiencePoints = [
  "you are in university, polytechnic or another tertiary institution;",
  "you are still financially dependent and want more agency;",
  "you have skills but no idea how to turn them into money;",
  "you keep hearing “start a business” but nobody has explained what to do on Monday morning;",
  "you have made money before, but you cannot reliably make it again;",
  "you want practical earning skills before graduation.",
];

function PreorderButton({ variant = "default", statusId }: { variant?: "default" | "butter"; statusId: string }) {
  return (
    <div>
      <Button size="lg" variant={variant} disabled aria-describedby={statusId} className="mt-8">
        JOIN THE PREORDER LIST
        <ArrowRight aria-hidden="true" />
      </Button>
      <p id={statusId} className={variant === "butter" ? "mt-3 text-xs text-primary-foreground/70" : "mt-3 text-xs text-muted-foreground"}>Preorders open in October. I will share the date soon.</p>
    </div>
  );
}

function DearBankAlertPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <BadgeNote tone="butter">Launch event · October 29, 2026</BadgeNote>
             <h1 className="mt-5 font-display text-5xl leading-tight text-foreground md:text-6xl lg:text-7xl">Dear Bank Alert</h1>
            <p className="mt-5 max-w-3xl font-display text-3xl leading-tight text-primary md:text-4xl">Your first real source of income does not have to wait until graduation.</p>
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
              <p>I wrote this for the university or polytechnic student who is tired of being told to “focus on school first” as though learning how to create value and earn money is an elective for adulthood.</p>
              <p>Dear Bank Alert is a practical guide to building your first source of income while you are still a student.</p>
            </div>
            <PreorderButton statusId="preorder-hero-status" />
          </div>
           <figure className="relative mx-auto w-full max-w-xl bg-pink-soft p-7 md:p-10">
             <img src={siteAssets.bookMockup} alt="Temporary Dear Bank Alert book mockup" className="mx-auto w-full max-w-md object-contain" />
            <figcaption className="mt-4 text-center text-xs text-muted-foreground">Temporary book mockup</figcaption>
             <BankAlertMark className="doodle-faint absolute right-4 top-4 w-20" />
          </figure>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page grid gap-px bg-border py-0 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Launch event", "October 29, 2026"],
            ["Public sales", "October 30, 2026"],
            ["Formats", "Physical book and ebook"],
            ["Price", "To be announced"],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper p-6 md:p-8">
              <p className="text-xs font-bold uppercase text-primary">{label}</p>
              <p className="mt-3 font-display text-xl leading-snug text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <BellRing className="h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">You do not need another “make money online” thread.</h2>
          </div>
          <div className="space-y-4 text-base leading-8 text-primary-foreground/75 md:text-lg">
            <p>You need to understand how earning actually works.</p>
            <div className="space-y-2 font-display text-2xl leading-snug text-primary-foreground md:text-3xl">
              <p>What can you offer?</p>
              <p>Who needs it?</p>
              <p>Why should they choose you?</p>
              <p>How do you find them?</p>
              <p>How do you sell without turning into that person who enters everybody’s DM with “Good evening ma, I have an opportunity”?</p>
              <p>And once one person pays you, how do you learn to do it again?</p>
            </div>
            <p className="pt-3 font-display text-2xl text-primary-foreground md:text-3xl">That is the work inside this book.</p>
            <AlertJourneyIllustration className="mt-5 w-full max-w-sm text-primary-foreground" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-primary">More than reading</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">The book is designed to be used.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">I do not want you to finish this book with nice ideas and nothing to show for them. So it comes with a downloadable toolkit to help you actually work through it.</p>
          </div>
          <ol className="grid border-t border-foreground sm:grid-cols-3" aria-label="What the toolkit includes">
            {["Worksheets", "Templates", "Exercises"].map((item, index) => (
              <li key={item} className="border-b border-border py-6 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0 sm:first:pl-0">
                <span className="font-display text-sm text-primary">0{index + 1}</span>
                <p className="mt-2 font-display text-2xl text-foreground md:text-3xl">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-pink-soft">
        <div className="container-page grid gap-px bg-primary/20 py-0 md:grid-cols-2">
          <div className="bg-pink-soft py-12 md:py-16 md:pr-10">
            <p className="text-xs font-bold uppercase text-primary">For physical preorders</p>
            <h3 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">Start reading before your copy arrives.</h3>
            <p className="mt-4 max-w-md text-base leading-8 text-muted-foreground">Preorder the physical book and you will also get the ebook once it is ready, so you can begin while your copy is on its way.</p>
          </div>
          <div className="relative bg-pink-soft py-12 md:py-16 md:pl-10">
            <p className="text-xs font-bold uppercase text-primary">A little extra for preorders</p>
            <h3 className="mt-4 font-display text-3xl leading-tight text-foreground md:text-4xl">One optional month of PKU Pro.</h3>
            <p className="mt-4 max-w-md text-base leading-8 text-muted-foreground">You choose when to activate it. It does not start automatically when you buy the book.</p>
            <Sparkles className="absolute right-4 top-10 h-6 w-6 text-primary/40" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase text-primary">Delivery</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-foreground md:text-4xl">Nigeria-wide delivery.</h2>
            </div>
            <ul className="grid gap-px bg-border sm:grid-cols-3">
              {[
                ["Charged separately", "Delivery is charged separately from the book price."],
                ["No pickup", "There is no pickup option at launch."],
                ["Timing", "I will share fulfilment timing once production details are confirmed."],
              ].map(([title, copy]) => (
                <li key={title} className="bg-background p-5 sm:p-6">
                  <p className="font-display text-xl text-foreground">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y bg-charcoal text-primary-foreground">
        <div className="container-page grid gap-6 py-12 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-10 lg:grid-cols-[auto_minmax(0,1fr)_minmax(280px,0.9fr)]">
          <p className="editorial-five relative w-fit font-display text-5xl text-accent md:text-6xl">5</p>
          <div>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">Your First Five Alerts</h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-primary-foreground/75">The challenge that builds momentum into the Dear Bank Alert launch.</p>
          </div>
          <BankAlertStoryScene className="mx-auto w-full max-w-md text-primary-foreground lg:max-w-none" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase text-primary">Inside the book</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">By the end, I want you to know how to:</h2>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2" aria-label="What you will learn">
            {learningPoints.map((point) => (
               <li key={point} className="flex gap-4 border-b border-border bg-background p-5 text-sm leading-7 text-foreground md:text-base">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-6xl">Just so we are clear.</h2>
          <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>This is not a “get rich in seven days” book.</p>
            <p>It is not a promise that every student should immediately start a startup.</p>
            <p>It is not a collection of random side-hustle ideas you could have Googled.</p>
            <p className="pt-2 font-display text-2xl text-foreground md:text-3xl">I want to teach you something more useful:</p>
            <p className="border-l-4 border-primary pl-6 font-display text-3xl leading-snug text-primary md:pl-8 md:text-4xl">how to recognise value, create value, communicate value and get paid for it.</p>
          </div>
        </div>
      </section>

       <section className="relative overflow-hidden bg-pink-soft">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-6xl">This started before it was a book.</h2>
          <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>Dear Bank Alert began as a practical series for students who wanted to start earning.</p>
            <p>Thousands of people showed interest in that earlier work, and I watched students take simple ideas, act on them and make money for the first time.</p>
            <p>The book is me taking those lessons much further — with more context, more structure, more stories and a proper roadmap you can return to long after the first alert enters.</p>
            <PreorderButton statusId="preorder-story-status" />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-24">
          <h2 className="max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">You will probably like this book if…</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2" aria-label="Who this book is for">
            {audiencePoints.map((point) => (
              <li key={point} className="marker-dot border-b border-rule pb-5 text-base leading-8 text-muted-foreground md:text-lg">{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-16 text-center md:py-24">
          <h2 className="font-display text-4xl leading-tight md:text-6xl">The goal is not one alert.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-primary-foreground/85 md:text-xl">The goal is for you to understand why the alert came — so you can learn how to create another one.</p>
          <PreorderButton variant="butter" statusId="preorder-closing-status" />
        </div>
      </section>
    </>
  );
}
