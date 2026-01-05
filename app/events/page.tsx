"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"
import { eventsData } from "@/data"
import { EventDetailModal, type EventDetail } from "@/components/event-detail-modal"

type EventCategory = "All" | "Workshop" | "Competition" | "Seminar" | "Event" | "Exhibition"

function EventsContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All")
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const eventId = searchParams.get("id")
    if (eventId) {
      const event = eventsData.find((e) => e.id === Number(eventId))
      if (event) {
        setSelectedEvent(event as EventDetail)
        setIsModalOpen(true)
      }
    }
  }, [searchParams])

  const categories: EventCategory[] = ["All", "Event", "Exhibition", "Workshop", "Competition", "Seminar"]

  const filteredEvents =
    selectedCategory === "All" ? eventsData : eventsData.filter((event) => event.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const handleEventClick = (event: EventDetail) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  return (
    <>
      {/* Hero section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            What's Happening
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-bold mb-6 text-foreground tracking-tight"
          >
            Events & Workshops
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our upcoming and past events designed to inspire, educate, and innovate
          </motion.p>
        </div>
      </section>

      {/* Filter buttons */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${selectedCategory === category
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onClick={() => handleEventClick(event as EventDetail)}
                  className="rounded-2xl overflow-hidden bg-card border border-border hover:border-foreground/20 transition-all group cursor-pointer h-full flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden bg-white">
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-full bg-foreground/90 backdrop-blur-sm text-xs font-semibold text-background">
                        {event.category}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-foreground/80 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium mb-3">{event.date}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{event.description}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="mt-4 text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
                    >
                      View Details
                      <span className="text-lg">→</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No events found in this category.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Event detail modal */}
      <EventDetailModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground />
      <Navigation />
      <Suspense fallback={<div className="pt-32 text-center text-muted-foreground">Loading events...</div>}>
        <EventsContent />
      </Suspense>
    </main>
  )
}
