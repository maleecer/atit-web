import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { WebPageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
    title: pageMetadata.articles.title,
    description: pageMetadata.articles.description,
    alternates: {
        canonical: "/articles",
    },
}

export default function ArticlesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <WebPageSchema
                title={pageMetadata.articles.title}
                description={pageMetadata.articles.description}
                path="/articles"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Articles", path: "/articles" },
                ]}
            />
            {children}
        </>
    )
}
