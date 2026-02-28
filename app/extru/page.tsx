import { Navigation } from "@/components/navigation"
import { ExtruBackground } from "@/components/extru/extru-background"
import { ExtruHero } from "@/components/extru/extru-hero"
import { ExtruProjects } from "@/components/extru/extru-projects"
import { ExtruEntertainment } from "@/components/extru/extru-entertainment"
import { ExtruFloorPlan } from "@/components/extru/extru-floor-plan"
import { ContactSummary } from "@/components/contact-summary"

export default function ExtruPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-emerald-500/30 selection:text-white">
      {/* Background layer */}
      <ExtruBackground />
      
      {/* Universal Site Navigation */}
      <Navigation />

      {/* Hero Section with countdown and ATiT + EXTRU branding */}
      <ExtruHero />
      
      {/* Interactive 3D Map Placeholder */}
      <ExtruFloorPlan />

      {/* Projects Showcase */}
      <ExtruProjects />

      {/* Entertainment / Gaming */}
      <ExtruEntertainment />

      {/* CTA Footer Wrapper - Reusing ContactSummary since users may want to contact ATiT */}
      <div className="border-t border-white/5 mt-12 bg-black/40 backdrop-blur-md relative z-10">
        <ContactSummary />
      </div>
    </main>
  )
}
