import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, BookOpen, Check, FolderOpen, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarginScribble, NotebookMark, PathwayCue } from "@/components/editorial-marks";
import { routeHead } from "@/lib/page-meta";
import { getPublishedCatalogue, type PublicCatalogueItem } from "@/lib/catalogue-public.functions";

export const Route = createFileRoute("/resources")({
  head: () => routeHead(
    "Digital Resources by Priscilla Kuti-Ukaegbu | Masterclasses, Guides & Devotionals",
    "Explore self-paced masterclasses, workshops, worksheets and devotionals from Priscilla Kuti-Ukaegbu, including Purpose Unfiltered, GRIT and the Eve devotional series.",
    "/resources",
  ),
  loader: () => getPublishedCatalogue({ data: { type: "digital_resource" } }),
  component: ResourcesPage,
});

const resources = [
  {
    title: "Purpose Unfiltered",
    subtext: "Tired of waiting to “find purpose”? Let’s make it less mysterious.",
    copy: [
      "I created Purpose Unfiltered for the person who knows there has to be more than indefinitely waiting for one dramatic revelation about what they are here to do.",
      "I’ll help you understand what purpose actually means for you, get out of the waiting cycle and identify practical next steps for aligning your life with it.",
    ],
    cta: "EXPLORE PURPOSE UNFILTERED",
    icon: Lightbulb,
    tone: "bg-pink-soft",
  },
  {
    title: "GRIT: The Workshop",
    subtext: "For when you know what you want… but somehow you still aren’t moving.",
    copy: [
      "You know that irritating experience where you genuinely want something and somehow procrastination, inconsistency and confusion keep winning?",
      "Yeah. That.",
      "I created GRIT to help you find clarity, deal with the patterns keeping you stuck and start moving more deliberately toward the impact you actually want to make.",
    ],
    cta: "START GRIT",
    icon: Check,
    tone: "bg-background",
  },
  {
    title: "The Eve Devotional Bundle",
    subtext: "Two studies. Fourteen days. Back to Scripture.",
    copy: [
      "I created the Eve Devotional Bundle for women who want to look more carefully at the stories, ideas and experiences that have shaped how they understand womanhood.",
      "Inside are Eve: Before The Noise and Eve: The Deceived Woman, with Scripture readings, reflections, questions, prayers, assignments, journal space and group guides.",
      "Come back to the text with me and look again.",
    ],
    cta: "EXPLORE THE EVE BUNDLE",
    icon: BookOpen,
    tone: "bg-secondary",
  },
] as const;

type VaultItem = {
  key: string; title: string; subtext: string | null; copy: readonly string[]; cta: string;
  icon: typeof Lightbulb; tone: string; image: string | null; href: string | null;
};

// Published database items are the source of truth; the approved static list
// is only a safeguard while the catalogue has no published resources.
function toVault(db: PublicCatalogueItem[]): VaultItem[] {
  if (db.length === 0) {
    return resources.map((r) => ({ ...r, key: r.title, image: null, href: null }));
  }
  return db.map((d, i) => {
    const match = resources.find((r) => r.title.toLowerCase() === d.title.toLowerCase());
    const style = resources[i % resources.length]!;
    return {
      key: d.id,
      title: d.title,
      subtext: d.short_description,
      copy: d.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      cta: match?.cta ?? `EXPLORE ${d.title.toUpperCase()}`,
      icon: match?.icon ?? style.icon,
      tone: match?.tone ?? style.tone,
      image: d.image,
      href: d.external_url,
    };
  });
}

function ResourcesPage() {
  const items = toVault(Route.useLoaderData());
  return (
    <>
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container-page py-16 md:py-24">
          <p className="text-sm font-bold uppercase text-primary">Resources</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-foreground md:text-7xl">The Digital Vault</h1>
          <p className="mt-5 max-w-3xl font-display text-2xl leading-snug text-primary md:text-3xl">Need the resource without needing me live? Start here.</p>
          <div className="mt-7 max-w-3xl space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
            <p>Not every problem requires a call with me.</p>
            <p>Sometimes you just need the right teaching, workbook, devotional or intensive at the right time.</p>
            <p>I keep my self-paced resources here so you can choose what fits the problem in front of you, work through it in your own time and come back whenever you are ready for more.</p>
          </div>
          <Button asChild size="lg" className="mt-8"><a href="#vault">EXPLORE THE VAULT <ArrowDown aria-hidden="true" /></a></Button>
          <NotebookMark className="editorial-drift doodle-faint absolute right-[9%] top-16 hidden w-28 lg:block" />
           <FolderOpen className="absolute right-[18%] top-36 hidden h-7 w-7 rotate-6 text-primary/30 lg:block" aria-hidden="true" />
        </div>
      </section>

      <section id="vault" className="scroll-mt-24 bg-paper">
        <div className="container-page divide-y divide-border py-8 md:py-12">
          {items.map(({ key, title, subtext, copy, cta, icon: Icon, tone, image, href }, index) => (
            <article key={key} className="grid gap-8 py-10 md:py-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
               <div className={`${tone} border-l-2 border-primary p-7`}>
                {image ? (
                  <img src={image} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
                ) : (
                  <div className="flex items-start justify-between"><Icon className="h-7 w-7 text-primary" aria-hidden="true" /><PathwayCue index={index === 0 ? 1 : index === 1 ? 3 : 4} className="h-10 w-12 text-primary/65" /></div>
                )}
                <p className="mt-6 text-xs font-bold uppercase text-primary">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-foreground md:text-4xl">{title}</h2>
                {subtext && <p className="mt-4 font-display text-xl leading-snug text-foreground">{subtext}</p>}
              </div>
              <div>
                <div className="max-w-3xl space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
                  {copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {href ? (
                  <Button asChild variant={index % 3 === 1 ? "charcoal" : "default"} className="mt-7">
                    <a href={href} target="_blank" rel="noopener noreferrer">{cta}</a>
                  </Button>
                ) : (
                  <>
                    <Button type="button" disabled aria-describedby={`resource-status-${index}`} variant={index % 3 === 1 ? "charcoal" : "default"} className="mt-7">{cta}</Button>
                    <p id={`resource-status-${index}`} className="mt-3 text-xs text-muted-foreground">Available soon.</p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

       <section className="relative overflow-hidden bg-charcoal text-primary-foreground">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-4xl md:text-6xl">Looking for everything?</h2>
          <div className="mt-5 max-w-2xl space-y-3 text-base leading-8 text-primary-foreground/75 md:text-lg">
            <p>The featured resources will change from time to time.</p>
            <p>If you want to see the full shelf, go into my store.</p>
          </div>
           <Button type="button" variant="butter" disabled aria-describedby="store-status" className="mt-7">VISIT THE FULL STORE</Button>
            <p id="store-status" className="mt-3 text-xs text-primary-foreground/60">The full store opens here soon.</p>
           <MarginScribble className="absolute bottom-6 right-8 hidden w-36 text-primary-foreground opacity-15 lg:block" />
        </div>
      </section>
    </>
  );
}