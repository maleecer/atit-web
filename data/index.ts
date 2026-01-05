// Central data exports for the ATIT website
// Import from this file for clean, organized data access

// Projects
export { projectsData } from "./projects-data"
export type { Project, ProjectLink } from "./projects-data"

// Events
export { eventsData } from "./events-data"
export type { Event } from "./events-data"

// Gallery
export { galleryData, carouselImages } from "./gallery-data"
export type { GalleryItem } from "./gallery-data"

// Team
export { teamMembersData } from "./team-data"

// Site configuration (navigation, hero, features, about)
export { navData, heroData, featuresData, whoWeAreData, aboutData, timelineData } from "./site-data"
export type { Feature, Stat, Value, TimelineItem } from "./site-data"

// Blog
export { blogPosts } from "./blog-data"
export type { BlogPost } from "./blog-data"

// Legacy exports for backward compatibility
// These re-export data that was previously in home-data.ts
export { teamMembersData as teamData } from "./team-data"
