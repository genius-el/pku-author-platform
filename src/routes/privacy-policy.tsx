import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/privacy-policy")({ head: () => routeHead("Privacy Policy — Priscilla Kuti-Ukaegbu", "Privacy information for the Priscilla Kuti-Ukaegbu platform.", "/privacy-policy"), component: () => <LegalShell title="Privacy Policy" description="Privacy text is not final yet." items={["Data collection notice", "Good Mornings With Kuku consent", "Order and delivery data", "Reader outcome permissions", "Contact and support data"]} /> });
