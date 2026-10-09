import { createFileRoute } from "@tanstack/react-router";
import { PartnersShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/partners/register")({ head: () => routeHead("Partnership Enquiry — Priscilla Kuti-Ukaegbu", "Send the context for a speaking, teaching or collaboration idea to Priscilla Kuti-Ukaegbu.", "/partners/register"), component: () => <PartnersShell register /> });
