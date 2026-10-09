import { createFileRoute } from "@tanstack/react-router";
import { PartnersShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/partners")({ head: () => routeHead("Partnerships — Priscilla Kuti-Ukaegbu", "Speaking, teaching, youth development, campaigns and thoughtful collaborations with Priscilla Kuti-Ukaegbu.", "/partners"), component: () => <PartnersShell /> });
