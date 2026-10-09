import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PenLine, Search, Send, Sparkles } from "lucide-react";

import { EmptyState } from "@/components/site-sections";
import { MarginScribble, NotebookMark, PaperPlaneMark } from "@/components/editorial-marks";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";

const substackUrl = "https://substack.com/@kutipriscillatemiloluwa?utm_source=share&utm_medium=android&r=2wm14y";

export const Route = createFileRoute("/writing")({
  head: () => routeHead(
    "Good Mornings With Kuku | Writing by Priscilla Kuti-Ukaegbu",
    "Read Good Mornings With Kuku — Priscilla Kuti-Ukaegbu’s letters on work, money, purpose, faith, relationships, leadership, execution and intentionally building a meaningful life.",
    "/writing",
  ),
  component: WritingPage,
});

function WritingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container-page py-16 md:py-24">
          <p className="text-sm font-bold uppercase text-primary">My letters</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight text-foreground md:text-7xl">Good Mornings With Kuku</h1>
          <p className="mt-5 max-w-3xl font-display text-2xl leading-snug text-primary md:text-3xl">Letters for people who like to think before the world gets noisy.</p>
          <div className="mt-7 max-w-3xl space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
            <p>This is where you can find my writing.</p>
            <p>I write about the things I am learning, questioning, building, changing my mind about and trying to understand properly.</p>
            <p>Expect letters about work, money, purpose, faith, relationships, womanhood, leadership, execution, books, building a future and whatever else refuses to leave me alone that week.</p>
            <p>I am not promising every letter will be short.</p>
            <p className="font-display text-2xl text-foreground">I know myself.</p>
          </div>
            <Button asChild size="lg" className="mt-8"><a href={substackUrl} target="_blank" rel="noreferrer">GET GOOD MORNINGS WITH KUKU <ArrowRight aria-hidden="true" /></a></Button>
            <p className="mt-3 max-w-xl text-xs leading-5 text-muted-foreground">Good Mornings With Kuku is currently published and delivered through Substack.</p>
           <NotebookMark className="editorial-drift doodle-faint absolute right-[9%] top-16 hidden w-28 lg:block" />
           <PenLine className="absolute right-[18%] top-36 hidden h-7 w-7 rotate-12 text-primary/30 lg:block" aria-hidden="true" />
        </div>
      </section>

       <section className="relative overflow-hidden bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <Sparkles className="h-7 w-7 text-primary" aria-hidden="true" />
              <h2 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-6xl">Come rummage through my brain.</h2>
            </div>
            <div className="space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
              <p>Some letters are stories.</p>
              <p>Some are practical frameworks.</p>
              <p>Some are notes from whatever God, work, marriage, business, people or my own decisions are teaching me at the moment.</p>
              <p className="font-display text-2xl text-foreground">Read what pulls you.</p>
            </div>
          </div>
          <div className="mt-12">
            <EmptyState
              icon={Search}
              title="Nothing came up."
               action={<Button asChild variant="outline"><a href={substackUrl} target="_blank" rel="noreferrer">FOLLOW THE WRITING</a></Button>}
            >
              Try another word, or go back to the main library and have a look around.
            </EmptyState>
          </div>
           <MarginScribble className="doodle-faint absolute bottom-5 right-7 hidden w-32 lg:block" />
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-primary">Good Mornings With Kuku</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">Good morning.</h2>
            <div className="mt-5 max-w-2xl space-y-3 text-base leading-8 text-primary-foreground/75 md:text-lg">
              <p>Leave your email and I’ll send Good Mornings With Kuku straight to you.</p>
              <p>No daily assault on your inbox.</p>
              <p>Just thoughtful letters when I have something worth sending.</p>
            </div>
          </div>
          <div className="border border-primary-foreground/15 bg-primary-foreground/8 p-6">
            <p className="text-sm leading-7 text-primary-foreground/75">Substack is the current publishing and newsletter home. The PKU website is the discovery layer for the writing.</p>
            <Button asChild variant="butter" className="mt-5 w-full sm:w-auto"><a href={substackUrl} target="_blank" rel="noreferrer">SEND ME THE LETTERS <Send aria-hidden="true" /></a></Button>
          </div>
           <PaperPlaneMark className="editorial-plane absolute bottom-4 right-4 hidden w-20 text-primary-foreground opacity-25 lg:block" />
        </div>
      </section>
    </>
  );
}