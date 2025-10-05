"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Type, 
  Image, 
  MousePointer, 
  Layout, 
  Grid, 
  Square,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  Video,
  FileText,
  Calendar,
  Clock,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Upload,
  Link,
  Mail,
  Phone,
  MapPin,
  Globe,
  Wifi,
  Battery,
  Signal,
  Settings,
  Palette,
  Brush,
  Eraser,
  Crop,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Plus,
  Minus,
  Maximize,
  Minimize,
  Move,
  Zap,
  Sparkles,
  Wand2,
  Crown,
  Diamond,
  Award,
  Trophy,
  Medal,
  Badge as BadgeIcon,
  Tag,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  Focus,
  Crosshair,
  Bolt,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Timer,
  Hourglass,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Video as VideoIcon,
  VideoOff,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Search
} from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

interface ElementLibraryProps {
  onAddElement: (element: Omit<BuilderElement, 'id'>) => void;
  category: 'basic' | 'advanced';
}

const ElementLibrary = ({ onAddElement, category }: ElementLibraryProps) => {
  const basicElements = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
      name: 'Image',
      icon: Image,
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  const advancedElements = [
    // Layout Elements
    {
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
    },
    {
      name: 'Section',
      icon: Layout,
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
    },
    {
      name: 'Header',
      icon: Layout,
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
    },
    {
      name: 'Footer',
      icon: Layout,
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
    },
    {
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
    },
    {
      name: 'Flexbox Layout',
      icon: Layout,
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
    },

    // Media Elements
    {
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
    },
    {
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
    },
    {
      name: 'Image Gallery',
      icon: Image,
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
    },
    {
      name: 'Carousel',
      icon: Image,
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
    },

    // Interactive Elements
    {
      name: 'Accordion',
      icon: FileText,
      description: 'Collapsible content sections',
      element: {
        type: 'accordion' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 300 },
        props: {
          items: [
            { title: 'Section 1', content: 'Content for section 1' },
            { title: 'Section 2', content: 'Content for section 2' },
            { title: 'Section 3', content: 'Content for section 3' }
          ],
          allowMultiple: false,
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Tabs',
      icon: Layout,
      description: 'Tabbed content interface',
      element: {
        type: 'tabs' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 300 },
        props: {
          tabs: [
            { label: 'Tab 1', content: 'Content for tab 1' },
            { label: 'Tab 2', content: 'Content for tab 2' },
            { label: 'Tab 3', content: 'Content for tab 3' }
          ],
          activeTab: 0,
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Modal',
      icon: Square,
      description: 'Popup modal dialog',
      element: {
        type: 'modal' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 300 },
        props: {
          title: 'Modal Title',
          content: 'Modal content goes here',
          showCloseButton: true,
          overlay: true,
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Dropdown',
      icon: Layout,
      description: 'Dropdown menu',
      element: {
        type: 'dropdown' as const,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 40 },
        props: {
          label: 'Select Option',
          options: ['Option 1', 'Option 2', 'Option 3'],
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },

    // Data Display Elements
    {
      name: 'Data Table',
      icon: BarChart3,
      description: 'Data table with sorting',
      element: {
        type: 'data-table' as const,
        position: { x: 100, y: 100 },
        size: { width: 500, height: 300 },
        props: {
          headers: ['Name', 'Email', 'Role'],
          rows: [
            ['John Doe', 'john@example.com', 'Admin'],
            ['Jane Smith', 'jane@example.com', 'User']
          ],
          sortable: true,
          striped: true,
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Chart',
      icon: PieChart,
      description: 'Interactive chart',
      element: {
        type: 'chart' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 300 },
        props: {
          type: 'bar',
          data: [
            { label: 'Jan', value: 100 },
            { label: 'Feb', value: 150 },
            { label: 'Mar', value: 200 }
          ],
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Progress Bar',
      icon: BarChart3,
      description: 'Progress indicator',
      element: {
        type: 'progress-bar' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 20 },
        props: {
          value: 65,
          max: 100,
          label: 'Progress',
          showPercentage: true,
          backgroundColor: '#e5e7eb',
          fillColor: '#3b82f6'
        }
      }
    },
    {
      name: 'Stats Card',
      icon: TrendingUp,
      description: 'Statistics display card',
      element: {
        type: 'stats-card' as const,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 120 },
        props: {
          title: 'Total Users',
          value: '1,234',
          change: '+12%',
          trend: 'up',
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },

    // Social & Communication
    {
      name: 'Social Media Links',
      icon: Share2,
      description: 'Social media buttons',
      element: {
        type: 'social-links' as const,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 50 },
        props: {
          platforms: ['facebook', 'twitter', 'instagram', 'linkedin'],
          style: 'rounded',
          size: 'medium',
          backgroundColor: 'transparent'
        }
      }
    },
    {
      name: 'WhatsApp Button',
      icon: MessageCircle,
      description: 'WhatsApp contact button',
      element: {
        type: 'whatsapp-button' as const,
        position: { x: 100, y: 100 },
        size: { width: 160, height: 48 },
        props: {
          phoneNumber: '+1234567890',
          message: 'Hello!',
          backgroundColor: '#25d366',
          textColor: '#ffffff'
        }
      }
    },
    {
      name: 'Contact Info',
      icon: Phone,
      description: 'Contact information display',
      element: {
        type: 'contact-info' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 150 },
        props: {
          phone: '+1 (555) 123-4567',
          email: 'contact@example.com',
          address: '123 Main St, City, State',
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },

    // Forms & Inputs
    {
      name: 'Contact Form',
      icon: FileText,
      description: 'Contact form with validation',
      element: {
        type: 'contact-form' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 500 },
        props: {
          title: 'Contact Us',
          fields: [
            { type: 'text', name: 'name', label: 'Name', required: true },
            { type: 'email', name: 'email', label: 'Email', required: true },
            { type: 'textarea', name: 'message', label: 'Message', required: true }
          ],
          buttonText: 'Send Message',
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Newsletter Signup',
      icon: Mail,
      description: 'Email newsletter signup',
      element: {
        type: 'newsletter' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 120 },
        props: {
          title: 'Subscribe to Newsletter',
          subtitle: 'Get the latest updates',
          placeholder: 'Enter your email',
          buttonText: 'Subscribe',
          backgroundColor: '#f8f9fa',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Search Bar',
      icon: Search,
      description: 'Search input with button',
      element: {
        type: 'search-bar' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 40 },
        props: {
          placeholder: 'Search...',
          buttonText: 'Search',
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },

    // Content & Marketing
    {
      name: 'Hero Section',
      icon: Layout,
      description: 'Hero banner with CTA',
      element: {
        type: 'hero' as const,
        position: { x: 100, y: 100 },
        size: { width: 500, height: 300 },
        props: {
          title: 'Welcome to Our Site',
          subtitle: 'This is a hero section',
          buttonText: 'Get Started',
          backgroundImage: '/placeholder-image.jpg',
          overlay: true,
          textColor: '#ffffff'
        }
      }
    },
    {
      name: 'Pricing Card',
      icon: Square,
      description: 'Pricing plan card',
      element: {
        type: 'pricing-card' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 400 },
        props: {
          title: 'Premium Plan',
          price: '$29',
          period: '/month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          buttonText: 'Get Started',
          popular: false,
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Testimonial',
      icon: Square,
      description: 'Customer testimonial',
      element: {
        type: 'testimonial' as const,
        position: { x: 100, y: 100 },
        size: { width: 350, height: 200 },
        props: {
          quote: 'This product is amazing!',
          author: 'John Doe',
          role: 'CEO, Company',
          avatar: '/placeholder-avatar.jpg',
          rating: 5,
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Feature List',
      icon: Square,
      description: 'Feature list with icons',
      element: {
        type: 'feature-list' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 300 },
        props: {
          title: 'Features',
          features: [
            { icon: '✓', text: 'Feature 1', description: 'Description 1' },
            { icon: '✓', text: 'Feature 2', description: 'Description 2' },
            { icon: '✓', text: 'Feature 3', description: 'Description 3' }
          ],
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb'
        }
      }
    },
    {
      name: 'Call to Action',
      icon: Square,
      description: 'CTA section',
      element: {
        type: 'cta' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 200 },
        props: {
          title: 'Ready to Get Started?',
          subtitle: 'Join thousands of satisfied customers',
          buttonText: 'Start Free Trial',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff'
        }
      }
    },

    // Utility Elements
    {
      name: 'Timer',
      icon: Clock,
      description: 'Countdown timer',
      element: {
        type: 'timer' as const,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 100 },
        props: {
          targetDate: '2024-12-31T23:59:59',
          format: 'DD:HH:MM:SS',
          backgroundColor: '#1f2937',
          textColor: '#ffffff'
        }
      }
    },
    {
      name: 'Rating',
      icon: Star,
      description: 'Star rating display',
      element: {
        type: 'rating' as const,
        position: { x: 100, y: 100 },
        size: { width: 150, height: 30 },
        props: {
          value: 4.5,
          max: 5,
          showValue: true,
          color: '#fbbf24'
        }
      }
    },
    {
      name: 'Badge',
      icon: BadgeIcon,
      description: 'Status badge',
      element: {
        type: 'badge' as const,
        position: { x: 100, y: 100 },
        size: { width: 80, height: 30 },
        props: {
          text: 'New',
          color: '#3b82f6',
          backgroundColor: '#dbeafe',
          size: 'medium'
        }
      }
    },
    {
      name: 'Divider',
      icon: Square,
      description: 'Visual separator',
      element: {
        type: 'divider' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 2 },
        props: {
          style: 'solid',
          color: '#e5e7eb',
          thickness: 2
        }
      }
    },
    {
      name: 'Spacer',
      icon: Square,
      description: 'Flexible spacing',
      element: {
        type: 'spacer' as const,
        position: { x: 100, y: 100 },
        size: { width: 100, height: 50 },
        props: {
          height: 50,
          backgroundColor: 'transparent'
        }
      }
    }
  ];

  const elements = category === 'basic' ? basicElements : advancedElements;

  return (
    <div className="space-y-3">
      {elements.map((item, index) => (
        <Card 
          key={index}
          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
          onClick={() => onAddElement(item.element)}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {item.description}
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {item.element.type}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ElementLibrary;