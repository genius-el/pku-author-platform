import { createFileRoute } from "@tanstack/react-router";
import { OutcomesShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/reader-outcomes")({ head: () => routeHead("Reader Stories — Priscilla Kuti-Ukaegbu", "Stories about the decisions, habits, work and ideas that moved after engaging with Priscilla Kuti-Ukaegbu’s work.", "/reader-outcomes"), component: () => <OutcomesShell /> });
