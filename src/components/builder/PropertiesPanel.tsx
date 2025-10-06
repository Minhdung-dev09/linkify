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
import CarouselProperties from "@/components/builder/properties/CarouselProperties";
import VideoPlayerProperties from "@/components/builder/properties/VideoPlayerProperties";
import AudioPlayerProperties from "@/components/builder/properties/AudioPlayerProperties";
import FooterProperties from "@/components/builder/properties/FooterProperties";

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

            <Separator />

            <div>
              <Label htmlFor="linkUrl">Link URL</Label>
              <Input
                id="linkUrl"
                value={selectedElement.props.linkUrl || ''}
                onChange={(e) => updateProps({ linkUrl: e.target.value })}
                placeholder="https://example.com or mailto:email@example.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter URL to link to when button is clicked
              </p>
            </div>

            <div>
              <Label htmlFor="linkTarget">Link Target</Label>
              <Select
                value={selectedElement.props.linkTarget || '_self'}
                onValueChange={(value) => updateProps({ linkTarget: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_self">Same Tab</SelectItem>
                  <SelectItem value="_blank">New Tab</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Choose how the link opens
              </p>
            </div>

            <Separator />

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

            <Separator />

            <div>
              <Label htmlFor="imageLinkUrl">Link URL (Optional)</Label>
              <Input
                id="imageLinkUrl"
                value={selectedElement.props.linkUrl || ''}
                onChange={(e) => updateProps({ linkUrl: e.target.value })}
                placeholder="https://example.com or mailto:email@example.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Make image clickable by adding a link
              </p>
            </div>

            <div>
              <Label htmlFor="imageLinkTarget">Link Target</Label>
              <Select
                value={selectedElement.props.linkTarget || '_self'}
                onValueChange={(value) => updateProps({ linkTarget: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_self">Same Tab</SelectItem>
                  <SelectItem value="_blank">New Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

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

      case 'carousel':
        return <CarouselProperties selectedElement={selectedElement} updateProps={updateProps} />;


      case 'footer':
        return <FooterProperties selectedElement={selectedElement} updateProps={updateProps} />;

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

      // New Advanced Elements
        case 'header':
          return (
            <div className="space-y-6">
              {/* Logo Settings */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">L</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-800">Logo Settings</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerLogoText" className="text-sm font-medium text-gray-700">Logo Text</Label>
                    <Input
                      id="headerLogoText"
                      value={selectedElement.props.logoText || ''}
                      onChange={(e) => updateProps({ logoText: e.target.value })}
                      placeholder="Your Logo"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerLogoImage" className="text-sm font-medium text-gray-700">Logo Image URL</Label>
                    <Input
                      id="headerLogoImage"
                      value={selectedElement.props.logoImageUrl || ''}
                      onChange={(e) => updateProps({ logoImageUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerLogoWidth" className="text-sm font-medium text-gray-700">Width</Label>
                    <Input
                      id="headerLogoWidth"
                      type="number"
                      value={selectedElement.props.logoWidth || 120}
                      onChange={(e) => updateProps({ logoWidth: parseInt(e.target.value) || 120 })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerLogoHeight" className="text-sm font-medium text-gray-700">Height</Label>
                    <Input
                      id="headerLogoHeight"
                      type="number"
                      value={selectedElement.props.logoHeight || 40}
                      onChange={(e) => updateProps({ logoHeight: parseInt(e.target.value) || 40 })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerLogoPosition" className="text-sm font-medium text-gray-700">Position</Label>
                    <select
                      id="headerLogoPosition"
                      value={selectedElement.props.logoPosition || 'left'}
                      onChange={(e) => updateProps({ logoPosition: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 bg-white"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerLogoLink" className="text-sm font-medium text-gray-700">Logo Link URL</Label>
                    <Input
                      id="headerLogoLink"
                      value={selectedElement.props.logoLink || ''}
                      onChange={(e) => updateProps({ logoLink: e.target.value })}
                      placeholder="https://example.com"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerLogoLinkTarget" className="text-sm font-medium text-gray-700">Link Target</Label>
                    <select
                      id="headerLogoLinkTarget"
                      value={selectedElement.props.logoLinkTarget || '_self'}
                      onChange={(e) => updateProps({ logoLinkTarget: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 bg-white"
                    >
                      <option value="_self">Same Tab</option>
                      <option value="_blank">New Tab</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-800">Navigation Menu</h3>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="headerNavItems" className="text-sm font-medium text-gray-700">Menu Items (JSON format)</Label>
                  <textarea
                    id="headerNavItems"
                    value={JSON.stringify(selectedElement.props.navItems || [], null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        updateProps({ navItems: parsed });
                      } catch (error) {
                        // Invalid JSON, keep current value
                      }
                    }}
                    placeholder='[{"label": "Home", "link": "#home", "target": "_self"}]'
                    className="w-full px-3 py-3 border border-gray-300 rounded-md h-28 text-xs font-mono focus:border-green-500 focus:ring-green-500 bg-white"
                  />
                  <div className="bg-green-100 border border-green-300 rounded-md p-3">
                    <p className="text-xs text-green-700 font-medium">
                      💡 Format: [{`{"label": "Home", "link": "#home", "target": "_self"}`}]
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Styling */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-800">Menu Styling</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerNavSize" className="text-sm font-medium text-gray-700">Font Size</Label>
                    <Input
                      id="headerNavSize"
                      type="number"
                      value={selectedElement.props.navFontSize || 16}
                      onChange={(e) => updateProps({ navFontSize: parseInt(e.target.value) || 16 })}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerNavColor" className="text-sm font-medium text-gray-700">Text Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="headerNavColor"
                        type="color"
                        value={selectedElement.props.navColor || '#ffffff'}
                        onChange={(e) => updateProps({ navColor: e.target.value })}
                        className="w-12 h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                      <Input
                        value={selectedElement.props.navColor || '#ffffff'}
                        onChange={(e) => updateProps({ navColor: e.target.value })}
                        placeholder="#ffffff"
                        className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerNavHoverColor" className="text-sm font-medium text-gray-700">Hover Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="headerNavHoverColor"
                        type="color"
                        value={selectedElement.props.navHoverColor || '#f3f4f6'}
                        onChange={(e) => updateProps({ navHoverColor: e.target.value })}
                        className="w-12 h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                      <Input
                        value={selectedElement.props.navHoverColor || '#f3f4f6'}
                        onChange={(e) => updateProps({ navHoverColor: e.target.value })}
                        placeholder="#f3f4f6"
                        className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerNavHoverBg" className="text-sm font-medium text-gray-700">Hover Background</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="headerNavHoverBg"
                        type="color"
                        value={selectedElement.props.navHoverBackground || 'rgba(255, 255, 255, 0.1)'}
                        onChange={(e) => updateProps({ navHoverBackground: e.target.value })}
                        className="w-12 h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                      <Input
                        value={selectedElement.props.navHoverBackground || 'rgba(255, 255, 255, 0.1)'}
                        onChange={(e) => updateProps({ navHoverBackground: e.target.value })}
                        placeholder="rgba(255, 255, 255, 0.1)"
                        className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerNavSpacing" className="text-sm font-medium text-gray-700">Spacing</Label>
                    <Input
                      id="headerNavSpacing"
                      type="number"
                      value={selectedElement.props.navSpacing || 24}
                      onChange={(e) => updateProps({ navSpacing: parseInt(e.target.value) || 24 })}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerNavPadding" className="text-sm font-medium text-gray-700">Padding</Label>
                    <Input
                      id="headerNavPadding"
                      type="number"
                      value={selectedElement.props.navPadding || 12}
                      onChange={(e) => updateProps({ navPadding: parseInt(e.target.value) || 12 })}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Header Styling */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-5 border border-orange-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">H</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-800">Header Styling</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerBg" className="text-sm font-medium text-gray-700">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="headerBg"
                        type="color"
                        value={selectedElement.props.backgroundColor || '#1f2937'}
                        onChange={(e) => updateProps({ backgroundColor: e.target.value })}
                        className="w-12 h-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                      <Input
                        value={selectedElement.props.backgroundColor || '#1f2937'}
                        onChange={(e) => updateProps({ backgroundColor: e.target.value })}
                        placeholder="#1f2937"
                        className="flex-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="headerBackgroundImage" className="text-sm font-medium text-gray-700">Background Image URL</Label>
                    <Input
                      id="headerBackgroundImage"
                      value={selectedElement.props.backgroundImage || ''}
                      onChange={(e) => updateProps({ backgroundImage: e.target.value })}
                      placeholder="https://example.com/background.jpg"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="headerPaddingTop" className="text-sm font-medium text-gray-700">Padding Top</Label>
                      <Input
                        id="headerPaddingTop"
                        type="number"
                        value={selectedElement.props.paddingTop || 16}
                        onChange={(e) => updateProps({ paddingTop: parseInt(e.target.value) || 16 })}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="headerPaddingBottom" className="text-sm font-medium text-gray-700">Padding Bottom</Label>
                      <Input
                        id="headerPaddingBottom"
                        type="number"
                        value={selectedElement.props.paddingBottom || 16}
                        onChange={(e) => updateProps({ paddingBottom: parseInt(e.target.value) || 16 })}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Header Link */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🔗</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-800">Header Link</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="headerLink" className="text-sm font-medium text-gray-700">Header Link URL (Optional)</Label>
                  <Input
                    id="headerLink"
                    value={selectedElement.props.linkUrl || ''}
                    onChange={(e) => updateProps({ linkUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>
          );

        case 'grid-layout':
          return (
            <div className="space-y-4">
              <div>
                <Label htmlFor="gridColumns">Columns</Label>
                <Input
                  id="gridColumns"
                  type="number"
                  value={selectedElement.props.columns || 3}
                  onChange={(e) => updateProps({ columns: parseInt(e.target.value) || 3 })}
                />
              </div>
              <div>
                <Label htmlFor="gridGap">Gap (px)</Label>
                <Input
                  id="gridGap"
                  type="number"
                  value={selectedElement.props.gap || 16}
                  onChange={(e) => updateProps({ gap: parseInt(e.target.value) || 16 })}
                />
              </div>
            </div>
          );

      case 'flex-layout':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="flexDirection">Direction</Label>
              <Select
                value={selectedElement.props.direction || 'row'}
                onValueChange={(value) => updateProps({ direction: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">Row</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="justifyContent">Justify Content</Label>
              <Select
                value={selectedElement.props.justifyContent || 'center'}
                onValueChange={(value) => updateProps({ justifyContent: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-end">End</SelectItem>
                  <SelectItem value="space-between">Space Between</SelectItem>
                  <SelectItem value="space-around">Space Around</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'video-player':
        return <VideoPlayerProperties selectedElement={selectedElement} updateProps={updateProps} />;
          

      case 'audio-player':
        return <AudioPlayerProperties selectedElement={selectedElement} updateProps={updateProps} />;
          

      case 'progress-bar':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="progressValue">Value (%)</Label>
              <Input
                id="progressValue"
                type="number"
                value={selectedElement.props.value || 0}
                onChange={(e) => updateProps({ value: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="progressLabel">Label</Label>
              <Input
                id="progressLabel"
                value={selectedElement.props.label || ''}
                onChange={(e) => updateProps({ label: e.target.value })}
                placeholder="Progress"
              />
            </div>
            <div>
              <Label htmlFor="progressFillColor">Fill Color</Label>
              <Input
                id="progressFillColor"
                type="color"
                value={selectedElement.props.fillColor || '#3b82f6'}
                onChange={(e) => updateProps({ fillColor: e.target.value })}
              />
            </div>
          </div>
        );

      case 'stats-card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="statsTitle">Title</Label>
              <Input
                id="statsTitle"
                value={selectedElement.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                placeholder="Total Users"
              />
            </div>
            <div>
              <Label htmlFor="statsValue">Value</Label>
              <Input
                id="statsValue"
                value={selectedElement.props.value || ''}
                onChange={(e) => updateProps({ value: e.target.value })}
                placeholder="1,234"
              />
            </div>
            <div>
              <Label htmlFor="statsChange">Change</Label>
              <Input
                id="statsChange"
                value={selectedElement.props.change || ''}
                onChange={(e) => updateProps({ change: e.target.value })}
                placeholder="+12%"
              />
            </div>
          </div>
        );

      case 'social-links':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="socialPlatforms">Platforms (comma separated)</Label>
              <Input
                id="socialPlatforms"
                value={(selectedElement.props.platforms || []).join(', ')}
                onChange={(e) => updateProps({ platforms: e.target.value.split(',').map(p => p.trim()).filter(Boolean) })}
                placeholder="facebook, twitter, instagram, linkedin"
              />
            </div>
          </div>
        );

      case 'whatsapp-button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="whatsappPhone">Phone Number</Label>
              <Input
                id="whatsappPhone"
                value={selectedElement.props.phoneNumber || ''}
                onChange={(e) => updateProps({ phoneNumber: e.target.value })}
                placeholder="+1234567890"
              />
            </div>
            <div>
              <Label htmlFor="whatsappMessage">Message</Label>
              <Input
                id="whatsappMessage"
                value={selectedElement.props.message || ''}
                onChange={(e) => updateProps({ message: e.target.value })}
                placeholder="Hello!"
              />
            </div>
          </div>
        );

      case 'contact-info':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                value={selectedElement.props.phone || ''}
                onChange={(e) => updateProps({ phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                value={selectedElement.props.email || ''}
                onChange={(e) => updateProps({ email: e.target.value })}
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <Label htmlFor="contactAddress">Address</Label>
              <Input
                id="contactAddress"
                value={selectedElement.props.address || ''}
                onChange={(e) => updateProps({ address: e.target.value })}
                placeholder="123 Main St, City, State"
              />
            </div>
          </div>
        );

      case 'search-bar':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="searchPlaceholder">Placeholder</Label>
              <Input
                id="searchPlaceholder"
                value={selectedElement.props.placeholder || ''}
                onChange={(e) => updateProps({ placeholder: e.target.value })}
                placeholder="Search..."
              />
            </div>
            <div>
              <Label htmlFor="searchButtonText">Button Text</Label>
              <Input
                id="searchButtonText"
                value={selectedElement.props.buttonText || ''}
                onChange={(e) => updateProps({ buttonText: e.target.value })}
                placeholder="Search"
              />
            </div>
          </div>
        );

      case 'timer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="timerTargetDate">Target Date</Label>
              <Input
                id="timerTargetDate"
                type="datetime-local"
                value={selectedElement.props.targetDate || ''}
                onChange={(e) => updateProps({ targetDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="timerFormat">Format</Label>
              <Select
                value={selectedElement.props.format || 'DD:HH:MM:SS'}
                onValueChange={(value) => updateProps({ format: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD:HH:MM:SS">Days:Hours:Minutes:Seconds</SelectItem>
                  <SelectItem value="HH:MM:SS">Hours:Minutes:Seconds</SelectItem>
                  <SelectItem value="MM:SS">Minutes:Seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'rating':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ratingValue">Value</Label>
              <Input
                id="ratingValue"
                type="number"
                step="0.1"
                value={selectedElement.props.value || 0}
                onChange={(e) => updateProps({ value: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="ratingMax">Max Rating</Label>
              <Input
                id="ratingMax"
                type="number"
                value={selectedElement.props.max || 5}
                onChange={(e) => updateProps({ max: parseInt(e.target.value) || 5 })}
              />
            </div>
            <div>
              <Label htmlFor="ratingColor">Color</Label>
              <Input
                id="ratingColor"
                type="color"
                value={selectedElement.props.color || '#fbbf24'}
                onChange={(e) => updateProps({ color: e.target.value })}
              />
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="badgeText">Text</Label>
              <Input
                id="badgeText"
                value={selectedElement.props.text || ''}
                onChange={(e) => updateProps({ text: e.target.value })}
                placeholder="New"
              />
            </div>
            <div>
              <Label htmlFor="badgeColor">Text Color</Label>
              <Input
                id="badgeColor"
                type="color"
                value={selectedElement.props.color || '#3b82f6'}
                onChange={(e) => updateProps({ color: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="badgeBgColor">Background Color</Label>
              <Input
                id="badgeBgColor"
                type="color"
                value={selectedElement.props.backgroundColor || '#dbeafe'}
                onChange={(e) => updateProps({ backgroundColor: e.target.value })}
              />
            </div>
          </div>
        );

      case 'divider':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="dividerThickness">Thickness (px)</Label>
              <Input
                id="dividerThickness"
                type="number"
                value={selectedElement.props.thickness || 2}
                onChange={(e) => updateProps({ thickness: parseInt(e.target.value) || 2 })}
              />
            </div>
            <div>
              <Label htmlFor="dividerColor">Color</Label>
              <Input
                id="dividerColor"
                type="color"
                value={selectedElement.props.color || '#e5e7eb'}
                onChange={(e) => updateProps({ color: e.target.value })}
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