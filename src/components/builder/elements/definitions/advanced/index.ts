import { ElementDefinition } from './Layout';
import {
  ContainerAdvancedDefinition,
  SectionAdvancedDefinition,
  HeaderDefinition,
  FooterDefinition,
  GridLayoutDefinition,
  FlexLayoutDefinition
} from './Layout';
import {
  VideoPlayerDefinition,
  AudioPlayerDefinition,
  ImageGalleryDefinition,
  CarouselDefinition
} from './Media';
import {
  AccordionDefinition,
  TabsDefinition,
  ModalDefinition,
  DropdownDefinition
} from './Interactive';
import {
  DataTableDefinition,
  ChartDefinition,
  ProgressBarDefinition,
  StatsCardDefinition
} from './DataDisplay';
import {
  SocialLinksDefinition,
  WhatsAppButtonDefinition,
  ContactInfoDefinition
} from './Social';
import {
  ContactFormDefinition,
  NewsletterDefinition,
  SearchBarDefinition
} from './Forms';
import {
  HeroDefinition,
  PricingCardDefinition,
  TestimonialDefinition,
  FeatureListDefinition,
  CTADefinition
} from './Marketing';
import {
  TimerDefinition,
  RatingDefinition,
  BadgeDefinition,
  DividerDefinition,
  SpacerAdvancedDefinition
} from './Utility';

export type { ElementDefinition };

export const advancedElements: ElementDefinition[] = [
  // Layout
  ContainerAdvancedDefinition,
  SectionAdvancedDefinition,
  HeaderDefinition,
  FooterDefinition,
  GridLayoutDefinition,
  FlexLayoutDefinition,
  // Media
  VideoPlayerDefinition,
  AudioPlayerDefinition,
  ImageGalleryDefinition,
  CarouselDefinition,
  // Interactive
  AccordionDefinition,
  TabsDefinition,
  ModalDefinition,
  DropdownDefinition,
  // Data Display
  DataTableDefinition,
  ChartDefinition,
  ProgressBarDefinition,
  StatsCardDefinition,
  // Social & Communication
  SocialLinksDefinition,
  WhatsAppButtonDefinition,
  ContactInfoDefinition,
  // Forms
  ContactFormDefinition,
  NewsletterDefinition,
  SearchBarDefinition,
  // Marketing
  HeroDefinition,
  PricingCardDefinition,
  TestimonialDefinition,
  FeatureListDefinition,
  CTADefinition,
  // Utility
  TimerDefinition,
  RatingDefinition,
  BadgeDefinition,
  DividerDefinition,
  SpacerAdvancedDefinition
];

