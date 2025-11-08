import { MousePointer, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const ButtonDefinition: ElementDefinition = {
  name: 'Button',
  icon: MousePointer,
  description: 'Clickable button with link and full customization',
  element: {
    type: 'button' as const,
    position: { x: 100, y: 100 },
    size: { width: 150, height: 48 },
    props: { 
      text: 'Click Me',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 'medium',
      textAlign: 'center',
      paddingTop: 12,
      paddingRight: 24,
      paddingBottom: 12,
      paddingLeft: 24,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopRadius: 8,
      borderBottomRadius: 8,
      borderLeftRadius: 8,
      borderRightRadius: 8,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: 'rgba(59, 130, 246, 0.3)',
      hoverBackgroundColor: '#2563eb',
      hoverColor: '#ffffff',
      hoverTransform: 'translateY(-1px)',
      hoverShadowX: 0,
      hoverShadowY: 4,
      hoverShadowBlur: 8,
      hoverShadowColor: 'rgba(59, 130, 246, 0.4)',
      linkUrl: '',
      linkTarget: '_self',
      linkRel: 'noopener noreferrer',
      responsive: {
        mobile: { fontSize: 14, paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20 },
        tablet: { fontSize: 15, paddingTop: 11, paddingRight: 22, paddingBottom: 11, paddingLeft: 22 }
      }
    }
  }
};

export const CTAButtonDefinition: ElementDefinition = {
  name: 'Call-to-Action Button',
  icon: MousePointer,
  description: 'CTA button with external link',
  element: {
    type: 'button' as const,
    position: { x: 100, y: 100 },
    size: { width: 180, height: 52 },
    props: { 
      text: 'Get Started Now',
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 14,
      paddingRight: 28,
      paddingBottom: 14,
      paddingLeft: 28,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopRadius: 12,
      borderBottomRadius: 12,
      borderLeftRadius: 12,
      borderRightRadius: 12,
      shadowX: 0,
      shadowY: 4,
      shadowBlur: 8,
      shadowColor: 'rgba(16, 185, 129, 0.3)',
      hoverBackgroundColor: '#059669',
      hoverColor: '#ffffff',
      hoverTransform: 'translateY(-2px)',
      hoverShadowX: 0,
      hoverShadowY: 6,
      hoverShadowBlur: 12,
      hoverShadowColor: 'rgba(16, 185, 129, 0.4)',
      linkUrl: 'https://example.com',
      linkTarget: '_blank',
      linkRel: 'noopener noreferrer',
      responsive: {
        mobile: { fontSize: 14, paddingTop: 12, paddingRight: 24, paddingBottom: 12, paddingLeft: 24 },
        tablet: { fontSize: 15, paddingTop: 13, paddingRight: 26, paddingBottom: 13, paddingLeft: 26 }
      }
    }
  }
};

export const ContactButtonDefinition: ElementDefinition = {
  name: 'Contact Button',
  icon: MousePointer,
  description: 'Contact button with mailto link',
  element: {
    type: 'button' as const,
    position: { x: 100, y: 100 },
    size: { width: 140, height: 44 },
    props: { 
      text: 'Contact Us',
      backgroundColor: '#6366f1',
      color: '#ffffff',
      borderRadius: 6,
      fontSize: 15,
      fontWeight: 'medium',
      textAlign: 'center',
      paddingTop: 12,
      paddingRight: 20,
      paddingBottom: 12,
      paddingLeft: 20,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopRadius: 6,
      borderBottomRadius: 6,
      borderLeftRadius: 6,
      borderRightRadius: 6,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: 'rgba(99, 102, 241, 0.3)',
      hoverBackgroundColor: '#4f46e5',
      hoverColor: '#ffffff',
      hoverTransform: 'translateY(-1px)',
      hoverShadowX: 0,
      hoverShadowY: 4,
      hoverShadowBlur: 8,
      hoverShadowColor: 'rgba(99, 102, 241, 0.4)',
      linkUrl: 'mailto:contact@example.com',
      linkTarget: '_self',
      linkRel: 'noopener noreferrer',
      responsive: {
        mobile: { fontSize: 13, paddingTop: 10, paddingRight: 18, paddingBottom: 10, paddingLeft: 18 },
        tablet: { fontSize: 14, paddingTop: 11, paddingRight: 19, paddingBottom: 11, paddingLeft: 19 }
      }
    }
  }
};

export const WhatsAppButtonDefinition: ElementDefinition = {
  name: 'WhatsApp Button',
  icon: MousePointer,
  description: 'WhatsApp contact button',
  element: {
    type: 'button' as const,
    position: { x: 100, y: 100 },
    size: { width: 160, height: 48 },
    props: { 
      text: 'WhatsApp',
      backgroundColor: '#25d366',
      color: '#ffffff',
      borderRadius: 8,
      fontSize: 15,
      fontWeight: 'medium',
      textAlign: 'center',
      paddingTop: 12,
      paddingRight: 24,
      paddingBottom: 12,
      paddingLeft: 24,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderTopRadius: 8,
      borderBottomRadius: 8,
      borderLeftRadius: 8,
      borderRightRadius: 8,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: 'rgba(37, 211, 102, 0.3)',
      hoverBackgroundColor: '#1da851',
      hoverColor: '#ffffff',
      hoverTransform: 'translateY(-1px)',
      hoverShadowX: 0,
      hoverShadowY: 4,
      hoverShadowBlur: 8,
      hoverShadowColor: 'rgba(37, 211, 102, 0.4)',
      linkUrl: 'https://wa.me/1234567890',
      linkTarget: '_blank',
      linkRel: 'noopener noreferrer',
      responsive: {
        mobile: { fontSize: 13, paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20 },
        tablet: { fontSize: 14, paddingTop: 11, paddingRight: 22, paddingBottom: 11, paddingLeft: 22 }
      }
    }
  }
};

