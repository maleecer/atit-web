// Site configuration and content data
// Contains navigation, hero, features, and about section data

// Navigation data
export const navData = {
  logo: { src: "/assets/atit-logo-rounded.png" },
}

// Hero section data
export const heroData = {
  logo: { src: "/assets/atit-logo.png" },
  title: "Innovate. Create. Transform.",
  subtitle:
    "Join the Association of Technology IT at Rajarata University. Where ideas meet cutting-edge technology.",
  cta: {
    primary: "Explore Us",
    secondary: "Learn More",
  },
}

// Features section data
export interface Feature {
  id: number
  icon: string
  title: string
  description: string
}

export const featuresData: Feature[] = [
  {
    id: 1,
    icon: "🚀",
    title: "Innovation Hub",
    description: "A collaborative space where students develop next-generation tech solutions.",
  },
  {
    id: 2,
    icon: "💡",
    title: "Creative Solutions",
    description: "Tackling real-world problems with intelligent, forward-thinking approaches.",
  },
  {
    id: 3,
    icon: "🤝",
    title: "Community Driven",
    description: "Building a vibrant community of tech enthusiasts and innovators.",
  },
  {
    id: 4,
    icon: "🌟",
    title: "Skill Development",
    description: "Continuous learning and mastery of modern technologies and tools.",
  },
]

// "Who We Are" section data
export interface Stat {
  label: string
  value: string
}

export const whoWeAreData = {
  title: "Who We Are",
  description:
    "ATIT is a student-led innovation hub where researchers, designers, and engineers from the Faculty of Technology collaborate to build human-centered technology. We experiment boldly, prototype rapidly, and deliver solutions that impact the university and beyond.",
  highlights: [
    "Interdisciplinary labs for robotics, AI, and immersive media",
    "Mentorship from alumni and industry partners",
    "Hands-on projects that solve university-scale challenges",
  ],
  faculty: "Faculty of Technology",
  department: "Department of Information and Communication Technology",
  badgeText: "since 2019",
  carouselEyebrow: "",
  carouselTitle: "",
  missionLabel: "mission",
  missionStatement: "Build compassionate technologies that move the Rajarata community forward.",
  carouselImages: [
    "/assets/carousel-1.jpg",
    "/assets/carousel-2.jpg",
    "/assets/carousel-3.jpg",
    "/assets/carousel-4.jpg",
  ],
  stats: [
    { label: "Active Members", value: "300+" },
    { label: "Student Projects", value: "35" },
    { label: "Years of Impact", value: "5" },
  ] as Stat[],
}

// About page data
export interface Value {
  title: string
  description: string
}

export const aboutData = {
  mission:
    "To foster innovation, creativity, and technological excellence at Rajarata University by providing a collaborative platform for students to learn, create, and solve real-world problems.",
  vision:
    "To become the leading tech innovation hub in the region, recognized for groundbreaking projects and community impact.",
  values: [
    { title: "Innovation", description: "Constantly pushing boundaries and exploring new technologies" },
    { title: "Collaboration", description: "Working together to achieve greater results than individually" },
    { title: "Excellence", description: "Striving for the highest quality in all our endeavors" },
    { title: "Integrity", description: "Maintaining ethical standards and transparency in all actions" },
  ] as Value[],
}

// Timeline data for about page
export interface TimelineItem {
  year: string
  title: string
  description: string
}

export const timelineData: TimelineItem[] = [
  {
    year: "2020",
    title: "ATIT Founded",
    description: "The Advanced Tech Innovation Club was established at Rajarata University.",
  },
  {
    year: "2021",
    title: "First Hackathon",
    description: "Organized the inaugural ATIT Hackathon with 50+ participants.",
  },
  {
    year: "2022",
    title: "IoT Project Launched",
    description: "Successfully deployed the Smart Campus IoT system across campus.",
  },
  {
    year: "2023",
    title: "AI Initiative",
    description: "Launched the AI Research and Development initiative.",
  },
  {
    year: "2024",
    title: "100+ Members",
    description: "Reached 100+ active members and expanded to new domains.",
  },
  {
    year: "2025",
    title: "Going Global",
    description: "Established partnerships with international tech organizations.",
  },
]
