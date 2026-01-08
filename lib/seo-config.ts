// SEO Configuration for ATIT Rajarata Website
// IMPORTANT: Replace 'https://yourdomain.com' with your actual domain when finalized

// ============================================================
// DOMAIN PLACEHOLDER - UPDATE WHEN DOMAIN IS FINALIZED
// ============================================================
export const SITE_URL = "https://www.atit-rajarata.edu.lk"

// ============================================================
// SITE INFORMATION
// ============================================================
export const siteConfig = {
  name: "ATIT Rajarata",
  shortName: "ATiT",
  fullName: "Association of Technology IT - Rajarata University",
  description:
    "Association of Technology IT - Rajarata University of Sri Lanka. Explore workshops, hackathons, projects, and connect with tech enthusiasts.",
  tagline: "Innovate. Create. Transform.",
  keywords: [
    "ATIT",
    "ATIT Rajarata",
    "Rajarata University",
    "RUSL FOT",
    "Technology Club",
    "Innovation Hub",
    "Student Organization",
    "Tech Community",
    "Sri Lanka",
    "Faculty of Technology",
    "ICT",
    "Hackathon",
    "Workshops",
    "Web Development",
    "AI",
    "IoT",
    "Programming",
  ],
  locale: "en_US",
  language: "en",

  // Organization founding
  foundingDate: "2019",

  // Contact information
  email: "atit@tec.rjt.ac.lk",

  // Address
  address: {
    streetAddress: "Faculty of Technology ,Rajarata University of Sri Lanka",
    addressLocality: "Mihintale",
    addressRegion: "Anuradhapura",
    postalCode: "50300",
    addressCountry: "LK",
  },

  // Logo paths (relative to public folder)
  logos: {
    default: "/assets/atit-logo.png",
    rounded: "/assets/atit-logo-rounded.png",
    icon: "/assets/atit-logo-rounded.png",
  },

  // Open Graph image (for social sharing)
  ogImage: "/assets/og-image.png", // Create this 1200x630 image
}

// ============================================================
// SOCIAL MEDIA LINKS
// ============================================================
export const socialLinks = {
  facebook: "https://facebook.com/atitrajarata",
  linkedin: "https://www.linkedin.com/company/atit-rajarata-fot/",
  whatsapp: "https://chat.whatsapp.com/HPkiU3iYm1Q7YgKzGNDkIH",
  discord: "https://discord.gg/zjcKZYqxrG",
}

// ============================================================
// PAGE METADATA
// ============================================================
export const pageMetadata = {
  home: {
    title: "ATIT Rajarata - Faculty of Technology | RUSL",
    description:
      "Association of Technology IT - Rajarata University. Explore workshops, hackathons, projects, and connect with tech enthusiasts.",
  },
  about: {
    title: "About Us",
    description:
      "Learn about ATIT Rajarata - our mission, vision, values, and the passionate team driving innovation at the Faculty of Technology, Rajarata University of Sri Lanka.",
  },
  events: {
    title: "Events & Workshops",
    description:
      "Discover upcoming and past ATIT events including tech workshops, hackathons, seminars, and exhibitions. Join our community to learn and grow together.",
  },
  projects: {
    title: "Our Projects",
    description:
      "Explore innovative student projects by ATIT members - from AI and IoT solutions to web applications and mobile apps solving real-world problems.",
  },
  gallery: {
    title: "Gallery",
    description:
      "Browse photos and memories from ATIT events, workshops, hackathons, and community activities at Rajarata University.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with ATIT Rajarata. Reach us via email, visit the Faculty of Technology, or connect on social media. We'd love to hear from you!",
  },
}

// ============================================================
// NAVIGATION STRUCTURE (for sitelinks/breadcrumbs)
// ============================================================
export const siteNavigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
]

// ============================================================
// VERIFICATION CODES (Add when available)
// ============================================================
export const verificationCodes = {
  google: "", // Google Search Console verification code
  bing: "", // Bing Webmaster Tools verification code
  googleAnalytics: "G-2YGCZ3B6XH", // GA4 Measurement ID (G-XXXXXXXXXX)
}
