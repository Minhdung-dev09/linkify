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
  Shuffle
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
      description: 'Large heading text',
      element: {
        type: 'heading' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 60 },
        props: { 
          text: 'Heading 1',
          fontSize: 32,
          fontWeight: 'bold',
          color: '#000000'
        }
      }
    },
    {
      name: 'Heading 2',
      icon: Heading2,
      description: 'Medium heading text',
      element: {
        type: 'heading' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 50 },
        props: { 
          text: 'Heading 2',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#000000'
        }
      }
    },
    {
      name: 'Heading 3',
      icon: Heading3,
      description: 'Small heading text',
      element: {
        type: 'heading' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 40 },
        props: { 
          text: 'Heading 3',
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000000'
        }
      }
    },
    {
      name: 'Paragraph',
      icon: AlignLeft,
      description: 'Body text content',
      element: {
        type: 'paragraph' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 100 },
        props: { 
          text: 'This is a paragraph of text that can be edited and styled.',
          fontSize: 16,
          color: '#666666',
          lineHeight: 1.5
        }
      }
    },
    {
      name: 'Button',
      icon: MousePointer,
      description: 'Clickable button',
      element: {
        type: 'button' as const,
        position: { x: 100, y: 100 },
        size: { width: 120, height: 40 },
        props: { 
          text: 'Click Me',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          borderRadius: 8,
          fontSize: 16
        }
      }
    },
    {
      name: 'Image',
      icon: Image,
      description: 'Image placeholder',
      element: {
        type: 'image' as const,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 150 },
        props: { 
          src: '/placeholder-image.jpg',
          alt: 'Image',
          objectFit: 'cover'
        }
      }
    },
    {
      name: 'Container',
      icon: Grid,
      description: 'Layout container',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 200 },
        props: { 
          backgroundColor: '#f8f9fa',
          padding: 20
        }
      }
    },
    {
      name: 'Section',
      icon: Layout,
      description: 'Page section',
      element: {
        type: 'section' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 300 },
        props: { 
          backgroundColor: '#ffffff',
          padding: 40
        }
      }
    },
    {
      name: 'Spacer',
      icon: Square,
      description: 'Empty space',
      element: {
        type: 'spacer' as const,
        position: { x: 100, y: 100 },
        size: { width: 100, height: 50 },
        props: { 
          backgroundColor: '#f3f4f6'
        }
      }
    }
  ];

  const advancedElements = [
    {
      name: 'Video Player',
      icon: Video,
      description: 'Video content',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 400, height: 225 },
        props: { 
          backgroundColor: '#000000',
          padding: 0
        }
      }
    },
    {
      name: 'Form',
      icon: FileText,
      description: 'Contact form',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 350, height: 300 },
        props: { 
          backgroundColor: '#ffffff',
          padding: 20
        }
      }
    },
    {
      name: 'Calendar',
      icon: Calendar,
      description: 'Date picker',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 250 },
        props: { 
          backgroundColor: '#ffffff',
          padding: 15
        }
      }
    },
    {
      name: 'Timer',
      icon: Clock,
      description: 'Countdown timer',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 100 },
        props: { 
          backgroundColor: '#1f2937',
          padding: 20
        }
      }
    },
    {
      name: 'Rating',
      icon: Star,
      description: 'Star rating',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 150, height: 30 },
        props: { 
          backgroundColor: '#ffffff',
          padding: 5
        }
      }
    },
    {
      name: 'Social Share',
      icon: Share2,
      description: 'Social media buttons',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 50 },
        props: { 
          backgroundColor: '#f8f9fa',
          padding: 10
        }
      }
    },
    {
      name: 'Progress Bar',
      icon: BarChart3,
      description: 'Progress indicator',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 20 },
        props: { 
          backgroundColor: '#e5e7eb',
          padding: 0
        }
      }
    },
    {
      name: 'Badge',
      icon: BadgeIcon,
      description: 'Status badge',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 80, height: 30 },
        props: { 
          backgroundColor: '#3b82f6',
          padding: 5
        }
      }
    },
    {
      name: 'Card',
      icon: Square,
      description: 'Content card',
      element: {
        type: 'container' as const,
        position: { x: 100, y: 100 },
        size: { width: 300, height: 200 },
        props: { 
          backgroundColor: '#ffffff',
          padding: 20
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