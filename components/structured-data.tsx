// JSON-LD Structured Data Components for SEO
// These schemas help search engines understand and display rich results

import { SITE_URL, siteConfig, socialLinks, siteNavigation } from "@/lib/seo-config"

// ============================================================
// Organization Schema (EducationalOrganization)
// Enables rich organization card in search results
// ============================================================
export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: siteConfig.name,
        alternateName: [siteConfig.fullName, "ATIT", "Association of Technology IT"],
        url: SITE_URL,
        logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}${siteConfig.logos.default}`,
            width: 512,
            height: 512,
        },
        image: `${SITE_URL}${siteConfig.logos.default}`,
        description: siteConfig.description,
        foundingDate: siteConfig.foundingDate,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.streetAddress,
            addressLocality: siteConfig.address.addressLocality,
            addressRegion: siteConfig.address.addressRegion,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.addressCountry,
        },
        sameAs: [
            socialLinks.facebook,
            socialLinks.linkedin,
            socialLinks.discord,
        ].filter(Boolean),
        parentOrganization: {
            "@type": "CollegeOrUniversity",
            name: "Rajarata University of Sri Lanka",
            alternateName: "RUSL",
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// WebSite Schema with SearchAction
// Enables sitelinks search box in Google
// ============================================================
export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: SITE_URL,
        description: siteConfig.description,
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: siteConfig.language,
        // SearchAction enables the sitelinks search box
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// BreadcrumbList Schema
// Helps Google understand site hierarchy
// ============================================================
interface BreadcrumbItem {
    name: string
    path: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// SiteNavigationElement Schema
// Helps with sitelinks display
// ============================================================
export function SiteNavigationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#navigation`,
        name: "Main Navigation",
        hasPart: siteNavigation.map((nav) => ({
            "@type": "WebPage",
            name: nav.name,
            url: `${SITE_URL}${nav.path}`,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// WebPage Schema
// For individual pages
// ============================================================
interface WebPageSchemaProps {
    title: string
    description: string
    path: string
    breadcrumbs?: BreadcrumbItem[]
}

export function WebPageSchema({ title, description, path, breadcrumbs }: WebPageSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}${path}/#webpage`,
        url: `${SITE_URL}${path}`,
        name: title,
        description: description,
        isPartOf: {
            "@id": `${SITE_URL}/#website`,
        },
        about: {
            "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: siteConfig.language,
        ...(breadcrumbs && {
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.name,
                    item: `${SITE_URL}${item.path}`,
                })),
            },
        }),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// Event Schema
// For individual events (use on events page)
// ============================================================
interface EventSchemaProps {
    name: string
    description: string
    startDate: string
    endDate?: string
    location?: string
    image?: string
    organizer?: string
}

export function EventSchema({ name, description, startDate, endDate, location, image, organizer }: EventSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: name,
        description: description,
        startDate: startDate,
        ...(endDate && { endDate }),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: location || "Faculty of Technology, Rajarata University",
            address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig.address.addressLocality,
                addressRegion: siteConfig.address.addressRegion,
                addressCountry: siteConfig.address.addressCountry,
            },
        },
        ...(image && {
            image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
        }),
        organizer: {
            "@type": "Organization",
            name: organizer || siteConfig.name,
            url: SITE_URL,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// CollectionPage Schema
// For gallery, projects pages
// ============================================================
interface CollectionPageSchemaProps {
    title: string
    description: string
    path: string
    collectionType: "ImageGallery" | "CollectionPage"
}

export function CollectionPageSchema({ title, description, path, collectionType }: CollectionPageSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": collectionType,
        "@id": `${SITE_URL}${path}/#${collectionType.toLowerCase()}`,
        name: title,
        description: description,
        url: `${SITE_URL}${path}`,
        isPartOf: {
            "@id": `${SITE_URL}/#website`,
        },
        about: {
            "@id": `${SITE_URL}/#organization`,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// ContactPage Schema
// For contact page with contact points
// ============================================================
export function ContactPageSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact/#contactpage`,
        name: "Contact ATIT Rajarata",
        description: "Get in touch with ATIT Rajarata",
        url: `${SITE_URL}/contact`,
        mainEntity: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            contactPoint: [
                {
                    "@type": "ContactPoint",
                    contactType: "general inquiries",
                    email: siteConfig.email,
                    availableLanguage: ["English", "Sinhala"],
                },
            ],
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ============================================================
// Combined Schema for Root Layout
// Exports all global schemas together
// ============================================================
export function GlobalStructuredData() {
    return (
        <>
            <OrganizationSchema />
            <WebSiteSchema />
            <SiteNavigationSchema />
        </>
    )
}
