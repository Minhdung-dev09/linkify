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
  EyeOff,
  Bold,
  Italic,
  Underline,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CanvasCarousel from "@/components/builder/renderers/CanvasCarousel";

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
  const [showTextEditor, setShowTextEditor] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [showFontSizePicker, setShowFontSizePicker] = useState<string | null>(null);
  const [showLinkInput, setShowLinkInput] = useState<string | null>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingMoveRef = useRef<null | { type: 'drag' | 'resize'; elementId: string; deltaX: number; deltaY: number; handle?: string }>(null);

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

      // Throttle updates with rAF to reduce re-renders while dragging
      pendingMoveRef.current = {
        type: isResizing ? 'resize' : 'drag',
        elementId: dragElement,
        deltaX,
        deltaY,
        handle: resizeHandle || undefined
      };

      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(() => {
          const payload = pendingMoveRef.current;
          rafIdRef.current = null;
          pendingMoveRef.current = null;
          if (!payload) return;

          const element = page.elements.find(el => el.id === payload.elementId);
          if (!element) return;

          if (payload.type === 'drag') {
            onUpdateElement(payload.elementId, {
              position: {
                x: Math.max(0, element.position.x + payload.deltaX),
                y: Math.max(0, element.position.y + payload.deltaY)
              }
            });
          } else if (payload.type === 'resize' && payload.handle) {
            const newSize = { ...element.size } as { width: number; height: number };
            const newPosition = { ...element.position } as { x: number; y: number };
            switch (payload.handle) {
              case 'nw':
                newSize.width = Math.max(20, element.size.width - payload.deltaX);
                newSize.height = Math.max(20, element.size.height - payload.deltaY);
                newPosition.x = element.position.x + payload.deltaX;
                newPosition.y = element.position.y + payload.deltaY;
                break;
              case 'ne':
                newSize.width = Math.max(20, element.size.width + payload.deltaX);
                newSize.height = Math.max(20, element.size.height - payload.deltaY);
                newPosition.y = element.position.y + payload.deltaY;
                break;
              case 'sw':
                newSize.width = Math.max(20, element.size.width - payload.deltaX);
                newSize.height = Math.max(20, element.size.height + payload.deltaY);
                newPosition.x = element.position.x + payload.deltaX;
                break;
              case 'se':
                newSize.width = Math.max(20, element.size.width + payload.deltaX);
                newSize.height = Math.max(20, element.size.height + payload.deltaY);
                break;
              case 'n':
                newSize.height = Math.max(20, element.size.height - payload.deltaY);
                newPosition.y = element.position.y + payload.deltaY;
                break;
              case 's':
                newSize.height = Math.max(20, element.size.height + payload.deltaY);
                break;
              case 'w':
                newSize.width = Math.max(20, element.size.width - payload.deltaX);
                newPosition.x = element.position.x + payload.deltaX;
                break;
              case 'e':
                newSize.width = Math.max(20, element.size.width + payload.deltaX);
                break;
            }
            onUpdateElement(payload.elementId, { size: newSize, position: newPosition });
          }

          // Update anchor for next frame
          setDragStart(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
        });
      }
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
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      pendingMoveRef.current = null;
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

  // Text editor handlers
  const isTextElement = (element: BuilderElement) => {
    return element.type === 'heading' || element.type === 'paragraph' || element.type === 'button';
  };

  const handleBold = useCallback((elementId: string) => {
    const element = page.elements.find(el => el.id === elementId);
    if (element) {
      const currentWeight = element.props.fontWeight || 'normal';
      const newWeight = currentWeight === 'bold' ? 'normal' : 'bold';
      onUpdateElement(elementId, { props: { ...element.props, fontWeight: newWeight } });
    }
  }, [page.elements, onUpdateElement]);

  const handleItalic = useCallback((elementId: string) => {
    const element = page.elements.find(el => el.id === elementId);
    if (element) {
      const currentStyle = element.props.fontStyle || 'normal';
      const newStyle = currentStyle === 'italic' ? 'normal' : 'italic';
      onUpdateElement(elementId, { props: { ...element.props, fontStyle: newStyle } });
    }
  }, [page.elements, onUpdateElement]);

  const handleUnderline = useCallback((elementId: string) => {
    const element = page.elements.find(el => el.id === elementId);
    if (element) {
      const currentDecoration = element.props.textDecoration || 'none';
      const newDecoration = currentDecoration === 'underline' ? 'none' : 'underline';
      onUpdateElement(elementId, { props: { ...element.props, textDecoration: newDecoration } });
    }
  }, [page.elements, onUpdateElement]);

  const handleTextAlign = useCallback((elementId: string, align: string) => {
    const element = page.elements.find(el => el.id === elementId);
    if (element) {
      onUpdateElement(elementId, { props: { ...element.props, textAlign: align } });
    }
  }, [page.elements, onUpdateElement]);

  const handleColorChange = useCallback((elementId: string, color: string) => {
    const element = page.elements.find(el => el.id === elementId);
    if (element) {
      onUpdateElement(elementId, { props: { ...element.props, color } });
      setShowColorPicker(null);
    }
  }, [page.elements, onUpdateElement]);

  const handleFontSizeChange = useCallback((elementId: string, size: number) => {
    const element = page.elements.find(el => el.id === elementId);
    if (element) {
      onUpdateElement(elementId, { props: { ...element.props, fontSize: size } });
      setShowFontSizePicker(null);
    }
  }, [page.elements, onUpdateElement]);

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
                fontFamily: element.props.fontFamily || 'inherit',
                fontStyle: element.props.fontStyle || 'normal',
                textDecoration: element.props.textDecoration || 'none'
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
                lineHeight: element.props.lineHeight || 1.5,
                fontWeight: element.props.fontWeight || 'normal',
                fontStyle: element.props.fontStyle || 'normal',
                textDecoration: element.props.textDecoration || 'none'
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
                fontWeight: element.props.fontWeight || 'medium',
                fontStyle: element.props.fontStyle || 'normal',
                textDecoration: element.props.textDecoration || 'none',
                textAlign: element.props.textAlign || 'center'
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
                      className="w-full h-full flex items-center justify-between px-4 border-b cursor-pointer transition-all duration-200 hover:shadow-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#1f2937',
                        color: element.props.textColor || '#ffffff',
                        paddingTop: element.props.paddingTop || 16,
                        paddingRight: element.props.paddingRight || 24,
                        paddingBottom: element.props.paddingBottom || 16,
                        paddingLeft: element.props.paddingLeft || 24,
                        marginTop: element.props.marginTop || 0,
                        marginRight: element.props.marginRight || 0,
                        marginBottom: element.props.marginBottom || 0,
                        marginLeft: element.props.marginLeft || 0,
                        borderWidth: element.props.borderWidth || 0,
                        borderStyle: element.props.borderStyle || 'solid',
                        borderColor: element.props.borderColor || 'transparent',
                        borderRadius: element.props.borderRadius || 0,
                        boxShadow: element.props.shadowX || element.props.shadowY || element.props.shadowBlur || element.props.shadowColor 
                          ? `${element.props.shadowX || 0}px ${element.props.shadowY || 2}px ${element.props.shadowBlur || 4}px ${element.props.shadowColor || 'rgba(0, 0, 0, 0.1)'}`
                          : 'none',
                        backgroundImage: element.props.backgroundImage ? `url(${element.props.backgroundImage})` : 'none',
                        backgroundPosition: element.props.backgroundPosition || 'center',
                        backgroundSize: element.props.backgroundSize || 'cover',
                        backgroundRepeat: element.props.backgroundRepeat || 'no-repeat',
                        display: element.props.display || 'flex',
                        alignItems: element.props.alignItems || 'center',
                        justifyContent: element.props.justifyContent || 'space-between',
                        position: element.props.position || 'sticky',
                        top: element.props.top || 0,
                        zIndex: element.props.zIndex || 1000,
                        overflow: element.props.overflow || 'visible',
                        minHeight: element.props.minHeight || 80,
                        maxWidth: element.props.maxWidth || '100%'
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
                      <div 
                        className="font-bold cursor-pointer transition-all duration-200 hover:scale-105"
                        style={{
                          fontSize: element.props.logoFontSize || 24,
                          fontWeight: element.props.logoFontWeight || 'bold',
                          color: element.props.logoColor || '#ffffff',
                          width: element.props.logoWidth || 120,
                          height: element.props.logoHeight || 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: element.props.logoPosition === 'center' ? 'center' : 'flex-start'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (element.props.logoLink) {
                            if (element.props.logoLinkTarget === '_blank') {
                              window.open(element.props.logoLink, '_blank', 'noopener,noreferrer');
                            } else {
                              window.location.href = element.props.logoLink;
                            }
                          }
                        }}
                      >
                        {element.props.logoImageUrl ? (
                          <img 
                            src={element.props.logoImageUrl} 
                            alt={element.props.logoText || 'Logo'}
                            style={{
                              width: element.props.logoWidth || 120,
                              height: element.props.logoHeight || 40,
                              objectFit: 'contain'
                            }}
                          />
                        ) : (
                          element.props.logoText || 'Logo'
                        )}
                      </div>
                      <div 
                        className="flex"
                        style={{
                          gap: element.props.navSpacing || 24
                        }}
                      >
                        {(element.props.navItems || []).map((item: any, index: number) => (
                          <span 
                            key={index} 
                            className="hover:underline cursor-pointer transition-all duration-200 hover:scale-105"
                            style={{
                              fontSize: element.props.navFontSize || 16,
                              fontWeight: element.props.navFontWeight || 'medium',
                              color: element.props.navColor || '#ffffff',
                              padding: `${element.props.navPadding || 12}px`,
                              borderRadius: `${element.props.navBorderRadius || 6}px`,
                              transition: element.props.navTransition || 'all 0.3s ease',
                              transform: 'translateY(0)',
                              boxShadow: 'none'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = element.props.navHoverColor || '#f3f4f6';
                              e.currentTarget.style.backgroundColor = element.props.navHoverBackground || 'rgba(255, 255, 255, 0.1)';
                              e.currentTarget.style.transform = element.props.navTransform || 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = element.props.navShadow || '0 4px 8px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = element.props.navColor || '#ffffff';
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.link) {
                                if (item.target === '_blank') {
                                  window.open(item.link, '_blank', 'noopener,noreferrer');
                                } else {
                                  window.location.href = item.link;
                                }
                              }
                            }}
                          >
                            {typeof item === 'string' ? item : item.label}
                         </span>
                       ))}
                     </div>
                   </div>
                 )}

                {element.type === 'footer' && (
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundColor: element.props.backgroundColor || '#374151',
                      color: element.props.textColor || '#ffffff',
                      paddingTop: element.props.paddingY ?? 16,
                      paddingBottom: element.props.paddingY ?? 16,
                      paddingLeft: element.props.paddingX ?? 24,
                      paddingRight: element.props.paddingX ?? 24
                    }}
                  >
                    <div className="w-full h-full flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-sm whitespace-pre-line">
                          {element.props.copyright || '© 2025 Your Company'}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-3 justify-center text-sm">
                            {(element.props.links || []).map((ln: any, idx: number) => (
                              <span key={idx} className="underline cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                if (ln?.href) {
                                  if (ln?.target === '_blank') {
                                    window.open(ln.href, '_blank', 'noopener,noreferrer');
                                  } else {
                                    window.location.href = ln.href;
                                  }
                                }
                              }}>
                                {typeof ln === 'string' ? ln : (ln?.label || 'Link')}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right text-sm min-w-[180px]">
                          {element.props.address && <div>{element.props.address}</div>}
                          {element.props.phone && <div>{element.props.phone}</div>}
                          {element.props.email && <div>{element.props.email}</div>}
                        </div>
                      </div>

                      {element.props.showMap && element.props.mapEmbedUrl && (() => {
                        let embedUrl = String(element.props.mapEmbedUrl || '').trim();
                        if (embedUrl.toLowerCase().includes('<iframe')) {
                          const m = embedUrl.match(/src=["']([^"']+)["']/i);
                          if (m && m[1]) embedUrl = m[1];
                        }
                        // normalize protocol slashes (e.g., https:/ -> https://)
                        if (/^https?:\/(?!\/)/i.test(embedUrl)) {
                          embedUrl = embedUrl.replace(/^https?:\//i, (p) => p + '/');
                        }
                        if (!/^https?:\/\//i.test(embedUrl)) {
                          // if still not an absolute URL, don't render
                          return null;
                        }
                        return (
                        <div className="w-full overflow-hidden rounded-md border border-white/10">
                          <iframe
                            src={embedUrl}
                            className="w-full"
                            style={{ height: `${element.props.mapHeight ?? 220}px`, border: 0, pointerEvents: 'none' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {element.type === 'carousel' && (
                  <CanvasCarousel element={element} />
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

                 {/* New Advanced Elements */}
                 {element.type === 'grid-layout' && (
                   <div
                     className="w-full h-full border-2 border-dashed border-gray-300 rounded-md p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#f8f9fa',
                       display: 'grid',
                       gridTemplateColumns: `repeat(${element.props.columns || 3}, 1fr)`,
                       gap: `${element.props.gap || 16}px`,
                       padding: `${element.props.padding || 20}px`
                     }}
                   >
                     <div className="bg-white rounded p-2 text-xs text-center">Grid Item 1</div>
                     <div className="bg-white rounded p-2 text-xs text-center">Grid Item 2</div>
                     <div className="bg-white rounded p-2 text-xs text-center">Grid Item 3</div>
                   </div>
                 )}

                 {element.type === 'flex-layout' && (
                   <div
                     className="w-full h-full border-2 border-dashed border-gray-300 rounded-md p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#f8f9fa',
                       display: 'flex',
                       flexDirection: element.props.direction || 'row',
                       justifyContent: element.props.justifyContent || 'center',
                       alignItems: element.props.alignItems || 'center',
                       gap: `${element.props.gap || 16}px`,
                       padding: `${element.props.padding || 20}px`
                     }}
                   >
                     <div className="bg-white rounded p-2 text-xs">Flex Item 1</div>
                     <div className="bg-white rounded p-2 text-xs">Flex Item 2</div>
                     <div className="bg-white rounded p-2 text-xs">Flex Item 3</div>
                   </div>
                 )}

                  {element.type === 'video-player' && (
                    <div className="w-full h-full rounded-lg overflow-hidden bg-black">
                      {(() => {
                        const src: string = element.props.src || '';
                        const autoplay = element.props.autoplay ? 1 : 0;
                        const controls = element.props.controls === false ? 0 : 1;
                        const loop = element.props.loop ? 1 : 0;
                        const muted = element.props.muted ? 1 : 0;
                        const start = parseInt(element.props.start || 0);
                        const objectFit = element.props.objectFit || 'cover';
                        const poster = element.props.poster;
                        const isMoving = isDragging || isResizing;

                        const toYouTubeEmbed = (url: string) => {
                          try {
                            if (!url) return null;
                            const ytShort = url.match(/^https?:\/\/youtu\.be\/([\w-]{6,})/i);
                            if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
                            const ytWatch = url.match(/[?&]v=([\w-]{6,})/i);
                            if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
                            const ytEmbed = url.match(/^https?:\/\/(www\.)?youtube\.com\/embed\/([\w-]{6,})/i);
                            if (ytEmbed) return `https://www.youtube.com/embed/${ytEmbed[2]}`;
                            return null;
                          } catch { return null; }
                        };

                        const yt = toYouTubeEmbed(src);
                        if (yt && !isMoving) {
                          const params = new URLSearchParams({ autoplay: String(autoplay), controls: String(controls), loop: String(loop), mute: String(muted), start: String(start) });
                          const embedUrl = `${yt}?${params.toString()}`;
                          return (
                            <div className="relative w-full h-full" style={{ backgroundColor: '#000' }}>
                              <iframe
                                src={embedUrl}
                                title={element.props.title || 'YouTube video'}
                                className="absolute inset-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ pointerEvents: 'none' }}
                              />
                            </div>
                          );
                        }

                        // If dragging/resizing, show lightweight placeholder (faster drag)
                        if (isMoving) {
                          return (
                            <div className="relative w-full h-full" style={{ backgroundColor: '#000' }}>
                              {poster ? (
                                <img src={poster} alt="poster" className="absolute inset-0 w-full h-full" style={{ objectFit }} />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">Video (dragging)</div>
                              )}
                            </div>
                          );
                        }

                        // Fallback to native video for direct files (mp4...)
                        return (
                          <div className="relative w-full h-full" style={{ backgroundColor: '#000' }}>
                            <video
                              src={src}
                              className="absolute inset-0 w-full h-full"
                              style={{ objectFit, pointerEvents: 'none' }}
                              controls={element.props.controls !== false}
                              autoPlay={!!element.props.autoplay}
                              loop={!!element.props.loop}
                              muted={!!element.props.muted}
                              poster={poster}
                            />
                          </div>
                        );
                      })()}
                    </div>
                  )}

                 {element.type === 'audio-player' && (
                   <div
                     className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#f8f9fa'
                     }}
                   >
                     <div className="text-gray-600 text-center">
                       <div className="text-lg mb-2">🎵</div>
                       <div className="text-sm">{element.props.title || 'Audio Player'}</div>
                     </div>
                   </div>
                 )}

                 {element.type === 'image-gallery' && (
                   <div
                     className="w-full h-full bg-gray-100 rounded-lg p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#f8f9fa'
                     }}
                   >
                     <div className="text-center text-gray-600">
                       <div className="text-lg mb-2">🖼️</div>
                       <div className="text-sm">Gallery ({element.props.images?.length || 0} images)</div>
                     </div>
                   </div>
                 )}

                 {element.type === 'accordion' && (
                   <div
                     className="w-full h-full border rounded-lg p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="text-sm text-gray-600 mb-2">Accordion</div>
                     {(element.props.items || []).map((item: any, index: number) => (
                       <div key={index} className="border-b border-gray-200 py-2">
                         <div className="font-medium text-sm">{item.title}</div>
                       </div>
                     ))}
                   </div>
                 )}

                 {element.type === 'tabs' && (
                   <div
                     className="w-full h-full border rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="flex border-b">
                       {(element.props.tabs || []).map((tab: any, index: number) => (
                         <div key={index} className="px-4 py-2 text-sm border-r">
                           {tab.label}
                         </div>
                       ))}
                     </div>
                     <div className="p-4 text-sm text-gray-600">
                       Tab Content
                     </div>
                   </div>
                 )}

                 {element.type === 'modal' && (
                   <div
                     className="w-full h-full border rounded-lg p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="text-center text-gray-600">
                       <div className="text-lg mb-2">📋</div>
                       <div className="text-sm">Modal Dialog</div>
                     </div>
                   </div>
                 )}

                 {element.type === 'dropdown' && (
                   <div
                     className="w-full h-full border rounded-lg p-2"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="text-sm text-gray-600">{element.props.label || 'Select Option'}</div>
                   </div>
                 )}

                 {element.type === 'data-table' && (
                   <div
                     className="w-full h-full border rounded-lg overflow-hidden"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="text-xs text-gray-500 p-2 border-b">Data Table</div>
                     <div className="p-2 text-xs">
                       <div className="grid grid-cols-3 gap-2 mb-1 font-medium">
                         {(element.props.headers || []).map((header: string, index: number) => (
                           <div key={index}>{header}</div>
                         ))}
                       </div>
                       {(element.props.rows || []).map((row: string[], index: number) => (
                         <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                           {row.map((cell: string, cellIndex: number) => (
                             <div key={cellIndex}>{cell}</div>
                           ))}
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {element.type === 'chart' && (
                   <div
                     className="w-full h-full border rounded-lg p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="text-center text-gray-600">
                       <div className="text-lg mb-2">📊</div>
                       <div className="text-sm">{element.props.type || 'bar'} Chart</div>
                     </div>
                   </div>
                 )}

                 {element.type === 'progress-bar' && (
                   <div
                     className="w-full h-full flex items-center p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#e5e7eb'
                     }}
                   >
                     <div className="w-full">
                       <div className="text-xs text-gray-600 mb-1">{element.props.label || 'Progress'}</div>
                       <div className="w-full bg-gray-200 rounded-full h-2">
                         <div
                           className="h-2 rounded-full"
                           style={{
                             width: `${element.props.value || 0}%`,
                             backgroundColor: element.props.fillColor || '#3b82f6'
                           }}
                         ></div>
                       </div>
                       {element.props.showPercentage && (
                         <div className="text-xs text-gray-600 mt-1">{element.props.value || 0}%</div>
                       )}
                     </div>
                   </div>
                 )}

                 {element.type === 'stats-card' && (
                   <div
                     className="w-full h-full border rounded-lg p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="text-sm text-gray-600">{element.props.title || 'Total Users'}</div>
                     <div className="text-2xl font-bold">{element.props.value || '1,234'}</div>
                     <div className="text-xs text-green-600">{element.props.change || '+12%'}</div>
                   </div>
                 )}

                 {element.type === 'social-links' && (
                   <div
                     className="w-full h-full flex items-center justify-center gap-2 p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || 'transparent'
                     }}
                   >
                     {(element.props.platforms || []).map((platform: string, index: number) => (
                       <div key={index} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                         {platform.charAt(0).toUpperCase()}
                       </div>
                     ))}
                   </div>
                 )}

                 {element.type === 'whatsapp-button' && (
                   <div
                     className="w-full h-full flex items-center justify-center rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#25d366',
                       color: element.props.textColor || '#ffffff'
                     }}
                   >
                     <div className="text-center">
                       <div className="text-lg mb-1">💬</div>
                       <div className="text-sm font-medium">WhatsApp</div>
                     </div>
                   </div>
                 )}

                 {element.type === 'contact-info' && (
                   <div
                     className="w-full h-full border rounded-lg p-4"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <div className="space-y-2 text-sm">
                       <div className="flex items-center gap-2">
                         <span>📞</span>
                         <span>{element.props.phone || '+1 (555) 123-4567'}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <span>✉️</span>
                         <span>{element.props.email || 'contact@example.com'}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <span>📍</span>
                         <span>{element.props.address || '123 Main St, City, State'}</span>
                       </div>
                     </div>
                   </div>
                 )}

                 {element.type === 'search-bar' && (
                   <div
                     className="w-full h-full border rounded-lg flex items-center p-2"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#ffffff',
                       borderColor: element.props.borderColor || '#e5e7eb'
                     }}
                   >
                     <input
                       type="text"
                       className="flex-1 text-sm outline-none"
                       placeholder={element.props.placeholder || 'Search...'}
                     />
                     <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-xs">
                       {element.props.buttonText || 'Search'}
                     </button>
                   </div>
                 )}

                 {element.type === 'timer' && (
                   <div
                     className="w-full h-full flex items-center justify-center rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#1f2937',
                       color: element.props.textColor || '#ffffff'
                     }}
                   >
                     <div className="text-center">
                       <div className="text-lg mb-1">⏰</div>
                       <div className="text-sm">Countdown Timer</div>
                     </div>
                   </div>
                 )}

                 {element.type === 'rating' && (
                   <div className="w-full h-full flex items-center gap-1 p-2">
                     {Array.from({ length: element.props.max || 5 }).map((_, index) => (
                       <span
                         key={index}
                         className="text-lg"
                         style={{
                           color: index < (element.props.value || 0) ? (element.props.color || '#fbbf24') : '#e5e7eb'
                         }}
                       >
                         ★
                       </span>
                     ))}
                     {element.props.showValue && (
                       <span className="text-sm text-gray-600 ml-2">{element.props.value || 0}</span>
                     )}
                   </div>
                 )}

                 {element.type === 'badge' && (
                   <div
                     className="w-full h-full flex items-center justify-center rounded-lg"
                     style={{
                       backgroundColor: element.props.backgroundColor || '#dbeafe',
                       color: element.props.color || '#3b82f6'
                     }}
                   >
                     <span className="text-sm font-medium">{element.props.text || 'New'}</span>
                   </div>
                 )}

                 {element.type === 'divider' && (
                   <div
                     className="w-full h-full flex items-center justify-center"
                     style={{
                       backgroundColor: 'transparent'
                     }}
                   >
                     <div
                       className="w-full"
                       style={{
                         height: `${element.props.thickness || 2}px`,
                         backgroundColor: element.props.color || '#e5e7eb'
                       }}
                     ></div>
                   </div>
                 )}
        </div>

        {/* Element Actions Overlay */}
        {(isSelected || showElementActions === element.id) && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-gray-900/95 backdrop-blur-sm text-white rounded-lg px-4 py-2 text-xs shadow-xl border border-gray-700/50 w-auto max-w-none">
            {/* Text Editor Buttons - Only for text elements */}
            {isTextElement(element) && (
              <>
            <Button
              size="sm"
              variant="ghost"
                  className={cn(
                    "h-7 w-7 p-0 transition-all duration-200 hover:scale-105",
                    element.props.fontWeight === 'bold' 
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBold(element.id);
                  }}
                >
                  <Bold className="h-3.5 w-3.5" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 w-7 p-0 transition-all duration-200 hover:scale-105",
                    element.props.fontStyle === 'italic' 
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItalic(element.id);
                  }}
                >
                  <Italic className="h-3.5 w-3.5" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 w-7 p-0 transition-all duration-200 hover:scale-105",
                    element.props.textDecoration === 'underline' 
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnderline(element.id);
                  }}
                >
                  <Underline className="h-3.5 w-3.5" />
                </Button>

                <div className="w-px h-5 bg-gray-600/50 mx-1.5"></div>

                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 w-7 p-0 transition-all duration-200 hover:scale-105",
                    element.props.textAlign === 'left' 
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTextAlign(element.id, 'left');
                  }}
                >
                  <AlignLeft className="h-3.5 w-3.5" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 w-7 p-0 transition-all duration-200 hover:scale-105",
                    element.props.textAlign === 'center' 
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTextAlign(element.id, 'center');
                  }}
                >
                  <AlignCenter className="h-3.5 w-3.5" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 w-7 p-0 transition-all duration-200 hover:scale-105",
                    element.props.textAlign === 'right' 
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTextAlign(element.id, 'right');
                  }}
                >
                  <AlignRight className="h-3.5 w-3.5" />
                </Button>

                <div className="w-px h-5 bg-gray-600/50 mx-1.5"></div>

                {/* Font Size */}
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 hover:scale-105 min-w-[60px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFontSizePicker(showFontSizePicker === element.id ? null : element.id);
                    }}
                  >
                    <Type className="h-3.5 w-3.5 mr-1.5" />
                    <span className="text-xs font-medium">
                      {element.props.fontSize || (element.type === 'heading' ? 32 : 16)}
                    </span>
                  </Button>
                  
                  {showFontSizePicker === element.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl p-3 w-40 z-50">
                      <div className="grid grid-cols-3 gap-1.5">
                        {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map(size => (
                          <Button
                            key={size}
                            size="sm"
                            variant="ghost"
                            className={cn(
                              "h-7 text-xs transition-all duration-200 hover:scale-105",
                              element.props.fontSize === size 
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                            )}
                            onClick={() => handleFontSizeChange(element.id, size)}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Picker */}
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowColorPicker(showColorPicker === element.id ? null : element.id);
                    }}
                  >
                    <Palette className="h-3.5 w-3.5" />
                  </Button>
                  
                  {showColorPicker === element.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg shadow-xl p-3 w-52 z-50">
                      <div className="grid grid-cols-7 gap-2">
                        {['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ff0000', '#ff6600', '#ffcc00', '#00ff00', '#00ccff', '#0066ff', '#6600ff', '#ff00ff', '#ffffff'].map(color => (
                          <button
                            key={color}
                            className={cn(
                              "w-7 h-7 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg",
                              element.props.color === color 
                                ? "border-blue-400 shadow-md ring-2 ring-blue-400/50" 
                                : "border-gray-600 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(element.id, color)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-px h-5 bg-gray-600/50 mx-1.5"></div>
              </>
            )}

            {/* Standard Element Actions */}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateElement(element.id, { locked: !element.locked });
              }}
            >
              {element.locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateElement(element.id, { visible: element.visible === false ? true : false });
              }}
            >
              {element.visible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateElement(element.id);
              }}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/30 transition-all duration-200 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteElement(element.id);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
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
