import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { WebPageSchema, BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    alternates: {
        canonical: "/about",
    },
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <WebPageSchema
                title={pageMetadata.about.title}
                description={pageMetadata.about.description}
                path="/about"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "About", path: "/about" },
                ]}
            />
            {children}
        </>
    )
}
