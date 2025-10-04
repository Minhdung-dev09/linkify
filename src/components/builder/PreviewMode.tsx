"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Eye, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Download,
  Share2,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  RefreshCw
} from "lucide-react";
import { BuilderPage } from "@/app/builder/page";

interface PreviewModeProps {
  page: BuilderPage;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  onClose: () => void;
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

const PreviewMode = ({ page, deviceMode, onClose, onDeviceChange }: PreviewModeProps) => {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getDeviceDimensions = () => {
    switch (deviceMode) {
      case 'mobile':
        return { width: 375, height: 667, name: 'Mobile' };
      case 'tablet':
        return { width: 768, height: 1024, name: 'Tablet' };
      default:
        return { width: 1200, height: 800, name: 'Desktop' };
    }
  };

  const deviceDimensions = getDeviceDimensions();

  const renderElement = (element: any) => {
    const elementStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      zIndex: 1,
      opacity: element.visible === false ? 0.5 : 1,
    };

    switch (element.type) {
      case 'heading':
        return (
          <h1 
            key={element.id}
            className="w-full h-full flex items-center"
            style={{
              ...elementStyle,
              fontSize: element.props.fontSize || 32,
              fontWeight: element.props.fontWeight || 'bold',
              color: element.props.color || '#000000',
              textAlign: element.props.textAlign || 'left',
              fontFamily: element.props.fontFamily || 'inherit'
            }}
          >
            {element.props.text || 'Heading Text'}
          </h1>
        );

      case 'paragraph':
        return (
          <p 
            key={element.id}
            className="w-full h-full flex items-start"
            style={{
              ...elementStyle,
              fontSize: element.props.fontSize || 16,
              color: element.props.color || '#666666',
              textAlign: element.props.textAlign || 'left',
              fontFamily: element.props.fontFamily || 'inherit',
              lineHeight: element.props.lineHeight || 1.5
            }}
          >
            {element.props.text || 'Paragraph text goes here...'}
          </p>
        );

      case 'button':
        return (
          <button
            key={element.id}
            className="w-full h-full flex items-center justify-center rounded-md transition-all hover:opacity-90"
            style={{
              ...elementStyle,
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
        );

      case 'image':
        return (
          <div 
            key={element.id}
            className="w-full h-full bg-gray-200 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
            style={{
              ...elementStyle,
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
        );

      case 'container':
        return (
          <div 
            key={element.id}
            className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#f8f9fa',
              padding: element.props.padding || 20
            }}
          >
            <span className="text-gray-500 text-sm">Container</span>
          </div>
        );

      case 'section':
        return (
          <div 
            key={element.id}
            className="w-full h-full border border-gray-200 rounded-md"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#ffffff',
              padding: element.props.padding || 40
            }}
          >
            <div className="text-gray-500 text-sm">Section</div>
          </div>
        );

      case 'spacer':
        return (
          <div 
            key={element.id}
            className="w-full h-full bg-gray-100 border border-gray-200 rounded"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#f3f4f6'
            }}
          >
            <div className="text-gray-500 text-xs text-center">Spacer</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Preview Header */}
      <div className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Preview Mode</h1>
            <Badge variant="secondary" className="text-xs">
              {deviceDimensions.name}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={deviceMode === 'desktop' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onDeviceChange('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceMode === 'tablet' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onDeviceChange('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceMode === 'mobile' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onDeviceChange('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(25, zoom - 25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[3rem] text-center">
              {zoom}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(100)}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
          >
            <Share2 className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Exit Preview
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-8">
        <div 
          className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{
            width: deviceDimensions.width * (zoom / 100),
            height: deviceDimensions.height * (zoom / 100),
            maxWidth: '100%',
            maxHeight: '100%',
            transform: isFullscreen ? 'scale(1)' : `scale(${zoom / 100})`,
            transformOrigin: 'top left'
          }}
        >
          {/* Device Frame */}
          {!isFullscreen && (
            <div className="h-8 bg-gray-100 flex items-center justify-center border-b">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Page Content */}
          <div 
            className="relative w-full overflow-y-auto overflow-x-hidden scroll-smooth"
            style={{
              height: isFullscreen ? '100vh' : deviceDimensions.height - 32,
              backgroundColor: page.settings.backgroundColor,
              padding: page.settings.padding,
              scrollBehavior: 'smooth'
            }}
          >
            {/* Content Container - Dynamic Height Based on Elements */}
            <div style={{ position: 'relative', minHeight: '100vh' }}>
              {/* Elements */}
              {page.elements.map(renderElement)}
              
              {/* Extra Space for Scrolling - Only when needed */}
              {page.elements.length > 0 && (
                <div style={{ height: '50vh', width: '100%' }}></div>
              )}
            </div>

            {/* Empty State */}
            {page.elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ minHeight: '100vh' }}>
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="text-lg font-medium">Empty Page</div>
                  <div className="text-sm">Add elements to see them here</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMode;