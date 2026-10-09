import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PathwayGrid } from "@/components/pathway-grid";
import { WayfinderCharacterScene } from "@/components/editorial-characters";
import { SectionHeader } from "@/components/site-sections";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";

export const Route = createFileRoute("/start-here")({
  head: () => routeHead(
    "Start Here — Priscilla Kuti-Ukaegbu",
    "Find the part of my work that fits what you are ready to move: private strategy, ongoing support, books, resources, writing, or collaboration.",
    "/start-here",
  ),
  component: StartHerePage,
});

function StartHerePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container-page grid gap-5 py-14 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.45fr)] md:items-center md:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase text-primary">Start here</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-balance md:text-7xl">Okay, you’re here.<br />What are we moving?</h1>
            <div className="mt-6 max-w-2xl space-y-3 text-lg leading-8 text-muted-foreground">
              <p>I built this page so you do not have to wander around trying to figure out which part of my work is for you.</p>
              <p>Pick the sentence that sounds most like your life right now.</p>
            </div>
          </div>
          <WayfinderCharacterScene className="mx-auto w-40 max-w-full md:w-full md:max-w-80" />
        </div>
      </section>

       <section className="relative overflow-hidden bg-paper">
        <div className="container-page py-16 md:py-20">
          <SectionHeader eyebrow="Choose your route" title="There is more than one way in." />
          <div className="mt-10"><PathwayGrid context="page" /></div>
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-page py-16 md:flex md:items-center md:justify-between md:gap-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">Still not sure?</h2>
            <p className="mt-4 text-base leading-8 text-primary-foreground/75">Start with Good Mornings With Kuku. You will know fairly quickly whether we think well together.</p>
          </div>
          <Button asChild variant="butter" size="lg" className="mt-7 shrink-0 md:mt-0">
            <Link to="/writing">READ GOOD MORNINGS WITH KUKU <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
