"use client";

import { useState, useEffect } from "react";
import { Eye, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, RefreshCw, Maximize, Minimize, Share2, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BuilderPage } from "@/app/builder/page";
import { ElementRenderer } from "@/components/builder/elements/renderers";

interface PreviewModeProps {
  page: BuilderPage;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  onClose: () => void;
  onDeviceChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

const PreviewMode = ({ page, deviceMode, onClose, onDeviceChange }: PreviewModeProps) => {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const deviceDimensions = {
    desktop: { width: '100%', height: '100%', name: 'Desktop' },
    tablet: { width: 768, height: 1024, name: 'Tablet' },
    mobile: { width: 375, height: 667, name: 'Mobile' }
  }[deviceMode];

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

    return (
      <div key={element.id} style={elementStyle}>
        <ElementRenderer element={element} />
      </div>
    );
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
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Full Width Canvas - matches BuilderCanvas structure */}
        <div 
          className="relative bg-white shadow-2xl rounded-lg overflow-hidden w-full"
          style={{
            minHeight: '100vh',
            maxWidth: '100%'
          }}
        >
          {/* Canvas Content - matches BuilderCanvas exactly */}
          <div 
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
              {/* Content Area Container - Max Width Constraint (matches BuilderCanvas exactly) */}
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

            {/* Empty State */}
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
