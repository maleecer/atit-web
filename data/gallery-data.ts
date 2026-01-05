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
]

// Carousel images used in the "Who We Are" section
export const carouselImages: string[] = [
  "/assets/carousel-1.jpg",
  "/assets/carousel-2.jpg",
  "/assets/carousel-3.jpg",
  "/assets/carousel-4.jpg",
]
