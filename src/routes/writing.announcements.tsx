import { createFileRoute } from "@tanstack/react-router";
import { ContentSubrouteShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/writing/announcements")({ head: () => routeHead("Announcements — Priscilla Kuti-Ukaegbu", "Future announcements from Priscilla Kuti-Ukaegbu.", "/writing/announcements"), component: () => <ContentSubrouteShell title="Announcements" description="Official announcements will be added later." /> });
