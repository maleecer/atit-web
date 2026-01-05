import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { WebPageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
    title: pageMetadata.events.title,
    description: pageMetadata.events.description,
    alternates: {
        canonical: "/events",
    },
}

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <WebPageSchema
                title={pageMetadata.events.title}
                description={pageMetadata.events.description}
                path="/events"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Events", path: "/events" },
                ]}
            />
            {children}
        </>
    )
}
