import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/terms")({ head: () => routeHead("Terms — Priscilla Kuti-Ukaegbu", "Terms and conditions placeholder for future book commerce and platform use.", "/terms"), component: () => <LegalShell title="Terms and Conditions" description="Terms text is not final yet." items={["Book purchase terms", "Preorder conditions", "Delivery and fulfilment", "Refunds and cancellations", "Resource access terms"]} /> });
