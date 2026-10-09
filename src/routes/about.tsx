import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

import { siteAssets } from "@/components/site-assets";
import { ClarityIllustration } from "@/components/editorial-marks";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";

export const Route = createFileRoute("/about")({
  head: () => routeHead(
    "About Priscilla Kuti-Ukaegbu | Coach, Writer & Human Development Leader",
    "Meet Priscilla Kuti-Ukaegbu and explore her work across coaching, writing, youth development, human agency, purpose, economic agency, leadership and execution.",
    "/about",
  ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_0.65fr] lg:items-center">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase text-primary">About me</p>
             <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
              <span className="block">Hi, I’m Priscilla.</span>
               <span className="mt-2 block text-primary">Kuku, if we’re not being formal.</span>
            </h1>
          </div>
           <figure className="mx-auto w-full max-w-sm overflow-hidden bg-pink-soft p-3">
             <img src={siteAssets.portrait} alt="Portrait of Priscilla Kuti-Ukaegbu" className="aspect-[4/5] w-full object-cover object-top" />
          </figure>
          <Sparkles className="absolute right-[42%] top-16 hidden h-10 w-10 rotate-12 text-primary/35 lg:block" aria-hidden="true" />
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-4xl space-y-6 text-base leading-8 text-muted-foreground md:text-lg">
            <p>I have spent more than fifteen years teaching, mentoring, coaching and building with young people and adults across different seasons of their lives.</p>
            <p>The settings have changed — classrooms, communities, businesses, coaching rooms, programmes, books, WhatsApp groups and stages — but the question underneath my work has stayed remarkably consistent:</p>
            <p className="border-l-4 border-primary pl-6 font-display text-3xl leading-tight text-foreground md:pl-9 md:text-5xl">How do people take what they have been given and build meaningful, useful, well-lived lives with it?</p>
            <p>That question has shaped almost everything I do.</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.72fr_1.28fr]">
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-6xl">I do not think life should merely happen to you.</h2>
          <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>I believe you can participate actively in designing your life.</p>
            <p>That does not mean controlling every outcome or pretending circumstances do not matter. It means developing the vision, wisdom, skill, relationships, courage, systems and discipline to take responsibility for what is yours to build.</p>
            <p>At twenty, I could imagine a beautiful life, but I did not know how to curate or create it.</p>
            <p>At thirty, I know I can envision, plan, curate and create the destiny I know is mine.</p>
            <p className="pt-2 font-display text-2xl leading-snug text-foreground md:text-3xl">That shift — from wishing to building — sits very close to the heart of my work.</p>
            <ClarityIllustration className="w-44 opacity-70" />
          </div>
        </div>
      </section>

      <section className="bg-pink-soft">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="font-display text-4xl leading-tight text-foreground md:text-6xl">So what do I actually do?</h2>
            <div className="space-y-6 text-base leading-8 text-muted-foreground md:text-lg">
              <div className="space-y-1 font-display text-2xl leading-snug text-foreground md:text-3xl">
                <p>I write.</p>
                <p>I teach.</p>
                <p>I coach.</p>
                <p>I build communities, programmes, tools and ideas.</p>
              </div>
              <p>I work at the intersection of human agency, personal growth, economic agency, purpose, leadership, execution, faith and the systems that help people turn insight into evidence.</p>
              <p>Sometimes that looks like helping a student learn how to earn.</p>
              <p>Sometimes it is a private strategy conversation.</p>
              <p>Sometimes it is a book, a workshop, a devotional, a community or a room full of young people trying to make sense of their next ten years.</p>
              <div className="pt-2 font-display text-2xl leading-snug text-foreground md:text-3xl">
                <p>The format changes.</p>
                <p>The work is still about movement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-page grid gap-8 py-16 md:py-20 lg:grid-cols-[0.72fr_1.28fr]">
          <h2 className="font-display text-4xl leading-tight md:text-5xl">And yes, God is in this.</h2>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-primary-foreground/75 md:text-lg">
            <p>I am a Christian, and my faith is not garnish I sprinkle over my work after the strategy is done.</p>
            <p>It shapes how I understand stewardship, purpose, people, wisdom, responsibility, service and what a well-used life actually means.</p>
            <p>I will never force faith down anyone’s throat.</p>
            <p>But I also will not pretend it is separate from how I see the world.</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-4xl border-l-4 border-primary pl-6 md:pl-10">
            <p className="text-sm font-bold uppercase text-primary">Current work</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">What I’m building now</h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
              <p>PKU is the home I am building around this body of work.</p>
              <p>It brings together my writing, coaching, teaching, books, resources, paid experiences and the longer-term work of helping people build more intentional lives.</p>
              <p>I also serve as Vice Principal of The Cave, where I help mentor and build with a community of young people committed to growth, influence, work, wealth and impact.</p>
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link to="/start-here">START HERE <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}