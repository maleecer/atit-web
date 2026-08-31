import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { WebPageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
    title: pageMetadata.extru.title,
    description: pageMetadata.extru.description,
    alternates: {
        canonical: "/extru",
    },
}

export default function ExtruLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <WebPageSchema
                title={pageMetadata.extru.title}
                description={pageMetadata.extru.description}
                path="/extru"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "EXTRU 2026", path: "/extru" },
                ]}
            />
            {children}
        </>
    )
}
