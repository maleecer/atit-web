import { Navigation } from "@/components/navigation"
import { ExtruBackground } from "@/components/extru/extru-background"
import { ExtruHero } from "@/components/extru/extru-hero"
import { ExtruProjects } from "@/components/extru/extru-projects"
import { ExtruGallery } from "@/components/extru/extru-gallery"
import { ContactSummary } from "@/components/contact-summary"
import { extruData } from "@/data/extru-data"

export default function ExtruPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-emerald-500/30 selection:text-white">
      {/* Background layer */}
      <ExtruBackground />

      {/* Universal Site Navigation */}
      <Navigation />

      {/* Hero Section - Past Event Recap */}
      <ExtruHero eventData={extruData.event} />

      {/* Projects Showcased */}
      <ExtruProjects />

      {/* Event Gallery & Highlights */}
      <ExtruGallery images={extruData.gallery} highlights={extruData.highlights} />

      {/* CTA Footer Wrapper */}
      <div className="border-t border-white/5 mt-12 bg-black/40 backdrop-blur-md relative z-10">
        <ContactSummary />
      </div>
    </main>
  )
}