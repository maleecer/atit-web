// Blog posts data for the ATIT website

export interface BlogPost {
  id: number
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content?: string
  author?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Education",
    date: "March 10, 2025",
    category: "AI",
    excerpt:
      "Exploring how artificial intelligence is transforming the educational landscape and what it means for students.",
    image: "/placeholder.svg?key=blog1",
  },
  {
    id: 2,
    title: "Getting Started with IoT Development",
    date: "March 5, 2025",
    category: "IoT",
    excerpt: "A comprehensive guide for beginners to start their journey in Internet of Things development.",
    image: "/placeholder.svg?key=blog2",
  },
  {
    id: 3,
    title: "Web3 Technologies Explained",
    date: "February 28, 2025",
    category: "Web3",
    excerpt: "Understanding the fundamentals of Web3, blockchain, and decentralized applications.",
    image: "/placeholder.svg?key=blog3",
  },
  {
    id: 4,
    title: "Best Practices in Mobile App Development",
    date: "February 20, 2025",
    category: "Mobile",
    excerpt: "Essential tips and tricks for building performant, user-friendly mobile applications.",
    image: "/placeholder.svg?key=blog4",
  },
  {
    id: 5,
    title: "Cloud Computing: Scaling Your Ideas",
    date: "February 15, 2025",
    category: "Cloud",
    excerpt: "How to leverage cloud platforms to scale your applications efficiently and cost-effectively.",
    image: "/placeholder.svg?key=blog5",
  },
  {
    id: 6,
    title: "Cybersecurity Essentials for Developers",
    date: "February 10, 2025",
    category: "Security",
    excerpt: "A guide to implementing security best practices in your development workflow.",
    image: "/placeholder.svg?key=blog6",
  },
]
