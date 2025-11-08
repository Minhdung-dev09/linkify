import { FileText, Layout as LayoutIcon, Square, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const AccordionDefinition: ElementDefinition = {
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
};

export const TabsDefinition: ElementDefinition = {
  name: 'Tabs',
  icon: LayoutIcon,
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
};

export const ModalDefinition: ElementDefinition = {
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
};

export const DropdownDefinition: ElementDefinition = {
  name: 'Dropdown',
  icon: LayoutIcon,
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
};

