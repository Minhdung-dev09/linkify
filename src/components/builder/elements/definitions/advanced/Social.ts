import { Share2, MessageCircle, Phone, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const SocialLinksDefinition: ElementDefinition = {
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
};

export const WhatsAppButtonDefinition: ElementDefinition = {
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
};

export const ContactInfoDefinition: ElementDefinition = {
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
};

