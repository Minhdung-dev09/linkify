import { Video, Volume2, Image as ImageIcon, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const VideoPlayerDefinition: ElementDefinition = {
  name: 'Video Player',
  icon: Video,
  description: 'Embedded video player',
  element: {
    type: 'video-player' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 225 },
    props: {
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'Video Title',
      autoplay: false,
      controls: true,
      backgroundColor: '#000000'
    }
  }
};

export const AudioPlayerDefinition: ElementDefinition = {
  name: 'Audio Player',
  icon: Volume2,
  description: 'Audio player',
  element: {
    type: 'audio-player' as const,
    position: { x: 100, y: 100 },
    size: { width: 350, height: 60 },
    props: {
      src: '/audio/sample.mp3',
      title: 'Audio Title',
      autoplay: false,
      controls: true,
      backgroundColor: '#f8f9fa'
    }
  }
};

export const ImageGalleryDefinition: ElementDefinition = {
  name: 'Image Gallery',
  icon: ImageIcon,
  description: 'Photo gallery with lightbox',
  element: {
    type: 'image-gallery' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 300 },
    props: {
      images: [
        { src: '/placeholder-image.jpg', alt: 'Gallery 1' },
        { src: '/placeholder-image.jpg', alt: 'Gallery 2' },
        { src: '/placeholder-image.jpg', alt: 'Gallery 3' }
      ],
      columns: 3,
      lightbox: true,
      showCaptions: true
    }
  }
};

export const CarouselDefinition: ElementDefinition = {
  name: 'Carousel',
  icon: ImageIcon,
  description: 'Image carousel slider',
  element: {
    type: 'carousel' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 250 },
    props: {
      images: [
        { src: '/placeholder-image.jpg', alt: 'Slide 1' },
        { src: '/placeholder-image.jpg', alt: 'Slide 2' },
        { src: '/placeholder-image.jpg', alt: 'Slide 3' }
      ],
      autoplay: true,
      showDots: true,
      showArrows: true,
      interval: 3000
    }
  }
};

