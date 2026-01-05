import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo-config"
import { ContactPageSchema } from "@/components/structured-data"

export const metadata: Metadata = {
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    alternates: {
        canonical: "/contact",
    },
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ContactPageSchema />
            {children}
        </>
    )
}
