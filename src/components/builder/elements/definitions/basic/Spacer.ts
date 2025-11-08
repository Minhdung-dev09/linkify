import { Square, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const SpacerDefinition: ElementDefinition = {
  name: 'Spacer',
  icon: Square,
  description: 'Flexible spacing element with responsive options',
  element: {
    type: 'spacer' as const,
    position: { x: 100, y: 100 },
    size: { width: 100, height: 50 },
    props: { 
      backgroundColor: 'transparent',
      height: 50,
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
      responsive: {
        mobile: { height: 30 },
        tablet: { height: 40 }
      }
    }
  }
};

