// Projects data for the ATIT website
// Contains all project information including details shown in project modal

export interface ProjectLink {
  demo?: string
  github?: string
}

export interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: string[]
  fullDescription?: string
  features?: string[]
  technologies?: string[]
  team?: string[]
  gallery?: string[]
  links?: ProjectLink
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Smart House Automation System",
    category: "Arduino",
    description:
      "Home automation system that integrates IoT devices to control lighting, temperature, and security. Features energy-efficient algorithms and remote access via mobile app.",
    image: "/assets/projects/smart-house-project.jpg",
    tags: ["Arduino", "IoT", "Real-time Data"],
    fullDescription:
      "The Smart Campus IoT System is a comprehensive solution designed to monitor and optimize campus resources in real-time. Using a network of Arduino-based sensors, the system collects data on energy consumption, occupancy levels, environmental conditions, and more. The data is processed and visualized through an intuitive dashboard, enabling facility managers to make data-driven decisions.",
    features: [
      "Real-time sensor data collection and monitoring",
      "Interactive dashboard with analytics",
      "Automated alerts and notifications",
      "Energy consumption optimization",
      "Historical data analysis and reporting",
    ],
    technologies: ["Arduino", "Node.js", "MongoDB", "React", "MQTT", "InfluxDB"],
    team: ["Vikum Kalhara"],
    gallery: ["/assets/projects/smart-house-project.jpg"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: 2,
    title: "Automated Trafic Light System",
    category: "Arduino",
    description: "A traffic light system that uses sensors to detect the number of vehicles and adjusts the traffic light timing accordingly.",
    image: "/assets/projects/smart-traffic-system.jpg",
    tags: ["Arduino", "IoT", "Real-time Data"],
    fullDescription:
      "The Automated Traffic Light System is a smart traffic management solution that uses sensors to detect the number of vehicles and adjusts the traffic light timing accordingly. The system uses an Arduino-based controller to monitor traffic flow and adjust the timing of traffic lights in real-time. The system also includes a mobile app that allows users to monitor traffic conditions and receive real-time updates.",
    features: [
      "Real-time sensor data collection and monitoring",
      "Interactive dashboard with analytics",
      "Automated alerts and notifications",
      "Energy consumption optimization",
      "Historical data analysis and reporting",
    ],
    technologies: ["Arduino", "IoT", "Real-time Data"],
    team: ["Pasindu Sachintha"],
    gallery: ["/assets/projects/smart-traffic-system.jpg"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: 3,
    title: "Arduino CNC Drawing Machine",
    category: "Arduino",
    description: "A low-cost, Arduino-based CNC drawing machine that automatically draws images, patterns, and text on paper with high accuracy.",
    image: "/assets/projects/arduino-cnc-drawing-machine.jpg",
    tags: ["Arduino", "CNC", "Drawing Machine"],
    fullDescription:
      "The Arduino CNC Drawing Machine is a low-cost, Arduino-based CNC drawing machine that automatically draws images, patterns, and text on paper with high accuracy. The machine uses stepper motors and servo motors to control the movement of the pen and draw the desired image or pattern. The machine is easy to use and can be operated by a single person.",
    features: [
      "Low-cost, Arduino-based CNC drawing machine",
      "Automatically draws images, patterns, and text on paper with high accuracy",
      "Stepper motors and servo motors to control the movement of the pen",
      "Easy to use and can be operated by a single person",
    ],
    technologies: ["Arduino", "CNC", "Drawing Machine"],
    team: ["Pasindu Sachintha"],
    gallery: ["/assets/projects/arduino-cnc-drawing-machine.jpg"],
    links: {
      demo: "#",
      github: "#",
    },
  },
]
