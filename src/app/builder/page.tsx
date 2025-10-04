"use client";

import { useState, useCallback, useRef } from "react";
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
  type: 'text' | 'image' | 'button' | 'section' | 'container' | 'heading' | 'paragraph' | 'spacer' | 'header' | 'footer' | 'carousel' | 'hero' | 'pricing-card' | 'testimonial' | 'feature-list' | 'cta' | 'contact-form' | 'newsletter';
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

  const canvasRef = useRef<HTMLDivElement>(null);

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
                <ElementLibrary 
                  onAddElement={addElement}
                  category="basic"
                />
              </TabsContent>
              <TabsContent value="advanced" className="mt-3">
                <ElementLibrary 
                  onAddElement={addElement}
                  category="advanced"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
                     <div>
                       <h3 className="text-xs font-medium text-muted-foreground mb-2">LAYOUT</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'container',
                             position: { x: 100, y: 100 },
                             size: { width: 300, height: 200 },
                             props: { backgroundColor: '#f8f9fa', padding: 20 }
                           })}
                         >
                           <Grid className="h-6 w-6" />
                           <span className="text-xs">Container</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'section',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 300 },
                             props: { backgroundColor: '#ffffff', padding: 40 }
                           })}
                         >
                           <Layout className="h-6 w-6" />
                           <span className="text-xs">Section</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'header',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 80 },
                             props: { 
                               backgroundColor: '#1f2937', 
                               textColor: '#ffffff',
                               logoText: 'Your Logo',
                               navItems: ['Home', 'About', 'Contact']
                             }
                           })}
                         >
                           <Layout className="h-6 w-6" />
                           <span className="text-xs">Header</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'footer',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 120 },
                             props: { 
                               backgroundColor: '#374151', 
                               textColor: '#ffffff',
                               copyright: '© 2024 Your Company'
                             }
                           })}
                         >
                           <Layout className="h-6 w-6" />
                           <span className="text-xs">Footer</span>
                         </Button>
                       </div>
                     </div>

              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2">CONTENT</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-20 flex flex-col gap-1"
                    onClick={() => addElement({
                      type: 'heading',
                      position: { x: 100, y: 100 },
                      size: { width: 300, height: 60 },
                      props: { 
                        text: 'Heading Text',
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#000000'
                      }
                    })}
                  >
                    <Type className="h-6 w-6" />
                    <span className="text-xs">Heading</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-20 flex flex-col gap-1"
                    onClick={() => addElement({
                      type: 'paragraph',
                      position: { x: 100, y: 100 },
                      size: { width: 300, height: 100 },
                      props: { 
                        text: 'Paragraph text goes here...',
                        fontSize: 16,
                        color: '#666666'
                      }
                    })}
                  >
                    <Type className="h-6 w-6" />
                    <span className="text-xs">Text</span>
                  </Button>
                </div>
              </div>

                     <div>
                       <h3 className="text-xs font-medium text-muted-foreground mb-2">MEDIA & INTERACTIVE</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'image',
                             position: { x: 100, y: 100 },
                             size: { width: 200, height: 150 },
                             props: {
                               src: '/placeholder-image.jpg',
                               alt: 'Image',
                               objectFit: 'cover'
                             }
                           })}
                         >
                           <Image className="h-6 w-6" />
                           <span className="text-xs">Image</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'button',
                             position: { x: 100, y: 100 },
                             size: { width: 120, height: 40 },
                             props: {
                               text: 'Click Me',
                               backgroundColor: '#3b82f6',
                               color: '#ffffff',
                               borderRadius: 8
                             }
                           })}
                         >
                           <MousePointer className="h-6 w-6" />
                           <span className="text-xs">Button</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'carousel',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 250 },
                             props: {
                               images: [
                                 { src: '/placeholder-image.jpg', alt: 'Slide 1' },
                                 { src: '/placeholder-image.jpg', alt: 'Slide 2' },
                                 { src: '/placeholder-image.jpg', alt: 'Slide 3' }
                               ],
                               autoplay: true,
                               showDots: true
                             }
                           })}
                         >
                           <Image className="h-6 w-6" />
                           <span className="text-xs">Carousel</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'hero',
                             position: { x: 100, y: 100 },
                             size: { width: 500, height: 300 },
                             props: {
                               title: 'Welcome to Our Site',
                               subtitle: 'This is a hero section',
                               buttonText: 'Get Started',
                               backgroundImage: '/placeholder-image.jpg',
                               overlay: true
                             }
                           })}
                         >
                           <Layout className="h-6 w-6" />
                           <span className="text-xs">Hero</span>
                         </Button>
                       </div>
                     </div>

                     <div>
                       <h3 className="text-xs font-medium text-muted-foreground mb-2">MARKETING</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'pricing-card',
                             position: { x: 100, y: 100 },
                             size: { width: 300, height: 400 },
                             props: {
                               title: 'Premium Plan',
                               price: '$29',
                               period: '/month',
                               features: ['Feature 1', 'Feature 2', 'Feature 3'],
                               buttonText: 'Get Started',
                               popular: false
                             }
                           })}
                         >
                           <Square className="h-6 w-6" />
                           <span className="text-xs">Pricing</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'testimonial',
                             position: { x: 100, y: 100 },
                             size: { width: 350, height: 200 },
                             props: {
                               quote: 'This product is amazing!',
                               author: 'John Doe',
                               role: 'CEO, Company',
                               avatar: '/placeholder-avatar.jpg',
                               rating: 5
                             }
                           })}
                         >
                           <Square className="h-6 w-6" />
                           <span className="text-xs">Testimonial</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'feature-list',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 300 },
                             props: {
                               title: 'Our Features',
                               features: [
                                 { icon: '✓', text: 'Feature 1', description: 'Description 1' },
                                 { icon: '✓', text: 'Feature 2', description: 'Description 2' },
                                 { icon: '✓', text: 'Feature 3', description: 'Description 3' }
                               ]
                             }
                           })}
                         >
                           <Square className="h-6 w-6" />
                           <span className="text-xs">Features</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'cta',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 150 },
                             props: {
                               title: 'Ready to Get Started?',
                               subtitle: 'Join thousands of satisfied customers',
                               buttonText: 'Start Free Trial',
                               backgroundColor: '#3b82f6',
                               textColor: '#ffffff'
                             }
                           })}
                         >
                           <Square className="h-6 w-6" />
                           <span className="text-xs">CTA</span>
                         </Button>
                       </div>
                     </div>

                     <div>
                       <h3 className="text-xs font-medium text-muted-foreground mb-2">FORMS</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'contact-form',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 500 },
                             props: {
                               title: 'Contact Us',
                               fields: [
                                 { type: 'text', name: 'name', label: 'Name', required: true },
                                 { type: 'email', name: 'email', label: 'Email', required: true },
                                 { type: 'textarea', name: 'message', label: 'Message', required: true }
                               ],
                               buttonText: 'Send Message'
                             }
                           })}
                         >
                           <Square className="h-6 w-6" />
                           <span className="text-xs">Contact Form</span>
                         </Button>
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'newsletter',
                             position: { x: 100, y: 100 },
                             size: { width: 400, height: 120 },
                             props: {
                               title: 'Subscribe to Newsletter',
                               subtitle: 'Get the latest updates',
                               placeholder: 'Enter your email',
                               buttonText: 'Subscribe'
                             }
                           })}
                         >
                           <Square className="h-6 w-6" />
                           <span className="text-xs">Newsletter</span>
                         </Button>
                       </div>
                     </div>

                     <div>
                       <h3 className="text-xs font-medium text-muted-foreground mb-2">SPACING</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           className="h-20 flex flex-col gap-1"
                           onClick={() => addElement({
                             type: 'spacer',
                             position: { x: 100, y: 100 },
                             size: { width: 200, height: 50 },
                             props: { backgroundColor: '#f3f4f6' }
                           })}
                         >
                           <Square className="h-6 w-6" />
                           <span className="text-xs">Spacer</span>
                         </Button>
                       </div>
                     </div>
            </div>
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
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/api/landing-pages`, {
              method: 'POST',
              headers: getAuthHeaders(),
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || 'Failed to save landing page');
            }

            const result = await response.json();
            console.log('Landing page saved:', result);
          } catch (error) {
            console.error('Error saving landing page:', error);
            throw error;
          }
        }}
        currentPage={currentPage}
      />
    </div>
  );
}
