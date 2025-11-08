import { Grid, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const ContainerDefinition: ElementDefinition = {
  name: 'Container',
  icon: Grid,
  description: 'Flexible layout container with advanced styling',
  element: {
    type: 'container' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 250 },
    props: { 
      backgroundColor: '#f8f9fa',
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      borderTopRadius: 8,
      borderBottomRadius: 8,
      borderLeftRadius: 8,
      borderRightRadius: 8,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      display: 'block',
      position: 'relative',
      overflow: 'visible',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      responsive: {
        mobile: { paddingTop: 16, paddingRight: 16, paddingBottom: 16, paddingLeft: 16 },
        tablet: { paddingTop: 18, paddingRight: 18, paddingBottom: 18, paddingLeft: 18 }
      }
    }
  }
};

