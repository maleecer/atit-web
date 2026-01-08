"use client"

import { motion } from "framer-motion"

import Link from "next/link"

interface Event {
  id: number
  title: string
  date: string
  category: string
  image: string
  description: string
}

interface EventsPreviewProps {
  events: Event[]
}

export function EventsPreview({ events }: EventsPreviewProps) {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute -top-40 right-0 w-96 h-96 bg-linear-to-bl from-accent/15 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Latest Events</h2>
          <p className="text-muted-foreground text-lg">Join us for exciting workshops, hackathons, and seminars</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-secondary/50 transition-colors group cursor-pointer"
            >
              {/* Event image */}
              <div className="relative h-48 overflow-hidden bg-white">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-sm text-xs font-semibold text-background">
                    {event.category}
                  </div>
                </div>
              </div>

              {/* Event details */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{event.date}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{event.description}</p>
                <Link
                  href={`/events?id=${event.id}`}
                  className="text-sm font-semibold text-secondary hover:text-accent transition-colors flex items-center gap-2 group/link"
                >
                  <motion.span whileHover={{ x: 5 }} className="flex items-center gap-2">
                    Learn More
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/events"
            className="inline-block px-8 py-3 rounded-lg border border-secondary text-secondary font-semibold hover:bg-secondary/10 transition-all hover:scale-105 active:scale-95"
          >
            View All Events
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
