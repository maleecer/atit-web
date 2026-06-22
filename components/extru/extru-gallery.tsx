"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Camera, Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
  category: string;
}

interface EventHighlight {
  id: number;
  title: string;
  description: string;
  type: "photo" | "video";
  thumbnail?: string;
}

interface ExtruGalleryProps {
  images: GalleryImage[];
  highlights: EventHighlight[];
}

export function ExtruGallery({ images, highlights }: ExtruGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    const swipeThreshold = 50;
    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400 mb-4 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5" />
            Gallery
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
            Event Highlights
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Relive the best moments from EXTRU 2026 through our photo gallery
            and video highlights.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mb-12 sm:mb-16">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-video rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[10px] sm:text-xs text-white/90 line-clamp-2">
                  {image.caption}
                </p>
              </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/20">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-[360px] mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
            Video Highlight
          </h3>
          <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 p-2">
            <div className="relative w-full h-0 pb-[177.7778%] overflow-hidden rounded-xl bg-black">
              <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7437225640572973056?collapsed=1" height="876" width="504" title="Embedded post"></iframe>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href="https://www.linkedin.com/feed/update/urn:li:activity:7437318382296936448"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Watch on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 touch-pan-y"
          onClick={() => setSelectedImage(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 flex"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <motion.div
            key={selectedImage.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-[85vh] sm:max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg mx-auto pointer-events-none"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <p className="text-white text-center text-sm sm:text-base">
                {selectedImage.caption}
              </p>
              <span className="text-[10px] sm:text-xs text-white/60 text-center block mt-1">
                {selectedImage.category}
              </span>
            </div>
          </motion.div>

          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 flex"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
