import { Clock, Star, Badge as BadgeIcon, Square, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const TimerDefinition: ElementDefinition = {
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
};

export const RatingDefinition: ElementDefinition = {
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
};

export const BadgeDefinition: ElementDefinition = {
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
};

export const DividerDefinition: ElementDefinition = {
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
};

export const SpacerAdvancedDefinition: ElementDefinition = {
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
};

