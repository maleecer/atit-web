import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { CollectionPageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
    title: pageMetadata.gallery.title,
    description: pageMetadata.gallery.description,
    alternates: {
        canonical: "/gallery",
    },
}

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CollectionPageSchema
                title={pageMetadata.gallery.title}
                description={pageMetadata.gallery.description}
                path="/gallery"
                collectionType="ImageGallery"
            />
            {children}
        </>
    )
}
