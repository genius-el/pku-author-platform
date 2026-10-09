import { createFileRoute } from "@tanstack/react-router";
import { ContentSubrouteShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/writing/articles")({ head: () => routeHead("Articles — Priscilla Kuti-Ukaegbu", "Future articles from Priscilla Kuti-Ukaegbu.", "/writing/articles"), component: () => <ContentSubrouteShell title="Articles" description="Article publishing will be connected later." /> });
