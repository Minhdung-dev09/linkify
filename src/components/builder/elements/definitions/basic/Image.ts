import { Image as ImageIcon, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const ImageDefinition: ElementDefinition = {
  name: 'Image',
  icon: ImageIcon,
  description: 'Image with advanced styling and optimization options',
  element: {
    type: 'image' as const,
    position: { x: 100, y: 100 },
    size: { width: 300, height: 200 },
    props: { 
      src: '/placeholder-image.jpg',
      alt: 'Image description',
      objectFit: 'cover',
      borderRadius: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopRadius: 0,
      borderBottomRadius: 0,
      borderLeftRadius: 0,
      borderRightRadius: 0,
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      linkUrl: '',
      linkTarget: '_self',
      linkRel: 'noopener noreferrer',
      lazy: true,
      responsive: {
        mobile: { width: '100%', height: 'auto' },
        tablet: { width: '100%', height: 'auto' }
      }
    }
  }
};

