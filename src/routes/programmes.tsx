import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { EmptyState, PageHeader } from "@/components/site-sections";
import { routeHead } from "@/lib/page-meta";

export const Route = createFileRoute("/programmes")({
  head: () => routeHead(
    "Programmes — Priscilla Kuti-Ukaegbu",
    "A reserved space for future programmes, courses, frameworks and products from Priscilla Kuti-Ukaegbu.",
    "/programmes",
  ),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  return (
    <>
      <PageHeader eyebrow="Programmes" title="Future programmes and products have a clear place in the platform.">
        <p>No programme is being presented as available until details are confirmed.</p>
      </PageHeader>
      <section className="bg-background"><div className="container-page py-16"><EmptyState icon={Sparkles} title="Programmes coming soon.">This area is reserved for approved courses, frameworks, assessments, communities and future offers.</EmptyState></div></section>
    </>
  );
}
