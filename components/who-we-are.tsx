"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useEffect, useMemo, useState, useRef } from "react"

import Carousel, { CarouselItem } from "./Carousel"

interface WhoWeAreStat {
    label: string
    value: string
}

interface WhoWeAreData {
    title: string
    description: string
    highlights: string[]
    faculty: string
    department: string
    carouselImages: string[]
    stats: WhoWeAreStat[]
    badgeText?: string
    carouselEyebrow?: string
    carouselTitle?: string
    missionLabel?: string
    missionStatement?: string
}

interface WhoWeAreSectionProps {
    data: WhoWeAreData
}

export function WhoWeAreSection({ data }: WhoWeAreSectionProps) {
    const images = useMemo(() => data.carouselImages.filter(Boolean), [data.carouselImages])
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    const badgeText = data.badgeText ?? "since 2015"
    const carouselEyebrow = data.carouselEyebrow ?? "Exploring tomorrow's ideas"
    const carouselTitle = data.carouselTitle ?? "Immersive Studios"
    const missionLabel = data.missionLabel ?? "mission"
    const missionStatement = data.missionStatement ??
        "Build compassionate technologies that move the Rajarata community forward."

    const carouselItems: CarouselItem[] = useMemo(() => images.map((img, i) => ({
        id: i,
        title: carouselTitle,
        description: carouselEyebrow,
        image: img
    })), [images, carouselTitle, carouselEyebrow])

    if (!data) return null

    return (
        <section id="who-we-are" ref={containerRef} className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-black pointer-events-none" />

            {/* Parallax Background Elements */}
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute -top-20 right-0 w-[500px] h-[500px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none"
            />
            <motion.div
                style={{ y: y2, opacity }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"
            />

            <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs uppercase tracking-[0.3em] text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
                        {badgeText}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-primary/80">{data.faculty}</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-3">{data.title}</h2>

                    </div>

                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                        {data.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.highlights.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                                <p className="text-sm text-gray-300">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                        {data.stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-xl sm:text-3xl font-bold text-white">{stat.value}</p>
                                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        className="pt-6"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/about" className="inline-flex">
                            <motion.span
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-colors hover:border-white/40"
                            >
                                Explore more about us
                                <span aria-hidden className="text-lg">↗</span>
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative h-[350px] sm:h-[500px] w-full flex items-center justify-center">
                        <Carousel
                            items={carouselItems}
                            baseWidth={450}
                            height={300}
                            autoplay={true}
                            autoplayDelay={4000}
                            loop={true}
                            pauseOnHover={true}
                        />

                        {/* Department overlay - hidden on mobile, shown on larger screens */}
                        <div className="hidden sm:block absolute top-0 right-0 px-4 py-3 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 text-right pointer-events-none z-10">
                            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Department</p>
                            <p className="text-base font-semibold text-white">{data.department}</p>
                        </div>
                    </div>
                    {/* Department info for mobile - shown below carousel on small screens */}
                    <div className="sm:hidden text-center mt-4 px-4 py-3 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10">
                        <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Department</p>
                        <p className="text-sm font-semibold text-white">{data.department}</p>
                    </div>

                    <motion.div
                        className="absolute -left-10 -bottom-10 hidden md:flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5 shadow-2xl z-20"

                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-200">{missionLabel}</p>
                        <p className="text-base text-white max-w-[180px]">
                            {missionStatement}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
