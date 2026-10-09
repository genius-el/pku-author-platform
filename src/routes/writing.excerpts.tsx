import { createFileRoute } from "@tanstack/react-router";
import { ContentSubrouteShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/writing/excerpts")({ head: () => routeHead("Book Excerpts — Priscilla Kuti-Ukaegbu", "Future book excerpts from Priscilla Kuti-Ukaegbu.", "/writing/excerpts"), component: () => <ContentSubrouteShell title="Book excerpts" description="Approved excerpts will be added later." /> });
