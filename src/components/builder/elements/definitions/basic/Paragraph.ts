import { AlignLeft, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const ParagraphDefinition: ElementDefinition = {
  name: 'Paragraph',
  icon: AlignLeft,
  description: 'Body text content with rich formatting options',
  element: {
    type: 'paragraph' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 120 },
    props: { 
      text: 'This is a paragraph of text that can be edited and styled with various formatting options.',
      fontSize: 16,
      color: '#666666',
      lineHeight: 1.6,
      textAlign: 'left',
      fontWeight: 'normal',
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
        mobile: { fontSize: 14, lineHeight: 1.7 },
        tablet: { fontSize: 15, lineHeight: 1.65 }
      }
    }
  }
};

