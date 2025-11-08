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
import { ElementRenderer } from "@/components/builder/elements/renderers";
import CanvasCarousel from "@/components/builder/renderers/CanvasCarousel";

interface BuilderCanvasProps {
  page: BuilderPage;
  selectedElement: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<BuilderElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onDuplicateElement: (elementId: string) => void;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  showSmartGuides?: boolean;
}

 

const BuilderCanvas = forwardRef<HTMLDivElement, BuilderCanvasProps>(({
  page,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  deviceMode,
  showSmartGuides = true
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
  const [smartGuides, setSmartGuides] = useState<{
    vertical: number[];
    horizontal: number[];
    alignments: { type: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'; elementId: string; position: number }[];
    distances: { type: 'horizontal' | 'vertical'; distance: number; x: number; y: number; element1Id: string; element2Id: string }[];
  } | null>(null);
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
            // Calculate boundaries based on maxWidth
            // Elements are now positioned absolute within a centered container with maxWidth
            // So boundaries are relative to that container (0 to maxWidth - element.width)
            const maxWidth = page.settings.maxWidth;
            
            // Boundaries relative to the centered container (elements are positioned relative to container)
            const leftBoundary = 0;
            const rightBoundary = maxWidth - element.size.width;
            
            // Constrain X position within boundaries
            const newX = Math.max(leftBoundary, Math.min(rightBoundary, element.position.x + payload.deltaX));
            const newY = Math.max(0, element.position.y + payload.deltaY);
            
            let finalX = newX;
            let finalY = newY;
            
            if (showSmartGuides) {
              // Create temporary element with new position for smart guides calculation
              const tempElement = { ...element, position: { x: newX, y: newY } };
              const guides = calculateSmartGuides(tempElement, page.elements);
              
              // Snap to vertical guides
              if (guides.vertical.length > 0) {
                const closestVertical = guides.vertical.reduce((prev, curr) => 
                  Math.abs(curr - newX) < Math.abs(prev - newX) ? curr : prev
                );
                if (Math.abs(closestVertical - newX) < 10) {
                  finalX = closestVertical;
                }
              }
              
              // Snap to horizontal guides
              if (guides.horizontal.length > 0) {
                const closestHorizontal = guides.horizontal.reduce((prev, curr) => 
                  Math.abs(curr - newY) < Math.abs(prev - newY) ? curr : prev
                );
                if (Math.abs(closestHorizontal - newY) < 10) {
                  finalY = closestHorizontal;
                }
              }
              
              // Update smart guides state
              setSmartGuides(guides.vertical.length > 0 || guides.horizontal.length > 0 ? guides : null);
            } else {
              setSmartGuides(null);
            }
            
            onUpdateElement(payload.elementId, {
              position: { x: finalX, y: finalY }
            });
          } else if (payload.type === 'resize' && payload.handle) {
            // Calculate boundaries for resize
            // Elements are now positioned absolute within a centered container with maxWidth
            // So boundaries are relative to that container (0 to maxWidth)
            const maxWidth = page.settings.maxWidth;
            
            // Boundaries relative to the centered container (elements are positioned relative to container)
            const leftBoundary = 0;
            const rightBoundary = maxWidth;
            
            const newSize = { ...element.size } as { width: number; height: number };
            const newPosition = { ...element.position } as { x: number; y: number };
            
            switch (payload.handle) {
              case 'nw':
                newSize.width = Math.max(20, element.size.width - payload.deltaX);
                newSize.height = Math.max(20, element.size.height - payload.deltaY);
                newPosition.x = element.position.x + payload.deltaX;
                newPosition.y = element.position.y + payload.deltaY;
                // Constrain to boundaries
                newPosition.x = Math.max(leftBoundary, Math.min(rightBoundary - newSize.width, newPosition.x));
                newSize.width = Math.min(newSize.width, rightBoundary - newPosition.x);
                break;
              case 'ne':
                newSize.width = Math.max(20, element.size.width + payload.deltaX);
                newSize.height = Math.max(20, element.size.height - payload.deltaY);
                newPosition.y = element.position.y + payload.deltaY;
                // Constrain to boundaries
                newSize.width = Math.min(newSize.width, rightBoundary - newPosition.x);
                break;
              case 'sw':
                newSize.width = Math.max(20, element.size.width - payload.deltaX);
                newSize.height = Math.max(20, element.size.height + payload.deltaY);
                newPosition.x = element.position.x + payload.deltaX;
                // Constrain to boundaries
                newPosition.x = Math.max(leftBoundary, Math.min(rightBoundary - newSize.width, newPosition.x));
                newSize.width = Math.min(newSize.width, rightBoundary - newPosition.x);
                break;
              case 'se':
                newSize.width = Math.max(20, element.size.width + payload.deltaX);
                newSize.height = Math.max(20, element.size.height + payload.deltaY);
                // Constrain to boundaries
                newSize.width = Math.min(newSize.width, rightBoundary - newPosition.x);
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
                // Constrain to boundaries
                newPosition.x = Math.max(leftBoundary, Math.min(rightBoundary - newSize.width, newPosition.x));
                newSize.width = Math.min(newSize.width, rightBoundary - newPosition.x);
                break;
              case 'e':
                newSize.width = Math.max(20, element.size.width + payload.deltaX);
                // Constrain to boundaries
                newSize.width = Math.min(newSize.width, rightBoundary - newPosition.x);
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
      setSmartGuides(null); // Clear smart guides when drag ends
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

  // Smart Guides calculation
  const calculateSmartGuides = useCallback((draggedElement: BuilderElement, allElements: BuilderElement[]) => {
    const threshold = 5; // Snap distance in pixels
    const distanceThreshold = 200; // Show distance measurements within this range
    const verticalGuides: number[] = [];
    const horizontalGuides: number[] = [];
    const alignments: { type: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'; elementId: string; position: number }[] = [];
    const distances: { type: 'horizontal' | 'vertical'; distance: number; x: number; y: number; element1Id: string; element2Id: string }[] = [];

    const draggedLeft = draggedElement.position.x;
    const draggedRight = draggedElement.position.x + draggedElement.size.width;
    const draggedCenter = draggedElement.position.x + draggedElement.size.width / 2;
    const draggedTop = draggedElement.position.y;
    const draggedBottom = draggedElement.position.y + draggedElement.size.height;
    const draggedMiddle = draggedElement.position.y + draggedElement.size.height / 2;

    allElements.forEach(element => {
      if (element.id === draggedElement.id) return;

      const elementLeft = element.position.x;
      const elementRight = element.position.x + element.size.width;
      const elementCenter = element.position.x + element.size.width / 2;
      const elementTop = element.position.y;
      const elementBottom = element.position.y + element.size.height;
      const elementMiddle = element.position.y + element.size.height / 2;

      // Vertical alignments
      if (Math.abs(draggedLeft - elementLeft) < threshold) {
        verticalGuides.push(elementLeft);
        alignments.push({ type: 'left', elementId: element.id, position: elementLeft });
      }
      if (Math.abs(draggedRight - elementRight) < threshold) {
        verticalGuides.push(elementRight);
        alignments.push({ type: 'right', elementId: element.id, position: elementRight });
      }
      if (Math.abs(draggedCenter - elementCenter) < threshold) {
        verticalGuides.push(elementCenter);
        alignments.push({ type: 'center', elementId: element.id, position: elementCenter });
      }
      if (Math.abs(draggedLeft - elementRight) < threshold) {
        verticalGuides.push(elementRight);
      }
      if (Math.abs(draggedRight - elementLeft) < threshold) {
        verticalGuides.push(elementLeft);
      }

      // Horizontal alignments
      if (Math.abs(draggedTop - elementTop) < threshold) {
        horizontalGuides.push(elementTop);
        alignments.push({ type: 'top', elementId: element.id, position: elementTop });
      }
      if (Math.abs(draggedBottom - elementBottom) < threshold) {
        horizontalGuides.push(elementBottom);
        alignments.push({ type: 'bottom', elementId: element.id, position: elementBottom });
      }
      if (Math.abs(draggedMiddle - elementMiddle) < threshold) {
        horizontalGuides.push(elementMiddle);
        alignments.push({ type: 'middle', elementId: element.id, position: elementMiddle });
      }
      if (Math.abs(draggedTop - elementBottom) < threshold) {
        horizontalGuides.push(elementBottom);
      }
      if (Math.abs(draggedBottom - elementTop) < threshold) {
        horizontalGuides.push(elementTop);
      }

      // Distance measurements
      // Horizontal distances (left to right, right to left)
      const horizontalDistance1 = Math.abs(draggedRight - elementLeft);
      const horizontalDistance2 = Math.abs(draggedLeft - elementRight);
      
      if (horizontalDistance1 < distanceThreshold && horizontalDistance1 > 10) {
        distances.push({
          type: 'horizontal',
          distance: Math.round(horizontalDistance1),
          x: (draggedRight + elementLeft) / 2,
          y: Math.min(draggedTop, elementTop) + Math.abs(draggedTop - elementTop) / 2,
          element1Id: draggedElement.id,
          element2Id: element.id
        });
      }
      
      if (horizontalDistance2 < distanceThreshold && horizontalDistance2 > 10) {
        distances.push({
          type: 'horizontal',
          distance: Math.round(horizontalDistance2),
          x: (draggedLeft + elementRight) / 2,
          y: Math.min(draggedTop, elementTop) + Math.abs(draggedTop - elementTop) / 2,
          element1Id: draggedElement.id,
          element2Id: element.id
        });
      }

      // Vertical distances (top to bottom, bottom to top)
      const verticalDistance1 = Math.abs(draggedBottom - elementTop);
      const verticalDistance2 = Math.abs(draggedTop - elementBottom);
      
      if (verticalDistance1 < distanceThreshold && verticalDistance1 > 10) {
        distances.push({
          type: 'vertical',
          distance: Math.round(verticalDistance1),
          x: Math.min(draggedLeft, elementLeft) + Math.abs(draggedLeft - elementLeft) / 2,
          y: (draggedBottom + elementTop) / 2,
          element1Id: draggedElement.id,
          element2Id: element.id
        });
      }
      
      if (verticalDistance2 < distanceThreshold && verticalDistance2 > 10) {
        distances.push({
          type: 'vertical',
          distance: Math.round(verticalDistance2),
          x: Math.min(draggedLeft, elementLeft) + Math.abs(draggedLeft - elementLeft) / 2,
          y: (draggedTop + elementBottom) / 2,
          element1Id: draggedElement.id,
          element2Id: element.id
        });
      }
    });

    return {
      vertical: Array.from(new Set(verticalGuides)),
      horizontal: Array.from(new Set(horizontalGuides)),
      alignments,
      distances
    };
  }, []);

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
          <ElementRenderer element={element} isDragging={isDragging} isResizing={isResizing} />
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
      className="relative w-full h-full"
      onClick={handleCanvasClick}
    >
      {/* Full Width Canvas */}
      <div 
        className="relative bg-white shadow-2xl rounded-lg overflow-hidden w-full"
        style={{
          minHeight: '100vh',
          maxWidth: '100%'
        }}
      >
        {/* Canvas Content */}
        <div 
          ref={canvasScrollRef}
          className="relative w-full overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{
            minHeight: '100vh',
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

            {/* Content Area Boundaries - Visual Guides */}
            <div 
              className="absolute pointer-events-none z-40"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${page.settings.maxWidth}px`,
                minHeight: '100vh',
                maxWidth: 'calc(100% - 40px)'
              }}
            >
              {/* Top Boundary Line */}
              <div 
                className="absolute top-0 left-0 right-0 border-t-2 border-dashed border-blue-500 opacity-70"
                style={{ height: '2px' }}
              >
                <div className="absolute -top-5 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-md font-semibold">
                  Top
                </div>
              </div>

              {/* Left Boundary Line */}
              <div 
                className="absolute top-0 bottom-0 left-0 border-l-2 border-dashed border-blue-500 opacity-70"
                style={{ width: '2px' }}
              >
                <div 
                  className="absolute top-6 -left-10 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-md font-semibold whitespace-nowrap"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                >
                  Left
                </div>
              </div>

              {/* Right Boundary Line */}
              <div 
                className="absolute top-0 bottom-0 right-0 border-r-2 border-dashed border-blue-500 opacity-70"
                style={{ width: '2px' }}
              >
                <div 
                  className="absolute top-6 -right-10 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-md font-semibold whitespace-nowrap"
                  style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
                >
                  Right
                </div>
              </div>

              {/* Max Width Indicator */}
              <div 
                className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg font-mono font-semibold"
              >
                {page.settings.maxWidth}px
              </div>
            </div>

            {/* Smart Guides */}
            {smartGuides && (
              <div className="absolute inset-0 pointer-events-none z-50">
                {/* Vertical Guides */}
                {smartGuides.vertical.map((x, index) => (
                  <div
                    key={`vertical-${index}`}
                    className="absolute top-0 bottom-0 w-px bg-blue-500 opacity-80"
                    style={{ left: x }}
                  />
                ))}
                
                {/* Horizontal Guides */}
                {smartGuides.horizontal.map((y, index) => (
                  <div
                    key={`horizontal-${index}`}
                    className="absolute left-0 right-0 h-px bg-blue-500 opacity-80"
                    style={{ top: y }}
                  />
                ))}
                
                {/* Alignment Indicators */}
                {smartGuides.alignments.map((alignment, index) => {
                  const element = page.elements.find(el => el.id === alignment.elementId);
                  if (!element) return null;
                  
                  return (
                    <div
                      key={`alignment-${index}`}
                      className="absolute bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg"
                      style={{
                        left: alignment.type.includes('left') || alignment.type.includes('right') || alignment.type.includes('center') 
                          ? alignment.position - 20 
                          : element.position.x + element.size.width / 2 - 20,
                        top: alignment.type.includes('top') || alignment.type.includes('bottom') || alignment.type.includes('middle')
                          ? alignment.position - 20
                          : element.position.y + element.size.height / 2 - 20,
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      {alignment.type}
                    </div>
                  );
                })}
                
                {/* Distance Measurements */}
                {smartGuides.distances.map((distance, index) => (
                  <div
                    key={`distance-${index}`}
                    className="absolute bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg font-mono"
                    style={{
                      left: distance.x - 15,
                      top: distance.y - 10,
                      fontSize: '11px',
                      fontWeight: '600',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}
                  >
                    {distance.distance}px
                  </div>
                ))}
              </div>
            )}

            {/* Content Area Container - Max Width Constraint (matches visual guides) */}
            <div 
              className="relative"
              style={{
                margin: '0 auto',
                width: `${page.settings.maxWidth}px`,
                maxWidth: 'calc(100% - 40px)',
                minHeight: '100vh'
              }}
            >
              {/* Elements */}
              {page.elements.map(renderElement)}
              
              {/* Extra Space for Scrolling - Only when needed */}
              {page.elements.length > 0 && (
                <div style={{ height: '50vh', width: '100%' }}></div>
              )}
            </div>
          </div>

          {/* Drop Zone Indicator */}
          {page.elements.length === 0 && (
            <div 
              className="absolute flex items-center justify-center" 
              style={{ 
                minHeight: '100vh',
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${page.settings.maxWidth}px`,
                maxWidth: 'calc(100% - 40px)'
              }}
            >
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
