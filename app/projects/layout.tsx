import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { CollectionPageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
    title: pageMetadata.projects.title,
    description: pageMetadata.projects.description,
    alternates: {
        canonical: "/projects",
    },
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CollectionPageSchema
                title={pageMetadata.projects.title}
                description={pageMetadata.projects.description}
                path="/projects"
                collectionType="CollectionPage"
            />
            {children}
        </>
    )
}
