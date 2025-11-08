import { Grid, Layout as LayoutIcon, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const ContainerAdvancedDefinition: ElementDefinition = {
  name: 'Container',
  icon: Grid,
  description: 'Flexible layout container',
  element: {
    type: 'container' as const,
    position: { x: 100, y: 100 },
    size: { width: 300, height: 200 },
    props: { 
      backgroundColor: '#f8f9fa',
      padding: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e5e7eb'
    }
  }
};

export const SectionAdvancedDefinition: ElementDefinition = {
  name: 'Section',
  icon: LayoutIcon,
  description: 'Full-width page section',
  element: {
    type: 'section' as const,
    position: { x: 100, y: 100 },
    size: { width: 500, height: 300 },
    props: { 
      backgroundColor: '#ffffff',
      padding: 40,
      minHeight: 200
    }
  }
};

export const HeaderDefinition: ElementDefinition = {
  name: 'Header',
  icon: LayoutIcon,
  description: 'Professional navigation header with full customization',
  element: {
    type: 'header' as const,
    position: { x: 100, y: 100 },
    size: { width: 800, height: 80 },
    props: {
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
      logoText: 'Your Logo',
      logoImageUrl: '',
      logoWidth: 120,
      logoHeight: 40,
      logoPosition: 'left',
      logoLink: '',
      logoLinkTarget: '_self',
      navItems: [
        { label: 'Home', link: '#home', target: '_self' },
        { label: 'About', link: '#about', target: '_self' },
        { label: 'Contact', link: '#contact', target: '_self' }
      ],
      navFontSize: 16,
      navFontWeight: 'medium',
      navColor: '#ffffff',
      navHoverColor: '#f3f4f6',
      navHoverBackground: 'rgba(255, 255, 255, 0.1)',
      navSpacing: 24,
      navPadding: 12,
      navBorderRadius: 6,
      navTransition: 'all 0.3s ease',
      navTransform: 'translateY(-2px)',
      navShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      paddingTop: 16,
      paddingRight: 24,
      paddingBottom: 16,
      paddingLeft: 24,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 0,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      overflow: 'visible',
      minHeight: 80,
      maxWidth: '100%',
      linkUrl: '',
      linkTarget: '_self',
      linkRel: 'noopener noreferrer',
      hoverBackgroundColor: '',
      hoverTransform: '',
      hoverShadowX: 0,
      hoverShadowY: 0,
      hoverShadowBlur: 0,
      hoverShadowColor: 'transparent',
      responsive: {
        mobile: { 
          paddingTop: 12, 
          paddingRight: 16, 
          paddingBottom: 12, 
          paddingLeft: 16,
          logoFontSize: 20,
          navFontSize: 14,
          navSpacing: 16,
          navItems: [
            { label: 'Home', link: '#home', target: '_self' },
            { label: 'About', link: '#about', target: '_self' }
          ]
        },
        tablet: { 
          paddingTop: 14, 
          paddingRight: 20, 
          paddingBottom: 14, 
          paddingLeft: 20,
          logoFontSize: 22,
          navFontSize: 15,
          navSpacing: 20
        }
      }
    }
  }
};

export const FooterDefinition: ElementDefinition = {
  name: 'Footer',
  icon: LayoutIcon,
  description: 'Page footer',
  element: {
    type: 'footer' as const,
    position: { x: 100, y: 100 },
    size: { width: 500, height: 120 },
    props: { 
      backgroundColor: '#374151',
      textColor: '#ffffff',
      copyright: '© 2024 Your Company'
    }
  }
};

export const GridLayoutDefinition: ElementDefinition = {
  name: 'Grid Layout',
  icon: Grid,
  description: 'CSS Grid container',
  element: {
    type: 'grid-layout' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 300 },
    props: {
      columns: 3,
      gap: 16,
      backgroundColor: '#f8f9fa',
      padding: 20
    }
  }
};

export const FlexLayoutDefinition: ElementDefinition = {
  name: 'Flexbox Layout',
  icon: LayoutIcon,
  description: 'Flexbox container',
  element: {
    type: 'flex-layout' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 200 },
    props: {
      direction: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      backgroundColor: '#f8f9fa',
      padding: 20
    }
  }
};

