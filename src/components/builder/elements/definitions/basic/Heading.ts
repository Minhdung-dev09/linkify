import { Heading1, Heading2, Heading3, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const Heading1Definition: ElementDefinition = {
  name: 'Heading 1',
  icon: Heading1,
  description: 'Large heading text with full styling options',
  element: {
    type: 'heading' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 80 },
    props: { 
      text: 'Heading 1',
      fontSize: 32,
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 0,
      textDecoration: 'none',
      fontFamily: 'Inter, sans-serif',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 16,
      marginLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 0,
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
      backgroundColor: 'transparent',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      responsive: {
        mobile: { fontSize: 28, lineHeight: 1.3 },
        tablet: { fontSize: 30, lineHeight: 1.25 }
      }
    }
  }
};

export const Heading2Definition: ElementDefinition = {
  name: 'Heading 2',
  icon: Heading2,
  description: 'Medium heading text with full styling options',
  element: {
    type: 'heading' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 60 },
    props: { 
      text: 'Heading 2',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.3,
      letterSpacing: 0,
      textDecoration: 'none',
      fontFamily: 'Inter, sans-serif',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 12,
      marginLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 0,
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
      backgroundColor: 'transparent',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      responsive: {
        mobile: { fontSize: 20, lineHeight: 1.4 },
        tablet: { fontSize: 22, lineHeight: 1.35 }
      }
    }
  }
};

export const Heading3Definition: ElementDefinition = {
  name: 'Heading 3',
  icon: Heading3,
  description: 'Small heading text with full styling options',
  element: {
    type: 'heading' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 50 },
    props: { 
      text: 'Heading 3',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.4,
      letterSpacing: 0,
      textDecoration: 'none',
      fontFamily: 'Inter, sans-serif',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 8,
      marginLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 0,
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 0,
      shadowColor: 'transparent',
      backgroundColor: 'transparent',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      responsive: {
        mobile: { fontSize: 18, lineHeight: 1.5 },
        tablet: { fontSize: 19, lineHeight: 1.45 }
      }
    }
  }
};

