"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Type, 
  Palette, 
  Layout, 
  Move, 
  Copy, 
  Trash2, 
  Lock, 
  Unlock,
  Eye,
  EyeOff,
  Settings,
  Layers
} from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

interface PropertiesPanelProps {
  selectedElement: BuilderElement | null;
  onUpdateElement: (updates: Partial<BuilderElement>) => void;
  onDeleteElement: () => void;
  onDuplicateElement: () => void;
}

const PropertiesPanel = ({ 
  selectedElement, 
  onUpdateElement, 
  onDeleteElement, 
  onDuplicateElement 
}: PropertiesPanelProps) => {
  const [activeTab, setActiveTab] = useState('content');

  if (!selectedElement) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center text-muted-foreground">
          <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Element Selected</h3>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const updateProps = (newProps: Record<string, any>) => {
    onUpdateElement({
      props: { ...selectedElement.props, ...newProps }
    });
  };

  const updatePosition = (x: number, y: number) => {
    onUpdateElement({
      position: { x, y }
    });
  };

  const updateSize = (width: number, height: number) => {
    onUpdateElement({
      size: { width, height }
    });
  };

  const renderContentTab = () => {
    switch (selectedElement.type) {
      case 'heading':
      case 'paragraph':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                value={selectedElement.props.text || ''}
                onChange={(e) => updateProps({ text: e.target.value })}
                placeholder="Enter text content..."
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fontSize">Font Size</Label>
                <Input
                  id="fontSize"
                  type="number"
                  value={selectedElement.props.fontSize || 16}
                  onChange={(e) => updateProps({ fontSize: parseInt(e.target.value) || 16 })}
                />
              </div>
              <div>
                <Label htmlFor="fontWeight">Font Weight</Label>
                <Select
                  value={selectedElement.props.fontWeight || 'normal'}
                  onValueChange={(value) => updateProps({ fontWeight: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="semibold">Semibold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="textAlign">Text Alignment</Label>
              <Select
                value={selectedElement.props.textAlign || 'left'}
                onValueChange={(value) => updateProps({ textAlign: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color">Text Color</Label>
              <Input
                id="color"
                type="color"
                value={selectedElement.props.color || '#000000'}
                onChange={(e) => updateProps({ color: e.target.value })}
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={selectedElement.props.text || ''}
                onChange={(e) => updateProps({ text: e.target.value })}
                placeholder="Button text..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buttonBg">Background Color</Label>
                <Input
                  id="buttonBg"
                  type="color"
                  value={selectedElement.props.backgroundColor || '#3b82f6'}
                  onChange={(e) => updateProps({ backgroundColor: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="buttonColor">Text Color</Label>
                <Input
                  id="buttonColor"
                  type="color"
                  value={selectedElement.props.color || '#ffffff'}
                  onChange={(e) => updateProps({ color: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Slider
                value={[selectedElement.props.borderRadius || 8]}
                onValueChange={([value]) => updateProps({ borderRadius: value })}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {selectedElement.props.borderRadius || 8}px
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageSrc">Image URL</Label>
              <Input
                id="imageSrc"
                value={selectedElement.props.src || ''}
                onChange={(e) => updateProps({ src: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="imageAlt">Alt Text</Label>
              <Input
                id="imageAlt"
                value={selectedElement.props.alt || ''}
                onChange={(e) => updateProps({ alt: e.target.value })}
                placeholder="Image description..."
              />
            </div>

            <div>
              <Label htmlFor="objectFit">Object Fit</Label>
              <Select
                value={selectedElement.props.objectFit || 'cover'}
                onValueChange={(value) => updateProps({ objectFit: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="contain">Contain</SelectItem>
                  <SelectItem value="fill">Fill</SelectItem>
                  <SelectItem value="scale-down">Scale Down</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logoText">Logo Text</Label>
              <Input
                id="logoText"
                value={selectedElement.props.logoText || ''}
                onChange={(e) => updateProps({ logoText: e.target.value })}
                placeholder="Your Logo"
              />
            </div>
            <div>
              <Label htmlFor="navItems">Navigation Items (comma separated)</Label>
              <Input
                id="navItems"
                value={(selectedElement.props.navItems || []).join(', ')}
                onChange={(e) => updateProps({ navItems: e.target.value.split(',').map(item => item.trim()).filter(Boolean) })}
                placeholder="Home, About, Contact"
              />
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="copyright">Copyright Text</Label>
              <Input
                id="copyright"
                value={selectedElement.props.copyright || ''}
                onChange={(e) => updateProps({ copyright: e.target.value })}
                placeholder="© 2024 Your Company"
              />
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Title</Label>
              <Input
                id="heroTitle"
                value={selectedElement.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                placeholder="Welcome to Our Site"
              />
            </div>
            <div>
              <Label htmlFor="heroSubtitle">Subtitle</Label>
              <Textarea
                id="heroSubtitle"
                value={selectedElement.props.subtitle || ''}
                onChange={(e) => updateProps({ subtitle: e.target.value })}
                placeholder="This is a hero section"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="heroButtonText">Button Text</Label>
              <Input
                id="heroButtonText"
                value={selectedElement.props.buttonText || ''}
                onChange={(e) => updateProps({ buttonText: e.target.value })}
                placeholder="Get Started"
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage">Background Image URL</Label>
              <Input
                id="backgroundImage"
                value={selectedElement.props.backgroundImage || ''}
                onChange={(e) => updateProps({ backgroundImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case 'pricing-card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pricingTitle">Title</Label>
              <Input
                id="pricingTitle"
                value={selectedElement.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                placeholder="Premium Plan"
              />
            </div>
            <div>
              <Label htmlFor="pricingPrice">Price</Label>
              <Input
                id="pricingPrice"
                value={selectedElement.props.price || ''}
                onChange={(e) => updateProps({ price: e.target.value })}
                placeholder="$29"
              />
            </div>
            <div>
              <Label htmlFor="pricingPeriod">Period</Label>
              <Input
                id="pricingPeriod"
                value={selectedElement.props.period || ''}
                onChange={(e) => updateProps({ period: e.target.value })}
                placeholder="/month"
              />
            </div>
            <div>
              <Label htmlFor="pricingFeatures">Features (one per line)</Label>
              <Textarea
                id="pricingFeatures"
                value={(selectedElement.props.features || []).join('\n')}
                onChange={(e) => updateProps({ features: e.target.value.split('\n').filter(Boolean) })}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                rows={4}
              />
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="testimonialQuote">Quote</Label>
              <Textarea
                id="testimonialQuote"
                value={selectedElement.props.quote || ''}
                onChange={(e) => updateProps({ quote: e.target.value })}
                placeholder="This product is amazing!"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="testimonialAuthor">Author</Label>
              <Input
                id="testimonialAuthor"
                value={selectedElement.props.author || ''}
                onChange={(e) => updateProps({ author: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="testimonialRole">Role</Label>
              <Input
                id="testimonialRole"
                value={selectedElement.props.role || ''}
                onChange={(e) => updateProps({ role: e.target.value })}
                placeholder="CEO, Company"
              />
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaTitle">Title</Label>
              <Input
                id="ctaTitle"
                value={selectedElement.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                placeholder="Ready to Get Started?"
              />
            </div>
            <div>
              <Label htmlFor="ctaSubtitle">Subtitle</Label>
              <Textarea
                id="ctaSubtitle"
                value={selectedElement.props.subtitle || ''}
                onChange={(e) => updateProps({ subtitle: e.target.value })}
                placeholder="Join thousands of satisfied customers"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="ctaButtonText">Button Text</Label>
              <Input
                id="ctaButtonText"
                value={selectedElement.props.buttonText || ''}
                onChange={(e) => updateProps({ buttonText: e.target.value })}
                placeholder="Start Free Trial"
              />
            </div>
          </div>
        );

      case 'contact-form':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="formTitle">Form Title</Label>
              <Input
                id="formTitle"
                value={selectedElement.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                placeholder="Contact Us"
              />
            </div>
            <div>
              <Label htmlFor="formButtonText">Button Text</Label>
              <Input
                id="formButtonText"
                value={selectedElement.props.buttonText || ''}
                onChange={(e) => updateProps({ buttonText: e.target.value })}
                placeholder="Send Message"
              />
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="newsletterTitle">Title</Label>
              <Input
                id="newsletterTitle"
                value={selectedElement.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                placeholder="Subscribe to Newsletter"
              />
            </div>
            <div>
              <Label htmlFor="newsletterSubtitle">Subtitle</Label>
              <Input
                id="newsletterSubtitle"
                value={selectedElement.props.subtitle || ''}
                onChange={(e) => updateProps({ subtitle: e.target.value })}
                placeholder="Get the latest updates"
              />
            </div>
            <div>
              <Label htmlFor="newsletterPlaceholder">Email Placeholder</Label>
              <Input
                id="newsletterPlaceholder"
                value={selectedElement.props.placeholder || ''}
                onChange={(e) => updateProps({ placeholder: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-muted-foreground py-8">
            <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No content properties available for this element type.</p>
          </div>
        );
    }
  };

  const renderStyleTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            type="number"
            value={selectedElement.size.width}
            onChange={(e) => updateSize(parseInt(e.target.value) || 0, selectedElement.size.height)}
          />
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            value={selectedElement.size.height}
            onChange={(e) => updateSize(selectedElement.size.width, parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="x">X Position</Label>
          <Input
            id="x"
            type="number"
            value={selectedElement.position.x}
            onChange={(e) => updatePosition(parseInt(e.target.value) || 0, selectedElement.position.y)}
          />
        </div>
        <div>
          <Label htmlFor="y">Y Position</Label>
          <Input
            id="y"
            type="number"
            value={selectedElement.position.y}
            onChange={(e) => updatePosition(selectedElement.position.x, parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={selectedElement.props.backgroundColor || '#ffffff'}
          onChange={(e) => updateProps({ backgroundColor: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="padding">Padding</Label>
        <Slider
          value={[selectedElement.props.padding || 0]}
          onValueChange={([value]) => updateProps({ padding: value })}
          max={50}
          step={1}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground mt-1">
          {selectedElement.props.padding || 0}px
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="locked">Locked</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateElement({ locked: !selectedElement.locked })}
        >
          {selectedElement.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="visible">Visible</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateElement({ visible: selectedElement.visible === false ? true : false })}
        >
          {selectedElement.visible === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onDuplicateElement}
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={onDeleteElement}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Properties</h3>
          <Badge variant="secondary" className="text-xs">
            {selectedElement.type}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Element ID: {selectedElement.id.slice(-8)}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="p-4">
            {renderContentTab()}
          </TabsContent>
          
          <TabsContent value="style" className="p-4">
            {renderStyleTab()}
          </TabsContent>
          
          <TabsContent value="settings" className="p-4">
            {renderSettingsTab()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertiesPanel;