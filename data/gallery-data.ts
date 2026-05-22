// Gallery data for the ATIT website
// Contains all gallery images and their metadata

export interface GalleryItem {
  id: number
  image: string
  alt: string
  category?: string
}

export const galleryData: GalleryItem[] = [
  { id: 1, image: "/assets/events/atit-week-1.jpg", alt: "1st ATiT Week Event" },
  { id: 2, image: "/assets/projects/smart-house-project.jpg", alt: "Smart House Project" },
  { id: 3, image: "/assets/events/business-analysis-1.jpg", alt: "Business Analysis Workshop" },
  { id: 4, image: "/assets/projects/arduino-cnc-drawing-machine.jpg", alt: "Arduino CNC Machine" },
  { id: 5, image: "/assets/events/ui-ux-1.jpg", alt: "UI/UX Workshop" },
  { id: 6, image: "/assets/projects/smart-traffic-system.jpg", alt: "Smart Traffic System" },
  { id: 7, image: "/assets/events/cloud-dev-1.jpg", alt: "Cloud Development Programme" },
  { id: 8, image: "/assets/events/atit-week-2.jpg", alt: "Networking Session" },
  { id: 9, image: "/assets/events/business-analysis-2.jpg", alt: "Workshop Discussion" },
  { id: 10, image: "/assets/events/industry-visit-1.jpg", alt: "Industry Visit" },
  { id: 11, image: "/assets/extru/gallery/extru_ 1.jpg", alt: "EXTRU 2026 Opening Ceremony" },
  { id: 12, image: "/assets/extru/gallery/extru_ 2.jpg", alt: "EXTRU 2026 Project Stall Showcase" },
  { id: 13, image: "/assets/extru/gallery/extru_ 3.jpg", alt: "EXTRU 2026 Exhibition Visitors" },
  { id: 14, image: "/assets/extru/gallery/extru_4.jpg", alt: "EXTRU 2026 Q&A and Presentation" },
  { id: 15, image: "/assets/extru/gallery/extru_5.jpg", alt: "EXTRU 2026 Smart Agriculture Demo" },
  { id: 16, image: "/assets/extru/gallery/extru_6.jpg", alt: "EXTRU 2026 IoT and Hardware Showcase" },
  { id: 17, image: "/assets/extru/gallery/extru_ 7.jpg", alt: "EXTRU 2026 VIP Tour and Ceremony" },
  { id: 18, image: "/assets/extru/gallery/extru_ 8.jpg", alt: "EXTRU 2026 Project Evaluation" },
  { id: 19, image: "/assets/extru/gallery/extru_ 9.jpg", alt: "EXTRU 2026 Student Organizing Committee" },
  { id: 20, image: "/assets/extru/gallery/extru_ 10.jpg", alt: "EXTRU 2026 Presentation Audience" },
]

// Carousel images used in the "Who We Are" section
export const carouselImages: string[] = [
  "/assets/carousel-1.jpg",
  "/assets/carousel-2.jpg",
  "/assets/carousel-3.jpg",
  "/assets/carousel-4.jpg",
]
