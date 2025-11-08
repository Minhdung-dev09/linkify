import { ElementDefinition } from './Heading';
import { Heading1Definition, Heading2Definition, Heading3Definition } from './Heading';
import { ParagraphDefinition } from './Paragraph';
import { ButtonDefinition, CTAButtonDefinition, ContactButtonDefinition, WhatsAppButtonDefinition } from './Button';
import { ImageDefinition } from './Image';
import { ContainerDefinition } from './Container';
import { SectionDefinition } from './Section';
import { SpacerDefinition } from './Spacer';

export type { ElementDefinition };

export const basicElements: ElementDefinition[] = [
  Heading1Definition,
  Heading2Definition,
  Heading3Definition,
  ParagraphDefinition,
  ButtonDefinition,
  CTAButtonDefinition,
  ContactButtonDefinition,
  WhatsAppButtonDefinition,
  ImageDefinition,
  ContainerDefinition,
  SectionDefinition,
  SpacerDefinition
];

