import { createFileRoute } from "@tanstack/react-router";
import { OutcomesShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/reader-outcomes/submit")({ head: () => routeHead("Share Your Story — Priscilla Kuti-Ukaegbu", "Share what changed after reading, learning or working with Priscilla Kuti-Ukaegbu.", "/reader-outcomes/submit"), component: () => <OutcomesShell submit /> });
