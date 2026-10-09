import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, MessageCircle, Mic2 } from "lucide-react";

import { BadgeNote, SectionHeader } from "@/components/site-sections";
import { GrowthMark, PaperPlaneMark } from "@/components/editorial-marks";
import { UntanglingCharacterScene } from "@/components/editorial-characters";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";

export const Route = createFileRoute("/work-with-me")({
  head: () =>
    routeHead(
      "Work With Priscilla Kuti-Ukaegbu | Strategy, Coaching & Speaking",
      "Book a private strategy session, explore PKU Pro or invite Priscilla Kuti-Ukaegbu to speak, teach or collaborate.",
      "/work-with-me",
    ),
  component: WorkWithMePage,
});

function WorkWithMePage() {
  return (
    <>
      <section className="border-b bg-background">
        <div className="container-page py-20 md:py-28">
          <p className="text-sm font-bold uppercase text-primary">Work with me</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] text-balance md:text-7xl">
            Sometimes you need more than content.
          </h1>
          <div className="mt-6 max-w-2xl space-y-3 text-lg leading-8 text-muted-foreground">
            <p>
              You need somebody to sit with the actual thing, ask better questions and help you see what you cannot see
              from inside it.
            </p>
            <p>I work with people in a few different ways.</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <div className="container-page grid gap-8 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <BadgeNote>Private strategy &amp; advisory</BadgeNote>
            <h2 className="mt-5 font-display text-4xl md:text-6xl">1:1 Strategy &amp; Advisory</h2>
            <p className="mt-4 font-display text-2xl text-primary md:text-3xl">
              Bring the problem. Let&apos;s find the move.
            </p>
            <UntanglingCharacterScene className="mt-5 w-full max-w-sm" />
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Bring me the thing that feels stuck, confusing, messy or unnecessarily difficult.</p>
              <p>
                I will help you look underneath the obvious symptoms, figure out what is really going on and identify
                your clearest next move.
              </p>
              <p>This is not me shouting motivational quotes at you for an hour.</p>
              <p>It is focused private thinking built around your actual situation.</p>
            </div>
          </div>
          <aside className="border-y border-primary bg-background p-7 lg:border-y-0 lg:border-l-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">Open for booking</p>
            <p className="mt-3 font-display text-4xl">$120</p>
            <dl className="mt-5 grid gap-3 border-y border-border py-5 text-sm leading-6">
              <div>
                <dt className="font-bold text-foreground">Duration</dt>
                <dd className="text-muted-foreground">90 minutes</dd>
              </div>
              <div>
                <dt className="font-bold text-foreground">Delivery</dt>
                <dd className="text-muted-foreground">Online by default</dd>
              </div>
            </dl>
            <Button disabled aria-describedby="session-status" className="mt-6">
              BOOK A PRIVATE SESSION
            </Button>
            <p id="session-status" className="mt-3 text-xs leading-5 text-muted-foreground">
              Booking opens here soon.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <p className="text-sm font-bold uppercase text-primary">How booking works</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl">Three steps, then we get to work.</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              ["Book your session", "Complete payment for your private session."],
              ["Give me the context", "Complete the focused intake form so I understand what you are bringing into the room."],
              ["Find your time", "Choose or receive your session slot."],
            ].map(([title, copy], index) => (
              <li key={title} className="group relative border-t-2 border-foreground pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl text-primary">0{index + 1}</span>
                  {index < 2 && <ArrowRight className="hidden h-6 w-6 text-primary/50 transition-transform group-hover:translate-x-1 md:block" aria-hidden="true" />}
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">{title}</h3>
                <p className="mt-2 max-w-xs text-base leading-7 text-muted-foreground">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-pink-soft">
        <div className="container-page grid gap-8 py-14 md:py-16 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
          <h2 className="font-display text-3xl leading-tight md:text-4xl">Before you book</h2>
          <dl className="grid gap-6 sm:grid-cols-3">
            {[
              ["24 hours", "One free reschedule is available with at least 24 hours’ notice."],
              ["Late cancellations", "Late cancellations and no-shows are non-refundable."],
              ["Genuine emergencies", "I will use my discretion where a genuine emergency is involved."],
            ].map(([title, copy]) => (
              <div key={title} className="border-l-2 border-primary pl-5">
                <dt className="text-xs font-bold uppercase text-primary">{title}</dt>
                <dd className="mt-2 text-sm leading-7 text-foreground/80">{copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:py-20">
          <Lightbulb className="h-10 w-10 text-accent" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-accent">Launching October</p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">PKU Pro</h2>
            <h3 className="mt-3 max-w-3xl font-display text-2xl leading-snug md:text-3xl">
              For when you want to go deeper — and actually move.
            </h3>
            <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-primary-foreground/80">
              <p>Free content can give you an idea. PKU Pro is where I go deeper with the people who are ready to do something with it.</p>
              <p>It is a specially curated ecosystem for intensive and personalized mentorship.</p>
              <p>This is not another group to mute and rediscover eight months later. Come ready to participate.</p>
            </div>

            <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-primary-foreground/25 pt-8 sm:grid-cols-2" aria-label="What members receive">
              {["Deeper teaching", "Guided implementation and accountability", "A resource library", "Community", "Selected opportunities", "Closer access to me"].map((item) => (
                <li key={item} className="flex gap-3 font-display text-xl leading-snug">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-6 border-y border-primary-foreground/25 py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
              <p className="font-display text-7xl leading-none text-accent">4</p>
              <div>
                <p className="font-display text-2xl">live touchpoints every month</p>
                <p className="mt-2 text-sm leading-7 text-primary-foreground/80">Two teaching and implementation sessions, plus two healing and growth sessions.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-3" aria-label="PKU Pro pricing">
              {[
                ["$5", "per month", "Recurring, and you can cancel."],
                ["$12", "for 3 months", ""],
                ["$20", "for 6 months", ""],
              ].map(([price, term, note]) => (
                <div key={price}>
                  <p className="font-display text-5xl">{price}</p>
                  <p className="mt-1 text-sm font-bold uppercase text-primary-foreground/85">{term}</p>
                  {note && <p className="mt-1 text-xs text-primary-foreground/70">{note}</p>}
                </div>
              ))}
            </div>
            <Button disabled variant="butter" aria-describedby="pku-pro-status" className="mt-10">
              JOIN PKU PRO
            </Button>
            <p id="pku-pro-status" className="mt-3 text-xs text-primary-foreground/70">
              Doors open in October.
            </p>
          </div>
          <GrowthMark className="absolute bottom-2 right-6 hidden w-28 text-primary-foreground opacity-15 lg:block" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-background">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Mic2 className="h-8 w-8 text-primary" aria-hidden="true" />
            <SectionHeader eyebrow="Speaking / teaching" title="Invite me into the room." />
            <div className="mt-5 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                I speak and teach on human agency, future-building, work, money, purpose, leadership, execution, youth
                development and the practical work of translating insight into action.
              </p>
              <p>
                If you are planning a conference, school programme, community experience, team session or learning event
                and you think my work fits, tell me what you are building.
              </p>
            </div>
            <Button asChild variant="charcoal" className="mt-7">
              <Link to="/contact">
                INVITE ME TO SPEAK <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {topics.map((topic) => (
              <div key={topic} className="grid min-h-28 place-items-center bg-paper p-4 text-center text-sm font-bold">
                {topic}
              </div>
            ))}
          </div>
          <PaperPlaneMark className="doodle-faint absolute right-6 top-8 hidden w-20 lg:block" />
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-page grid gap-7 py-16 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
          <MessageCircle className="h-9 w-9 text-accent" aria-hidden="true" />
          <div>
            <h2 className="font-display text-3xl md:text-5xl">Not sure which route fits?</h2>
            <p className="mt-3 font-display text-2xl text-primary-foreground">Send me the context.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/70">
              If I do not think I am the right person for the problem, I would rather tell you than sell you something
              you do not need.
            </p>
          </div>
          <Button asChild variant="butter">
            <Link to="/contact">
              CONTACT ME <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

const topics = [
  "Human agency",
  "Future-building",
  "Work",
  "Money",
  "Purpose",
  "Leadership",
  "Execution",
  "Youth development",
];
