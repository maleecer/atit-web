"use client"

import { motion } from "framer-motion"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio?: string
  social?: {
    linkedin?: string
  }
}

interface TeamSectionProps {
  members: TeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient elements */}
      <div
        className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-accent/20 to-transparent rounded-bl-full pointer-events-none"
      // The original motion.div had animate and transition props, but the instruction replaces it with a plain div.
      // Keeping the original motion props commented out if they were intended to be moved or applied differently.
      // animate={{ y: [-20, 20, -20] }}
      // transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
      <div
        className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-accent/10 to-transparent rounded-tr-full pointer-events-none"
      // The original motion.div had animate and transition props, but the instruction replaces it with a plain div.
      // Keeping the original motion props commented out if they were intended to be moved or applied differently.
      // animate={{ y: [20, -20, 20] }}
      // transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet Our Leadership</h2>
          <p className="text-muted-foreground text-lg">Meet the visionary minds driving ATIT forward</p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-secondary/50 transition-all h-full flex flex-col backdrop-blur-sm">
                {/* Member image container */}
                <div className="relative h-56 overflow-hidden bg-linear-to-br from-secondary/20 to-primary/20">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-br from-transparent via-background/20 to-background/90 transition-all duration-500 group-hover:via-accent/5 group-hover:to-accent/20" />
                </div>

                {/* Member info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="h-0.5 w-8 bg-linear-to-r from-accent to-transparent rounded-full group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-secondary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-secondary mb-3">{member.role}</p>

                  {/* Social icons - conditionally rendered */}
                  {member.social?.linkedin && (
                    <div className="flex gap-3 mt-auto pt-4 border-t border-border/30">
                      {member.social?.linkedin && (
                        <motion.a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        {/* <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">Want to join our leadership team?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-linear-to-r from-secondary to-primary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/40 transition-shadow"
          >
            Apply Now
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  )
}
