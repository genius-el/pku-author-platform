import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/consent")({ head: () => routeHead("Consent — Priscilla Kuti-Ukaegbu", "Consent information for Good Mornings With Kuku, reader stories, resources and customer data.", "/consent"), component: () => <LegalShell title="Consent Information" description="Consent language will be finalized before real forms collect data." items={["Good Mornings With Kuku consent", "Reader story permission", "Evidence upload consent", "Marketing communication choices", "Customer data retention"]} /> });
