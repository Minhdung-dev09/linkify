"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Palette, 
  Layout, 
  Type, 
  Image, 
  MousePointer, 
  Eye, 
  Save, 
  Download,
  Plus,
  Grid,
  Smartphone,
  Monitor,
  Tablet,
  Undo,
  Redo,
  Settings,
  Layers,
  Move,
  Copy,
  Trash2,
  Lock,
  Unlock,
  Square
} from "lucide-react";
import { cn } from "@/utils";
import BuilderCanvas from "@/components/builder/BuilderCanvas";
import ElementLibrary from "@/components/builder/ElementLibrary";
import PropertiesPanel from "@/components/builder/PropertiesPanel";
import PreviewMode from "@/components/builder/PreviewMode";
import TemplateGallery from "@/components/builder/TemplateGallery";
import SaveLandingPageDialog from "@/components/builder/SaveLandingPageDialog";
// import AuthDebug from "@/components/builder/AuthDebug";
import { getAuthHeaders } from "@/lib/auth";

export interface BuilderElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'section' | 'container' | 'heading' | 'paragraph' | 'spacer' | 'header' | 'footer' | 'carousel' | 'hero' | 'pricing-card' | 'testimonial' | 'feature-list' | 'cta' | 'contact-form' | 'newsletter' | 'grid-layout' | 'flex-layout' | 'video-player' | 'audio-player' | 'image-gallery' | 'accordion' | 'tabs' | 'modal' | 'dropdown' | 'data-table' | 'chart' | 'progress-bar' | 'stats-card' | 'social-links' | 'whatsapp-button' | 'contact-info' | 'search-bar' | 'timer' | 'rating' | 'badge' | 'divider';
  position: { x: number; y: number };
  size: { width: number; height: number };
  props: Record<string, any>;
  children?: BuilderElement[];
  locked?: boolean;
  visible?: boolean;
}

export interface BuilderPage {
  id: string;
  title: string;
  elements: BuilderElement[];
  settings: {
    backgroundColor: string;
    maxWidth: number;
    padding: number;
  };
}

export default function BuilderPage() {
  const [currentPage, setCurrentPage] = useState<BuilderPage>({
    id: 'page-1',
    title: 'Untitled Page',
    elements: [],
    settings: {
      backgroundColor: '#ffffff',
      maxWidth: 1200,
      padding: 20
    }
  });

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [history, setHistory] = useState<BuilderPage[]>([currentPage]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSmartGuides, setShowSmartGuides] = useState(true);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Lazy-load html2canvas for thumbnail capture
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import('html2canvas');
        if (mounted) {
          (window as any).html2canvas = mod.default || (mod as any);
        }
      } catch (e) {
        // ignore if not available
      }
    })();
    return () => {
      mounted = false;
    }
  }, []);

  // History management
  const saveToHistory = useCallback((newPage: BuilderPage) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPage);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPage(newPage);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPage(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPage(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // Element management
  const addElement = useCallback((element: Omit<BuilderElement, 'id'>) => {
    const newElement: BuilderElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const newPage = {
      ...currentPage,
      elements: [...currentPage.elements, newElement]
    };
    
    saveToHistory(newPage);
    // Auto-select the newly added element
    setSelectedElement(newElement.id);
  }, [currentPage, saveToHistory]);

  const updateElement = useCallback((elementId: string, updates: Partial<BuilderElement>) => {
    const newPage = {
      ...currentPage,
      elements: currentPage.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    };
    
    saveToHistory(newPage);
  }, [currentPage, saveToHistory]);

  const deleteElement = useCallback((elementId: string) => {
    const newPage = {
      ...currentPage,
      elements: currentPage.elements.filter(el => el.id !== elementId)
    };
    
    saveToHistory(newPage);
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  }, [currentPage, selectedElement, saveToHistory]);

  const duplicateElement = useCallback((elementId: string) => {
    const element = currentPage.elements.find(el => el.id === elementId);
    if (element) {
      const newElement: BuilderElement = {
        ...element,
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: {
          x: element.position.x + 20,
          y: element.position.y + 20
        }
      };
      
      const newPage = {
        ...currentPage,
        elements: [...currentPage.elements, newElement]
      };
      
      saveToHistory(newPage);
    }
  }, [currentPage, saveToHistory]);

  const selectedElementData = selectedElement 
    ? currentPage.elements.find(el => el.id === selectedElement) || null
    : null;

  // Debug removed

  if (previewMode) {
    return (
      <PreviewMode 
        page={currentPage}
        deviceMode={deviceMode}
        onClose={() => setPreviewMode(false)}
        onDeviceChange={setDeviceMode}
      />
    );
  }

  if (showTemplates) {
    return (
      <TemplateGallery 
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={(template) => {
          setCurrentPage(template);
          setShowTemplates(false);
        }}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">← Trang chủ</Link>
            </Button>
            <div className="w-px h-5 bg-border" />
            <Palette className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Page Builder</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={historyIndex === 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={historyIndex === history.length - 1}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Device Preview */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={deviceMode === 'desktop' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setDeviceMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceMode === 'tablet' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setDeviceMode('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceMode === 'mobile' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setDeviceMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="outline"
            onClick={() => setShowTemplates(true)}
          >
            <Layout className="h-4 w-4 mr-2" />
            Templates
          </Button>

          <Button
            variant="outline"
            onClick={() => setPreviewMode(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>

          <Button onClick={() => setShowSaveDialog(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          {/* Debug Auth */}
          {/* <AuthDebug /> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Element Library */}
        <div className="w-80 border-r bg-muted/30 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-sm font-medium mb-3">Elements</h2>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="mt-3">
                <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  <ElementLibrary 
                    onAddElement={addElement}
                    category="basic"
                  />
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="mt-3">
                <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  <ElementLibrary 
                    onAddElement={addElement}
                    category="advanced"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Canvas</span>
                <Badge variant="secondary" className="text-xs">
                  {currentPage.elements.length} elements
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSmartGuides(!showSmartGuides)}
                  className={showSmartGuides ? "bg-green-50 text-green-600 border-green-200" : ""}
                >
                  <Layers className="h-4 w-4 mr-2" />
                  {showSmartGuides ? "Hide Smart" : "Show Smart"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newPage = { ...currentPage, elements: [] };
                    saveToHistory(newPage);
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-gray-50">
            <BuilderCanvas
              ref={canvasRef}
              page={currentPage}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
              onDuplicateElement={duplicateElement}
              deviceMode={deviceMode}
              showSmartGuides={showSmartGuides}
            />
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 border-l bg-muted/30">
          <PropertiesPanel
            selectedElement={selectedElementData}
            onUpdateElement={(updates) => {
              if (selectedElement) {
                updateElement(selectedElement, updates);
              }
            }}
            onDeleteElement={() => {
              if (selectedElement) {
                deleteElement(selectedElement);
              }
            }}
            onDuplicateElement={() => {
              if (selectedElement) {
                duplicateElement(selectedElement);
              }
            }}
          />
        </div>
      </div>

      {/* Save Landing Page Dialog */}
          <SaveLandingPageDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={async (data) => {
          try {
            const headers = getAuthHeaders();
            
            // Optionally capture thumbnail via html2canvas if available
            let thumbnail: string | undefined;
            try {
              const el = canvasRef.current;
              if (el && (window as any).html2canvas) {
                const canvas = await (window as any).html2canvas(el, { backgroundColor: currentPage.settings.backgroundColor });
                thumbnail = canvas.toDataURL('image/jpeg', 0.7);
              }
            } catch (_) {}

            const response = await fetch('/api/landing-pages', {
              method: 'POST',
              headers,
              body: JSON.stringify({ ...data, thumbnail }),
            });

            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || 'Failed to save landing page');
            }

            await response.json();
          } catch (error) {
            throw error;
          }
        }}
        currentPage={currentPage}
      />
    </div>
  );
}
