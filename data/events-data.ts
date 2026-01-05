// Events data for the ATIT website
// Contains all event information including details shown in event modal

export type EventStatus = 'upcoming' | 'open' | 'closed' | 'past'

export interface Event {
  id: number
  title: string
  date: string
  category: string
  image: string
  description: string
  status: EventStatus
  fullDescription?: string
  venue?: string
  time?: string
  organizer?: string
  highlights?: string[]
  gallery?: string[]
  registrationLink?: string
}

export const eventsData: Event[] = [
  {
    id: 1,
    title: "ATiT Week",
    date: "January, 2026",
    category: "Event",
    image: "/assets/events/atit-week-banner.png",
    description: "The ATiT Week is a series of IT-focused events organized by the Association of Technology IT (ATiT).",
    status: "upcoming",
    fullDescription:
      "ATiT Week is our flagship annual celebration that brings together the entire technology community at Rajarata University. This week-long extravaganza features project exhibitions, technical workshops, hackathons, guest lectures from industry experts, and networking sessions. Students get the opportunity to showcase their innovative projects, compete in coding challenges, and connect with potential employers and mentors.",
    venue: "Faculty of Technology, Rajarata University",
    time: "Announcing Soon",
    organizer: "ATiT Executive Committee",
    highlights: [
      "Hackathon with exciting prizes",
      "Industry expert guest lectures and panels",
      "Technical workshops on emerging technologies",
      "Networking sessions with alumni and recruiters",
      "Competetive Gaming and Entertainment",
    ],
    gallery: [
      "/assets/events/atit-week-1.jpg",
      "/assets/events/atit-week-2.jpg",
    ],
  },
  {
    id: 2,
    title: "Extru 2026",
    date: "March, 2026",
    category: "Exhibition",
    image: "/assets/events/extru-1.jpeg",
    description: "Extru 2026 is the flagship exhibition of Faculty of Technology, Rajarata University.",
    status: "upcoming",
    fullDescription:
      "EXTRU (Exhibition of Technology at Rajarata University) is the premier technology exhibition organized by the Faculty of Technology. This grand event showcases cutting-edge student projects, research innovations, and technological breakthroughs developed by our talented students. Visitors from across the country including industry professionals, academics, and prospective students come to witness the future of technology.",
    venue: "Faculty of Technology Rajarata University",
    time: "Announcing Soon",
    organizer: "Students' Union, Faculty of Technology",
    highlights: [
      "100+ innovative student projects on display",
      "Live demonstrations of AI and IoT solutions",
      "Interactive robotics showcase",
      "Virtual and Augmented Reality experiences",
      "Startup pitching competition",
      "Industry partnership announcements",
    ],
    gallery: [
      "/assets/events/extru-1.jpeg",
      "/assets/events/extru-2.jpg",
      "/assets/events/extru-3.jpg",
      "/assets/events/extru-4.jpg",
    ],
  },
  {
    id: 3,
    title: "Industry Visit and Soft Skills Development Programme",
    date: "October, 2026",
    category: "workshops",
    image: "/assets/events/industry-visit-1.jpg",
    description: "Industry Visit and Soft Skills Development Programme is a workshop organized by ATiT Executive Committee.",
    status: "past",
    fullDescription:
      "Department of ICT and the Association of Technology IT( ATiT ) successfully organized an Industry Visit and Soft Skills Development Programme in collaboration with SLASSCOM.The event, coordinated by Mr. Wiraj Wickramaarachchi, Senior Lecturer in the Department of ICT, gave students a valuable chance to experience the working world by visiting two top tech companies in Sri Lanka Virtusa (Pvt) Ltd and Cloud Solution (Pvt) Ltd ",
    venue: "Faculty of Technology Rajarata University",
    time: "Announcing Soon",
    organizer: "Students' Union, Faculty of Technology",
    highlights: [
      "Collaboration with SLASSCOM for industry exposure",
      "Visits to Virtusa (Pvt) Ltd and Cloud Solution (Pvt) Ltd",
      "Soft skills development sessions for career readiness",
      "Real-world insights into the tech industry working environment",
    ],
    gallery: [
      "/assets/events/industry-visit-1.jpg",
      "/assets/events/industry-visit-2.jpg",
      "/assets/events/industry-visit-3.jpg",
      "/assets/events/industry-visit-4.jpg",
    ],
  },
  {
    id: 4,
    title: "Career Path Selection Programme – UI/UX Design",
    date: "July, 2026",
    category: "workshops",
    image: "/assets/events/ui-ux-1.jpg",
    description: "Career Path Selection Programme on UI/UX Design",
    status: "past",
    fullDescription:
      "Career Path Selection Programme on UI/UX Design, organized by the ATIT Association.Experience that brought the world of UI/UX Design to life. The session offered a deep dive into design thinking and user-centered approaches, helping participants understand how to create powerful and meaningful digital experiences. Interactive, engaging, and rich with creativity, the session opened new perspectives for aspiring designers and innovators.",
    venue: "Faculty of Technology Rajarata University",
    time: "Completed",
    organizer: "ATIT Association, Dept. of ICT",
    highlights: [
      "Deep dive into design thinking",
      "User-centered design approaches",
      "Creating meaningful digital experiences",
      "Inspiring perspectives for aspiring designers",
    ],
    gallery: [
      "/assets/events/ui-ux-1.jpg",
      "/assets/events/ui-ux-2.jpg",
      "/assets/events/ui-ux-3.jpg",
    ],
  },
  {
    id: 5,
    title: "Career Path Selection Programme – Business Analysis workshop",
    date: "July, 2026",
    category: "workshops",
    image: "/assets/events/business-analysis-1.jpg",
    description: "Career Path Selection Programme on UI/UX Design",
    status: "past",
    fullDescription:
      "session offered a discover career paths in business analysis ,learn from a seasoned industry professional, gain insights into agile and scrum methodologies , network with like-mindes peers",
    venue: "Faculty of Technology Rajarata University",
    time: "Completed",
    organizer: "ATIT Association, Dept. of ICT",
    highlights: [
      "Discover career paths in business analysis",
      "Learn from a seasoned industry professional",
      "Gain insights into agile and scrum methodologies",
      "Network with like-minded peers",
    ],
    gallery: [
      "/assets/events/business-analysis-1.jpg",
      "/assets/events/business-analysis-2.jpg",
      "/assets/events/business-analysis-3.jpg",
    ],
  },
  {
    id: 6,
    title: "Career Path Selection Programme – Cloud Development",
    date: "June, 2026",
    category: "workshops",
    image: "/assets/events/cloud-dev-1.jpg",
    description: "Career Path Selection Programme on Cloud Development",
    status: "past",
    fullDescription:
      "session offered a discover career paths in cloud development ,learn about career opportunities, network with like-minded peers, gain insights into cloud development methodologies, and learn from a seasoned industry professional.",
    venue: "Faculty of Technology Rajarata University",
    time: "Completed",
    organizer: "ATIT Association, Dept. of ICT",
    highlights: [
      "Discover career paths in cloud development",
      "Learn from a seasoned industry professional", 
    ],
    gallery: [
      "/assets/events/cloud-dev-0.jpg",
      "/assets/events/cloud-dev-1.jpg",
      "/assets/events/cloud-dev-2.jpg",
    ],
  },
]
