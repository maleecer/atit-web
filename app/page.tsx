import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { EventsPreview } from "@/components/events-preview"
import { ProjectsPreview } from "@/components/projects-preview"
import { ContactSummary } from "@/components/contact-summary"
import { WhoWeAreSection } from "@/components/who-we-are"
import { heroData, featuresData, eventsData, projectsData, teamData, whoWeAreData, navData } from "@/data"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation logo={navData.logo} />
      <HeroSection title={heroData.title} subtitle={heroData.subtitle} cta={heroData.cta} logo={heroData.logo} />
      <WhoWeAreSection data={whoWeAreData} />
      <EventsPreview events={eventsData.slice(0, 3)} />
      <ProjectsPreview projects={projectsData} />
      <ContactSummary />
    </main>
  )
}
