import { createFileRoute } from "@tanstack/react-router";
import { ContentSubrouteShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/writing/essays")({ head: () => routeHead("Essays — Priscilla Kuti-Ukaegbu", "Future essays from Priscilla Kuti-Ukaegbu.", "/writing/essays"), component: () => <ContentSubrouteShell title="Essays" description="Essay publishing will be connected later." /> });
