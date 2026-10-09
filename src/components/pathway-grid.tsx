import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PathwayCue } from "@/components/editorial-marks";
import { startHerePathways } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const toneClasses = {
  pink: "border-primary bg-primary text-primary-foreground",
  white: "border-border bg-card text-foreground",
  charcoal: "border-charcoal bg-charcoal text-primary-foreground",
  blush: "border-pink-soft bg-pink-soft text-foreground",
  teal: "border-teal/40 bg-teal/20 text-foreground",
};

export function PathwayGrid({ context = "home" }: { context?: "home" | "page" }) {
  return (
    <div className="grid items-stretch border-l border-t border-border md:grid-cols-2">
      {startHerePathways.map((pathway, index) => {
        const inverted = pathway.tone === "pink" || pathway.tone === "charcoal";
        const prompt = context === "home" ? pathway.homePrompt : pathway.pagePrompt;
        const direction = context === "home" ? pathway.homeDirection : pathway.pageDirection;
        return (
          <article
            key={prompt}
            className={cn(
              "group relative flex min-h-0 min-w-0 flex-col justify-between border-b border-r border-border p-6 md:p-8",
              toneClasses[pathway.tone],
            )}
          >
            <div>
              <div className="flex items-start justify-between gap-4">
               <p className={cn("text-xs font-bold uppercase", inverted ? "text-primary-foreground/75" : "text-muted-foreground")}>0{index + 1}</p>
               <PathwayCue index={index} className="h-10 w-12 shrink-0 opacity-65 transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transform-none" />
              </div>
              <h3 className="mt-5 font-display text-3xl leading-tight">{prompt}</h3>
              <p className={cn("mt-4 whitespace-pre-line text-sm leading-7", inverted ? "text-primary-foreground/75" : "text-muted-foreground")}>{direction}</p>
            </div>
             <Button asChild variant={inverted ? "butter" : "link"} className="mt-7 w-fit px-3 text-left text-xs sm:text-sm">
              <Link to={pathway.to}>
                {context === "home" ? pathway.homeCta : pathway.pageCta}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </article>
        );
      })}
    </div>
  );
}