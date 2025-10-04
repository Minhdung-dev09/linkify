"use client";

import { forwardRef, useCallback, useRef, useState, useEffect } from "react";
import { cn } from "@/utils";
import { BuilderElement, BuilderPage } from "@/app/builder/page";
import { 
  Move, 
  Copy, 
  Trash2, 
  Lock, 
  Unlock,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuilderCanvasProps {
  page: BuilderPage;
  selectedElement: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<BuilderElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onDuplicateElement: (elementId: string) => void;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
}

const BuilderCanvas = forwardRef<HTMLDivElement, BuilderCanvasProps>(({
  page,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  deviceMode
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragElement, setDragElement] = useState<string | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [showElementActions, setShowElementActions] = useState<string | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const canvasScrollRef = useRef<HTMLDivElement>(null);

  // Smart scroll detection and management
  useEffect(() => {
    const checkScroll = () => {
      if (canvasScrollRef.current) {
        const { scrollHeight, clientHeight } = canvasScrollRef.current;
        const canScroll = scrollHeight > clientHeight + 50;
        setShowScrollHint(canScroll && page.elements.length > 0);
      }
    };
    
    checkScroll();
    const timer = setTimeout(checkScroll, 200);
    return () => clearTimeout(timer);
  }, [page.elements]);

  // Scroll to selected element when it's selected
  useEffect(() => {
    if (selectedElement && canvasScrollRef.current) {
      const element = document.getElementById(selectedElement);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest' 
        });
      }
    }
  }, [selectedElement]);

  // Global mouse event listeners for dragging and resizing
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!dragElement) return;

      // Auto-scroll when dragging near edges
      if (canvasScrollRef.current) {
        const rect = canvasScrollRef.current.getBoundingClientRect();
        const scrollThreshold = 50;
        const scrollSpeed = 10;
        
        // Scroll down when near bottom edge
        if (e.clientY > rect.bottom - scrollThreshold) {
          canvasScrollRef.current.scrollTop += scrollSpeed;
        }
        // Scroll up when near top edge
        else if (e.clientY < rect.top + scrollThreshold) {
          canvasScrollRef.current.scrollTop -= scrollSpeed;
        }
      }

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const element = page.elements.find(el => el.id === dragElement);
      if (!element) return;

      if (isDragging && !isResizing) {
        // Handle dragging
        onUpdateElement(dragElement, {
          position: {
            x: Math.max(0, element.position.x + deltaX),
            y: Math.max(0, element.position.y + deltaY)
          }
        });
      } else if (isResizing && resizeHandle) {
        // Handle resizing
        const newSize = { ...element.size };
        const newPosition = { ...element.position };

        switch (resizeHandle) {
          case 'nw': // Top-left
            newSize.width = Math.max(20, element.size.width - deltaX);
            newSize.height = Math.max(20, element.size.height - deltaY);
            newPosition.x = element.position.x + deltaX;
            newPosition.y = element.position.y + deltaY;
            break;
          case 'ne': // Top-right
            newSize.width = Math.max(20, element.size.width + deltaX);
            newSize.height = Math.max(20, element.size.height - deltaY);
            newPosition.y = element.position.y + deltaY;
            break;
          case 'sw': // Bottom-left
            newSize.width = Math.max(20, element.size.width - deltaX);
            newSize.height = Math.max(20, element.size.height + deltaY);
            newPosition.x = element.position.x + deltaX;
            break;
          case 'se': // Bottom-right
            newSize.width = Math.max(20, element.size.width + deltaX);
            newSize.height = Math.max(20, element.size.height + deltaY);
            break;
          case 'n': // Top
            newSize.height = Math.max(20, element.size.height - deltaY);
            newPosition.y = element.position.y + deltaY;
            break;
          case 's': // Bottom
            newSize.height = Math.max(20, element.size.height + deltaY);
            break;
          case 'w': // Left
            newSize.width = Math.max(20, element.size.width - deltaX);
            newPosition.x = element.position.x + deltaX;
            break;
          case 'e': // Right
            newSize.width = Math.max(20, element.size.width + deltaX);
            break;
        }

        onUpdateElement(dragElement, {
          size: newSize,
          position: newPosition
        });
      }

      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setDragElement(null);
      setResizeHandle(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, isResizing, dragElement, dragStart, resizeHandle, page.elements, onUpdateElement]);

  const getDeviceDimensions = () => {
    switch (deviceMode) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      default:
        return { width: 1200, height: 800 };
    }
  };

  const deviceDimensions = getDeviceDimensions();

  const handleElementClick = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    onSelectElement(elementId);
  }, [onSelectElement]);

  const handleCanvasClick = useCallback(() => {
    onSelectElement(null);
  }, [onSelectElement]);

  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    if (e.button !== 0) return; // Only left mouse button
    
    e.preventDefault();
    setIsDragging(true);
    setDragElement(elementId);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent, elementId: string, handle: string) => {
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setDragElement(elementId);
    setResizeHandle(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  // Mouse event handlers are now handled globally in useEffect

  const renderElement = (element: BuilderElement) => {
    const isSelected = selectedElement === element.id;
    const isDragging = dragElement === element.id;

     const elementStyle: React.CSSProperties = {
       position: 'absolute',
       left: element.position.x,
       top: element.position.y,
       width: element.size.width,
       height: element.size.height,
       zIndex: isSelected ? 1000 : 1,
       opacity: element.visible === false ? 0.5 : 1,
       pointerEvents: element.locked ? 'none' : 'auto',
       cursor: isDragging ? 'grabbing' : isResizing ? 'grabbing' : 'grab',
       transform: isDragging || isResizing ? 'scale(1.02)' : 'scale(1)',
       transition: isDragging || isResizing ? 'none' : 'transform 0.1s ease',
     };

    const handleMouseEnter = () => {
      if (!isSelected) {
        setShowElementActions(element.id);
      }
    };

    const handleMouseLeave = () => {
      setShowElementActions(null);
    };

    return (
      <div
        key={element.id}
        className={cn(
          "relative group",
          isSelected && "ring-2 ring-primary ring-offset-2",
          isDragging && "shadow-lg"
        )}
        style={elementStyle}
        onClick={(e) => handleElementClick(e, element.id)}
        onMouseDown={(e) => handleMouseDown(e, element.id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Element Content */}
        <div className="w-full h-full">
          {element.type === 'heading' && (
            <h1 
              className="w-full h-full flex items-center"
              style={{
                fontSize: element.props.fontSize || 32,
                fontWeight: element.props.fontWeight || 'bold',
                color: element.props.color || '#000000',
                textAlign: element.props.textAlign || 'left',
                fontFamily: element.props.fontFamily || 'inherit'
              }}
            >
              {element.props.text || 'Heading Text'}
            </h1>
          )}

          {element.type === 'paragraph' && (
            <p 
              className="w-full h-full flex items-start"
              style={{
                fontSize: element.props.fontSize || 16,
                color: element.props.color || '#666666',
                textAlign: element.props.textAlign || 'left',
                fontFamily: element.props.fontFamily || 'inherit',
                lineHeight: element.props.lineHeight || 1.5
              }}
            >
              {element.props.text || 'Paragraph text goes here...'}
            </p>
          )}

          {element.type === 'button' && (
            <button
              className="w-full h-full flex items-center justify-center rounded-md transition-all hover:opacity-90"
              style={{
                backgroundColor: element.props.backgroundColor || '#3b82f6',
                color: element.props.color || '#ffffff',
                borderRadius: element.props.borderRadius || 8,
                fontSize: element.props.fontSize || 16,
                fontWeight: element.props.fontWeight || 'medium'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (element.props.linkUrl) {
                  if (element.props.linkTarget === '_blank') {
                    window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
                  } else {
                    window.location.href = element.props.linkUrl;
                  }
                }
              }}
            >
              {element.props.text || 'Click Me'}
            </button>
          )}

          {element.type === 'image' && (
            <div 
              className="w-full h-full bg-gray-200 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: element.props.backgroundColor || '#f3f4f6'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (element.props.linkUrl) {
                  if (element.props.linkTarget === '_blank') {
                    window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
                  } else {
                    window.location.href = element.props.linkUrl;
                  }
                }
              }}
            >
              {element.props.src ? (
                <img
                  src={element.props.src}
                  alt={element.props.alt || 'Image'}
                  className="w-full h-full object-cover"
                  style={{
                    objectFit: element.props.objectFit || 'cover'
                  }}
                />
              ) : (
                <div className="text-gray-500 text-sm">No Image</div>
              )}
            </div>
          )}

          {element.type === 'container' && (
            <div 
              className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
              style={{
                backgroundColor: element.props.backgroundColor || '#f8f9fa',
                padding: element.props.padding || 20
              }}
            >
              <span className="text-gray-500 text-sm">Container</span>
            </div>
          )}

          {element.type === 'section' && (
            <div 
              className="w-full h-full border border-gray-200 rounded-md"
              style={{
                backgroundColor: element.props.backgroundColor || '#ffffff',
                padding: element.props.padding || 40
              }}
            >
              <div className="text-gray-500 text-sm">Section</div>
            </div>
          )}

                 {element.type === 'spacer' && (
                   <div
                     className="w-full h-full bg-gray-100 border border-gray-200 rounded"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#f3f4f6'
                     }}
                   >
                     <div className="text-gray-500 text-xs text-center">Spacer</div>
                   </div>
                 )}

                 {element.type === 'header' && (
                   <div
                     className="w-full h-full flex items-center justify-between px-4 border-b"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#1f2937',
                       color: element.props.textColor || '#ffffff'
                     }}
                   >
                     <div className="font-bold text-lg">{element.props.logoText || 'Logo'}</div>
                     <div className="flex gap-4">
                       {(element.props.navItems || []).map((item: string, index: number) => (
                         <span key={index} className="text-sm hover:underline cursor-pointer">
                           {item}
                         </span>
                       ))}
                     </div>
                   </div>
                 )}

                 {element.type === 'footer' && (
                   <div
                     className="w-full h-full flex items-center justify-center px-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#374151',
                       color: element.props.textColor || '#ffffff'
                     }}
                   >
                     <div className="text-sm">{element.props.copyright || '© 2024 Your Company'}</div>
                   </div>
                 )}

                 {element.type === 'carousel' && (
                   <div className="w-full h-full relative overflow-hidden rounded-lg bg-gray-200">
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-gray-500 text-sm">Carousel ({element.props.images?.length || 0} slides)</div>
                     </div>
                     {element.props.showDots && (
                       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                         {(element.props.images || []).map((_: any, index: number) => (
                           <div key={index} className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                         ))}
                       </div>
                     )}
                   </div>
                 )}

                 {element.type === 'hero' && (
                   <div
                     className="w-full h-full relative flex flex-col items-center justify-center text-center p-8 rounded-lg"
                     style={{
                       backgroundImage: element.props.backgroundImage ? `url(${element.props.backgroundImage})` : 'none',
                       backgroundColor: element.props.backgroundColor || '#f8fafc',
                       backgroundSize: 'cover',
                       backgroundPosition: 'center'
                     }}
                   >
                     {element.props.overlay && (
                       <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                     )}
                     <div className="relative z-10">
                       <h1 className="text-3xl font-bold mb-4" style={{ color: element.props.textColor || '#1f2937' }}>
                         {element.props.title || 'Welcome'}
                       </h1>
                       <p className="text-lg mb-6" style={{ color: element.props.textColor || '#4b5563' }}>
                         {element.props.subtitle || 'Subtitle'}
                       </p>
                       <button
                         className="px-6 py-3 rounded-lg font-medium"
                         style={{
                           backgroundColor: element.props.buttonColor || '#3b82f6',
                           color: '#ffffff'
                         }}
                         onClick={(e) => {
                           e.stopPropagation();
                           if (element.props.linkUrl) {
                             if (element.props.linkTarget === '_blank') {
                               window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
                             } else {
                               window.location.href = element.props.linkUrl;
                             }
                           }
                         }}
                       >
                         {element.props.buttonText || 'Get Started'}
                       </button>
                     </div>
                   </div>
                 )}

                 {element.type === 'pricing-card' && (
                   <div
                     className="w-full h-full p-6 border rounded-lg flex flex-col"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     {element.props.popular && (
                       <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full self-center mb-4">
                         Popular
                       </div>
                     )}
                     <h3 className="text-xl font-bold mb-2">{element.props.title || 'Plan'}</h3>
                     <div className="mb-4">
                       <span className="text-3xl font-bold">{element.props.price || '$0'}</span>
                       <span className="text-gray-500">{element.props.period || '/month'}</span>
                     </div>
                     <ul className="flex-1 space-y-2 mb-6">
                       {(element.props.features || []).map((feature: string, index: number) => (
                         <li key={index} className="text-sm">✓ {feature}</li>
                       ))}
                     </ul>
                     <button
                       className="w-full py-2 rounded-lg font-medium"
                       style={{
                         backgroundColor: element.props.buttonColor || '#3b82f6',
                         color: '#ffffff'
                       }}
                       onClick={(e) => {
                         e.stopPropagation();
                         if (element.props.linkUrl) {
                           if (element.props.linkTarget === '_blank') {
                             window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
                           } else {
                             window.location.href = element.props.linkUrl;
                           }
                         }
                       }}
                     >
                       {element.props.buttonText || 'Get Started'}
                     </button>
                   </div>
                 )}

                 {element.type === 'testimonial' && (
                   <div
                     className="w-full h-full p-6 border rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="flex items-center mb-4">
                       <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                       <div>
                         <div className="font-semibold">{element.props.author || 'Author'}</div>
                         <div className="text-sm text-gray-500">{element.props.role || 'Role'}</div>
                       </div>
                     </div>
                     <p className="text-gray-700 mb-4">&ldquo;{element.props.quote || 'Testimonial quote'}&rdquo;</p>
                     <div className="flex">
                       {Array.from({ length: element.props.rating || 5 }).map((_, index) => (
                         <span key={index} className="text-yellow-400">★</span>
                       ))}
                     </div>
                   </div>
                 )}

                 {element.type === 'feature-list' && (
                   <div
                     className="w-full h-full p-6"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff'
                     }}
                   >
                     <h3 className="text-xl font-bold mb-4">{element.props.title || 'Features'}</h3>
                     <div className="space-y-3">
                       {(element.props.features || []).map((feature: any, index: number) => (
                         <div key={index} className="flex items-start">
                           <span className="text-green-500 mr-2">{feature.icon || '✓'}</span>
                           <div>
                             <div className="font-medium">{feature.text}</div>
                             <div className="text-sm text-gray-500">{feature.description}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {element.type === 'cta' && (
                   <div
                     className="w-full h-full flex flex-col items-center justify-center text-center p-8 rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#3b82f6',
                       color: element.props.textColor || '#ffffff'
                     }}
                   >
                     <h2 className="text-2xl font-bold mb-2">{element.props.title || 'Call to Action'}</h2>
                     <p className="mb-6">{element.props.subtitle || 'Subtitle'}</p>
                     <button
                       className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100"
                       onClick={(e) => {
                         e.stopPropagation();
                         if (element.props.linkUrl) {
                           if (element.props.linkTarget === '_blank') {
                             window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
                           } else {
                             window.location.href = element.props.linkUrl;
                           }
                         }
                       }}
                     >
                       {element.props.buttonText || 'Button'}
                     </button>
                   </div>
                 )}

                 {element.type === 'contact-form' && (
                   <div
                     className="w-full h-full p-6 border rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <h3 className="text-xl font-bold mb-4">{element.props.title || 'Contact Us'}</h3>
                     <div className="space-y-4">
                       {(element.props.fields || []).map((field: any, index: number) => (
                         <div key={index}>
                           <label className="block text-sm font-medium mb-1">{field.label}</label>
                           {field.type === 'textarea' ? (
                             <textarea
                               className="w-full p-2 border rounded"
                               placeholder={field.label}
                               rows={3}
                             />
                           ) : (
                             <input
                               type={field.type}
                               className="w-full p-2 border rounded"
                               placeholder={field.label}
                             />
                           )}
                         </div>
                       ))}
                       <button
                         className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium"
                         onClick={(e) => {
                           e.stopPropagation();
                           if (element.props.linkUrl) {
                             if (element.props.linkTarget === '_blank') {
                               window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
                             } else {
                               window.location.href = element.props.linkUrl;
                             }
                           }
                         }}
                       >
                         {element.props.buttonText || 'Send Message'}
                       </button>
                     </div>
                   </div>
                 )}

                 {element.type === 'newsletter' && (
                   <div
                     className="w-full h-full p-6 border rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <h3 className="text-lg font-bold mb-2">{element.props.title || 'Newsletter'}</h3>
                     <p className="text-sm text-gray-600 mb-4">{element.props.subtitle || 'Subtitle'}</p>
                     <div className="flex gap-2">
                       <input
                         type="email"
                         className="flex-1 p-2 border rounded"
                         placeholder={element.props.placeholder || 'Enter your email'}
                       />
                       <button
                         className="px-4 py-2 bg-blue-600 text-white rounded font-medium"
                         onClick={(e) => {
                           e.stopPropagation();
                           if (element.props.linkUrl) {
                             if (element.props.linkTarget === '_blank') {
                               window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
                             } else {
                               window.location.href = element.props.linkUrl;
                             }
                           }
                         }}
                       >
                         {element.props.buttonText || 'Subscribe'}
                       </button>
                     </div>
                   </div>
                 )}
        </div>

        {/* Element Actions Overlay */}
        {(isSelected || showElementActions === element.id) && (
          <div className="absolute -top-8 left-0 right-0 flex items-center justify-center gap-1 bg-black/80 text-white rounded-md px-2 py-1 text-xs">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateElement(element.id, { locked: !element.locked });
              }}
            >
              {element.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateElement(element.id, { visible: element.visible === false ? true : false });
              }}
            >
              {element.visible === false ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateElement(element.id);
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteElement(element.id);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}

         {/* Resize Handles */}
         {isSelected && !element.locked && (
           <>
             {/* Corner handles */}
             <div 
               className="absolute -top-1 -left-1 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-nw-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 'nw')}
             />
             <div 
               className="absolute -top-1 -right-1 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-ne-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 'ne')}
             />
             <div 
               className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-sw-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 'sw')}
             />
             <div 
               className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-se-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 'se')}
             />
             
             {/* Edge handles */}
             <div 
               className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-n-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 'n')}
             />
             <div 
               className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-s-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 's')}
             />
             <div 
               className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-w-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 'w')}
             />
             <div 
               className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary border-2 border-white rounded-full cursor-e-resize hover:bg-primary/80"
               onMouseDown={(e) => handleResizeStart(e, element.id, 'e')}
             />
           </>
         )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center p-8"
      onClick={handleCanvasClick}
    >
      {/* Device Frame */}
      <div 
        className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
        style={{
          width: deviceDimensions.width,
          height: deviceDimensions.height,
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        {/* Device Header */}
        <div className="h-8 bg-gray-100 flex items-center justify-center border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Canvas Content */}
        <div 
          ref={canvasScrollRef}
          className="relative w-full overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{
            height: deviceDimensions.height - 32,
            backgroundColor: page.settings.backgroundColor,
            padding: page.settings.padding,
            scrollBehavior: 'smooth'
          }}
        >
          {/* Content Container - Dynamic Height Based on Elements */}
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Elements */}
            {page.elements.map(renderElement)}
            
            {/* Extra Space for Scrolling - Only when needed */}
            {page.elements.length > 0 && (
              <div style={{ height: '50vh', width: '100%' }}></div>
            )}
          </div>

          {/* Drop Zone Indicator */}
          {page.elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ minHeight: '100vh' }}>
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📄</div>
                <div className="text-lg font-medium">Start building your page</div>
                <div className="text-sm">Drag elements from the sidebar to get started</div>
              </div>
            </div>
          )}

          {/* Scroll Hint */}
          {showScrollHint && (
            <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              Scroll to see more
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

BuilderCanvas.displayName = "BuilderCanvas";

export default BuilderCanvas;
