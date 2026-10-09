import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PenLine, Sparkles } from "lucide-react";

import { PathwayGrid } from "@/components/pathway-grid";
import { AlertJourneyIllustration, BankAlertMark, HandArrow, NotebookMark, ThoughtSpark } from "@/components/editorial-marks";
import { siteAssets } from "@/components/site-assets";
import { AuthorIntro, BadgeNote, SectionHeader } from "@/components/site-sections";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";

export const Route = createFileRoute("/")({
  head: () => routeHead(
    "Priscilla Kuti-Ukaegbu | Coach, Writer, Strategist & Human Development Leader",
    "Explore the work of Priscilla Kuti-Ukaegbu — coaching, writing, books, resources and growth experiences designed to help people build their future with greater agency, clarity and intention.",
    "/",
  ),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="overflow-hidden bg-background">
        <div className="container-page grid gap-10 py-12 md:min-h-[680px] md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase leading-6 text-primary sm:text-sm">
              PRISCILLA KUTI-UKAEGBU<br />CATALYST FOR HUMAN TRANSFORMATION &amp; AGENCY
            </p>
             <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] text-balance text-foreground md:text-6xl lg:text-7xl">Build your future.<br /><span className="editorial-underline text-primary">On purpose.</span></h1>
            <p className="mt-6 max-w-2xl font-display text-xl leading-8 text-foreground md:text-2xl">I believe you should have an active hand in the life you end up living.</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">So I write, teach, coach and build tools, experiences and communities that help you think more clearly, grow your agency and actually do something with the work, ideas, purpose and possibilities you carry.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg"><Link to="/start-here">START HERE <ArrowRight aria-hidden="true" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/writing">READ GOOD MORNINGS WITH KUKU</Link></Button>
            </div>
            <HandArrow className="editorial-stroke absolute -right-9 top-12 hidden w-20 rotate-[-16deg] text-primary/70 lg:block" />
          </div>
          <div className="relative mx-auto w-full max-w-xl self-end md:self-center">
            <div className="absolute -left-4 top-16 hidden h-24 w-1 bg-primary md:block" aria-hidden="true" />
            <div className="overflow-hidden bg-charcoal">
              <img src={siteAssets.portrait} alt="Portrait of Priscilla Kuti-Ukaegbu" className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-4 right-0 bg-accent px-4 py-3 text-xs font-bold text-accent-foreground sm:right-4 sm:px-5 sm:text-sm">Clarity → agency → action</div>
            <ThoughtSpark className="editorial-drift absolute -right-4 -top-4 hidden w-12 text-primary md:block" />
          </div>
        </div>
      </section>

      <AuthorIntro />

       <section className="relative overflow-hidden bg-paper">
        <div className="container-page py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader eyebrow="Start here" title="Okay. What are you trying to move?">
              <p>You do not need to read this entire website like it is an exam.</p>
              <p className="mt-3">Start with the thing that is actually in front of you.</p>
            </SectionHeader>
            <Button asChild variant="outline" className="w-fit"><Link to="/start-here">START HERE <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
           <div className="mt-10"><PathwayGrid /></div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-bold uppercase text-primary">Currently on my desk</p>
            <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">Dear Bank Alert</h2>
            <p className="mt-4 font-display text-2xl leading-snug text-foreground">Build your first real source of income while you’re still a student.</p>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Waiting until after graduation to learn how money works sounds unnecessarily stressful to me.</p>
              <p>I wrote Dear Bank Alert for students who want to learn how to identify what people will pay them for, package it, position themselves, find customers and build the skill of earning repeatedly.</p>
            </div>
            <p className="mt-7 font-display text-3xl leading-tight text-foreground">Not one lucky alert.<br /><span className="editorial-underline text-primary">A source.</span></p>
            <AlertJourneyIllustration className="mt-5 w-full max-w-xs text-foreground" />
            <Button asChild className="mt-8"><Link to="/dear-bank-alert">DISCOVER DEAR BANK ALERT <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
           <div className="relative order-1 bg-pink-soft p-8 lg:order-2">
            <img src={siteAssets.bookMockup} alt="Dear Bank Alert physical book mockup" loading="lazy" className="mx-auto w-full max-w-md object-contain" />
             <BankAlertMark className="doodle-faint absolute bottom-5 right-5 w-20" />
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
          <Sparkles className="h-10 w-10 text-accent" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase text-primary-foreground/65">Private strategy &amp; advisory</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-5xl">Sometimes you do not need more content.</h2>
            <div className="mt-4 max-w-2xl space-y-4 text-base leading-8 text-primary-foreground/75">
              <p>Sometimes you need somebody to sit with the actual problem and think properly with you.</p>
              <p>If you have something that feels stuck, confusing, messy or unnecessarily difficult, I offer private strategy and advisory sessions built around your actual situation.</p>
            </div>
          </div>
          <Button asChild variant="butter" size="lg"><Link to="/work-with-me">WORK WITH ME <ArrowRight aria-hidden="true" /></Link></Button>
        </div>
      </section>

       <section className="relative overflow-hidden bg-background">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="relative grid min-h-56 place-items-center border-y border-border bg-pink-soft text-primary lg:min-h-72" aria-hidden="true"><NotebookMark className="editorial-drift w-28 opacity-80" /><PenLine className="absolute bottom-8 right-10 h-8 w-8 opacity-35" /></div>
          <div>
            <BadgeNote>My letters</BadgeNote>
            <h2 className="mt-5 font-display text-4xl md:text-6xl">Good Mornings With Kuku</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>This is where I write when I have more to say than will fit in a caption.</p>
              <p>I write about work, money, purpose, faith, relationships, ideas, building things, the lessons I am learning in real time and whatever else has been sitting too loudly in my head.</p>
              <p>Some letters are practical.</p>
              <p>Some are reflective.</p>
              <p>Some are me taking the scenic route to a point.</p>
              <p>If you like thinking with me, come in.</p>
            </div>
            <Button asChild variant="outline" className="mt-8"><Link to="/writing">READ GOOD MORNINGS WITH KUKU <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="border-t bg-paper">
        <div className="container-page py-20 text-center">
          <h2 className="mx-auto max-w-4xl font-display text-4xl leading-tight md:text-6xl">Your future deserves more than wishful thinking.</h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
            <p>You do not have to have every answer today.</p>
            <p>But you can learn to see more clearly, choose more deliberately and build with more intention than you did yesterday.</p>
            <p className="font-display text-2xl text-foreground">That is the work.</p>
          </div>
          <Button asChild size="lg" className="mt-8"><Link to="/start-here">START HERE <ArrowRight aria-hidden="true" /></Link></Button>
        </div>
      </section>
    </>
  );
}
