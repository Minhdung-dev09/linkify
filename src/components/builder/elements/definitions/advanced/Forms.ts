import { FileText, Mail, Search, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const ContactFormDefinition: ElementDefinition = {
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
};

export const NewsletterDefinition: ElementDefinition = {
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
};

export const SearchBarDefinition: ElementDefinition = {
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
};

