import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/site-sections";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";

const substackUrl = "https://substack.com/@kutipriscillatemiloluwa?utm_source=share&utm_medium=android&r=2wm14y";

export const Route = createFileRoute("/writing/newsletters")({
  head: () => routeHead("Good Mornings With Kuku — Priscilla Kuti-Ukaegbu", "Letters from Priscilla Kuti-Ukaegbu for people who like to think before the world gets noisy.", "/writing/newsletters"),
  component: () => (
    <PageHeader eyebrow="Good Mornings With Kuku" title="Read the letters on Substack.">
      <p>Substack is the current publishing and newsletter home. The PKU website remains the discovery and brand layer for the writing.</p>
      <Button asChild className="mt-7"><a href={substackUrl} target="_blank" rel="noreferrer">FOLLOW THE WRITING <ArrowRight aria-hidden="true" /></a></Button>
    </PageHeader>
  ),
});
