import { Layout as LayoutIcon, Square, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const HeroDefinition: ElementDefinition = {
  name: 'Hero Section',
  icon: LayoutIcon,
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
};

export const PricingCardDefinition: ElementDefinition = {
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
};

export const TestimonialDefinition: ElementDefinition = {
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
};

export const FeatureListDefinition: ElementDefinition = {
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
};

export const CTADefinition: ElementDefinition = {
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
};

