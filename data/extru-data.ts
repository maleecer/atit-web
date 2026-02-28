export interface ExtruProject {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
}

export interface ExtruEntertainment {
  id: number
  title: string
  description: string
  type: string
  icon: string
}

export const extruData = {
  event: {
    name: "EXTRU 2026",
    tagline: "ATiT is Ready for the Ultimate Tech Exhibition",
    dates: "March 6-7, 2026",
    venue: "Faculty of Technology, Rajarata University of Sri Lanka",
    description: "Join us at EXTRU 2026 as ATiT showcases groundbreaking innovations, interactive entertainment, and cutting-edge technology.",
  },
  projects: [] as ExtruProject[], // Empty for now, showing "coming soon" in UI
  entertainment: [
    {
      id: 1,
      title: "Esports Gaming Tournament",
      description: "Compete in our high-stakes multiplayer gaming competition. Show your skills and win prizes!",
      type: "Gaming",
      icon: "Gamepad2",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdv9o8oyJQMDq6Jv5njf663b-0-HjwSZ0txFxVU5pW1OiA9OQ/viewform?usp=dialog" // To be added by user data
    },
  ] as ExtruEntertainment[],
}
