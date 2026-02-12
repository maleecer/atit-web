"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"
import { aboutData, timelineData, teamMembersData } from "@/data"

// Note: For client components, metadata is handled via generateMetadata in a separate file
// or through the parent layout. The page-specific SEO is configured in lib/seo-config.ts

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground />
      <Navigation />

      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6"
            >
              Our Story
            </motion.span>
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-foreground tracking-tight">About ATIT</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pioneering innovation and excellence at Rajarata University since 2017
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative bg-card border border-border rounded-2xl p-10 h-full hover:border-foreground/20 transition-all">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                  Mission
                </span>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">{aboutData.mission}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative bg-card border border-border rounded-2xl p-10 h-full hover:border-foreground/20 transition-all">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                  Vision
                </span>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">{aboutData.vision}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-4xl font-bold text-foreground">Our Core Values</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-xl p-6 group cursor-pointer hover:border-foreground/20 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground transition-colors">
                  <span className="text-xl font-bold text-muted-foreground group-hover:text-background transition-colors font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/*  <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Milestones
            </span>
            <h2 className="text-4xl font-bold text-foreground">Our Journey</h2>
          </motion.div>

          <div className="relative">
           
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-20"
                >
                
                  <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-foreground border-4 border-background" />

                  <div className="bg-card border border-border rounded-xl p-6 hover:border-foreground/20 transition-colors">
                    <span className="text-sm font-bold text-foreground">{item.year}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              The People
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals driving ATIT forward with innovation and dedication
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembersData.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{member.bio}</p>

                    {/* Social Links */}
                    <div className="flex gap-2">
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
