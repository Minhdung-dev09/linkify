import { Layout, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const SectionDefinition: ElementDefinition = {
  name: 'Section',
  icon: Layout,
  description: 'Full-width page section with advanced layout options',
  element: {
    type: 'section' as const,
    position: { x: 100, y: 100 },
    size: { width: 500, height: 300 },
    props: { 
      backgroundColor: '#ffffff',
      paddingTop: 40,
      paddingRight: 40,
      paddingBottom: 40,
      paddingLeft: 40,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 0,
      borderTopRadius: 0,
      borderBottomRadius: 0,
      borderLeftRadius: 0,
      borderRightRadius: 0,
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
      display: 'block',
      position: 'relative',
      overflow: 'visible',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: 200,
      maxWidth: 1200,
      responsive: {
        mobile: { 
          paddingTop: 24,
          paddingRight: 16,
          paddingBottom: 24,
          paddingLeft: 16,
          minHeight: 150
        },
        tablet: { 
          paddingTop: 32,
          paddingRight: 24,
          paddingBottom: 32,
          paddingLeft: 24,
          minHeight: 175
        }
      }
    }
  }
};

