import { BuilderElement } from "@/app/builder/page";
import { HeadingRenderer } from "./HeadingRenderer";
import { ParagraphRenderer } from "./ParagraphRenderer";
import { ButtonRenderer } from "./ButtonRenderer";
import { ImageRenderer } from "./ImageRenderer";
import { ContainerRenderer } from "./ContainerRenderer";
import { SectionRenderer } from "./SectionRenderer";
import { SpacerRenderer } from "./SpacerRenderer";
import CanvasCarousel from "../../renderers/CanvasCarousel";
import {
  HeaderRenderer,
  FooterRenderer,
  VideoPlayerRenderer,
  HeroRenderer,
  GridLayoutRenderer,
  FlexLayoutRenderer,
  GenericAdvancedRenderer
} from "./AdvancedRenderers";

interface ElementRendererProps {
  element: BuilderElement;
  isDragging?: boolean;
  isResizing?: boolean;
}

export function ElementRenderer({ element, isDragging = false, isResizing = false }: ElementRendererProps) {
  switch (element.type) {
    // Basic Elements
    case 'heading':
      return <HeadingRenderer element={element} />;
    
    case 'paragraph':
      return <ParagraphRenderer element={element} />;
    
    case 'button':
      return <ButtonRenderer element={element} />;
    
    case 'image':
      return <ImageRenderer element={element} />;
    
    case 'container':
      return <ContainerRenderer element={element} />;
    
    case 'section':
      return <SectionRenderer element={element} />;
    
    case 'spacer':
      return <SpacerRenderer element={element} />;
    
    // Advanced Elements
    case 'header':
      return <HeaderRenderer element={element} isDragging={isDragging} isResizing={isResizing} />;
    
    case 'footer':
      return <FooterRenderer element={element} isDragging={isDragging} isResizing={isResizing} />;
    
    case 'carousel':
      return <CanvasCarousel element={element} />;
    
    case 'video-player':
      return <VideoPlayerRenderer element={element} isDragging={isDragging} isResizing={isResizing} />;
    
    case 'hero':
      return <HeroRenderer element={element} isDragging={isDragging} isResizing={isResizing} />;
    
    case 'grid-layout':
      return <GridLayoutRenderer element={element} isDragging={isDragging} isResizing={isResizing} />;
    
    case 'flex-layout':
      return <FlexLayoutRenderer element={element} isDragging={isDragging} isResizing={isResizing} />;
    
    default:
      // Use generic renderer for other advanced elements
      return <GenericAdvancedRenderer element={element} isDragging={isDragging} isResizing={isResizing} />;
  }
}

