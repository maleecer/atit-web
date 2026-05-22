export interface ExtruProject {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  links?: {
    demo?: string;
    github?: string;
    article?: string;
  };
}

export interface GalleryImage {
  id: number;
  src: string;
  caption: string;
  category: string;
}

export interface EventHighlight {
  id: number;
  title: string;
  description: string;
  type: "photo" | "video";
  thumbnail?: string;
}

export interface ExtruEntertainment {
  id: number;
  title: string;
  description: string;
  type: string;
  icon: string;
  link?: string;
}

export const extruData = {
  event: {
    name: "EXTRU 2026",
    tagline: "Faculty of Technology Exhibition",
    dates: "March 6-7, 2026",
    venue: "Faculty of Technology, Rajarata University of Sri Lanka",
    description:
      "EXTRU 2026 was a grand showcase of innovation and technical excellence by the students of the Faculty of Technology. Over two days, we presented groundbreaking projects spanning IoT, AI, Web Development, and more to the university community and visitors.",
    attendees: "2000+",
    projectsCount: 20,
  },
  projects: [
    {
      id: 1004,
      title: "Smart Power Monitoring System",
      description:
        "An IoT-based smart plug solution designed to help users monitor and control electricity usage in real time.",
      image: "/assets/extru/projects/smart_power.jpg",
      tags: ["IoT", "Energy Management", "Sensors"],
      category: "IoT",
      links: {
        article: "https://www.linkedin.com/feed/update/urn:li:activity:7437318382296936448"
      }
    },
  ] as ExtruProject[],
  gallery: [
    {
      id: 1,
      src: "/assets/extru/gallery/extru_ 1.jpg",
      caption: "EXTRU 2026 Opening Ceremony",
      category: "Ceremony",
    },
    {
      id: 2,
      src: "/assets/extru/gallery/extru_ 2.jpg",
      caption: "Students presenting their innovative projects",
      category: "Projects",
    },
    {
      id: 3,
      src: "/assets/extru/gallery/extru_ 3.jpg",
      caption: "Visitors exploring the exhibition halls",
      category: "Visitors",
    },
    {
      id: 4,
      src: "/assets/extru/gallery/extru_4.jpg",
      caption: "Interactive presentation and Q&A session",
      category: "Projects",
    },
    {
      id: 5,
      src: "/assets/extru/gallery/extru_5.jpg",
      caption: "Smart Agriculture System demonstration",
      category: "Projects",
    },
    {
      id: 6,
      src: "/assets/extru/gallery/extru_6.jpg",
      caption: "IoT prototypes and hardware displays",
      category: "Projects",
    },
    {
      id: 7,
      src: "/assets/extru/gallery/extru_ 7.jpg",
      caption: "Distinguished guests touring exhibition stalls",
      category: "Ceremony",
    },
    {
      id: 8,
      src: "/assets/extru/gallery/extru_ 8.jpg",
      caption: "Judges and evaluators reviewing submissions",
      category: "Evaluation",
    },
    {
      id: 9,
      src: "/assets/extru/gallery/extru_ 9.jpg",
      caption: "Team collaboration during the event",
      category: "Team",
    },
    {
      id: 10,
      src: "/assets/extru/gallery/extru_ 10.jpg",
      caption: "Vibrant audience at the presentation arena",
      category: "Activities",
    },
  ] as GalleryImage[],
  highlights: [
    {
      id: 1,
      title: "EXTRU 2026 Official Recap",
      description:
        "Watch the highlights from our amazing 2-day tech exhibition",
      type: "photo",
      thumbnail: "/assets/extru/gallery/extru_ 1.jpg",
    },
    {
      id: 2,
      title: "Best Projects Showcase",
      description: "Top innovative projects that impressed visitors",
      type: "photo",
      thumbnail: "/assets/extru/gallery/extru_ 2.jpg",
    },
  ] as EventHighlight[],
  entertainment: [
    {
      id: 1,
      title: "Esports Gaming Tournament",
      description: "Compete in our high-stakes multiplayer gaming competition. Show your skills and win prizes!",
      type: "Gaming",
      icon: "Gamepad2",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdv9o8oyJQMDq6Jv5njf663b-0-HjwSZ0txFxVU5pW1OiA9OQ/viewform?usp=dialog"
    },
  ] as ExtruEntertainment[],
};
