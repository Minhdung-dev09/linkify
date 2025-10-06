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
import CanvasCarousel from "@/components/builder/renderers/CanvasCarousel";

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
              fontFamily: element.props.fontFamily || 'inherit',
              fontStyle: element.props.fontStyle || 'normal',
              textDecoration: element.props.textDecoration || 'none'
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
              lineHeight: element.props.lineHeight || 1.5,
              fontWeight: element.props.fontWeight || 'normal',
              fontStyle: element.props.fontStyle || 'normal',
              textDecoration: element.props.textDecoration || 'none'
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

      case 'header':
        return (
          <div
            key={element.id}
            className="w-full h-full flex items-center justify-between px-4 border-b"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#1f2937',
              color: element.props.textColor || '#ffffff',
              paddingTop: element.props.paddingTop || 16,
              paddingRight: element.props.paddingRight || 24,
              paddingBottom: element.props.paddingBottom || 16,
              paddingLeft: element.props.paddingLeft || 24,
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
              backgroundRepeat: element.props.showRepeat || 'no-repeat',
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
              className="font-bold"
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
              style={{ gap: element.props.navSpacing || 24 }}
            >
              {(element.props.navItems || []).map((item: any, index: number) => (
                <span 
                  key={index} 
                  className="cursor-pointer"
                  style={{
                    fontSize: element.props.navFontSize || 16,
                    fontWeight: element.props.navFontWeight || 'medium',
                    color: element.props.navColor || '#ffffff',
                    padding: `${element.props.navPadding || 12}px`,
                    borderRadius: `${element.props.navBorderRadius || 6}px`
                  }}
                >
                  {typeof item === 'string' ? item : item.label}
                </span>
              ))}
            </div>
          </div>
        );

      case 'footer':
        return (
          <div
            key={element.id}
            className="w-full h-full"
            style={{
              ...elementStyle,
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
                      <span key={idx} className="underline cursor-pointer">
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
            </div>
          </div>
        );

      case 'carousel':
        return (
          <div key={element.id} style={elementStyle}>
            <CanvasCarousel element={element} />
          </div>
        );

      case 'hero':
        return (
          <div
            key={element.id}
            className="w-full h-full relative flex flex-col items-center justify-center text-center p-8 rounded-lg"
            style={{
              ...elementStyle,
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
                style={{ backgroundColor: element.props.buttonColor || '#3b82f6', color: '#ffffff' }}
              >
                {element.props.buttonText || 'Get Started'}
              </button>
            </div>
          </div>
        );

      case 'pricing-card':
        return (
          <div
            key={element.id}
            className="w-full h-full p-6 border rounded-lg flex flex-col"
            style={{
              ...elementStyle,
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
              style={{ backgroundColor: element.props.buttonColor || '#3b82f6', color: '#ffffff' }}
            >
              {element.props.buttonText || 'Get Started'}
            </button>
          </div>
        );

      case 'testimonial':
        return (
          <div
            key={element.id}
            className="w-full h-full p-6 border rounded-lg"
            style={{
              ...elementStyle,
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
        );

      case 'feature-list':
        return (
          <div
            key={element.id}
            className="w-full h-full p-6"
            style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff' }}
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
        );

      case 'cta':
        return (
          <div
            key={element.id}
            className="w-full h-full flex flex-col items-center justify-center text-center p-8 rounded-lg"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#3b82f6',
              color: element.props.textColor || '#ffffff'
            }}
          >
            <h2 className="text-2xl font-bold mb-2">{element.props.title || 'Call to Action'}</h2>
            <p className="mb-6">{element.props.subtitle || 'Subtitle'}</p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium">
              {element.props.buttonText || 'Button'}
            </button>
          </div>
        );

      case 'contact-form':
        return (
          <div
            key={element.id}
            className="w-full h-full p-6 border rounded-lg"
            style={{
              ...elementStyle,
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
                    <textarea className="w-full p-2 border rounded" placeholder={field.label} rows={3} />
                  ) : (
                    <input type={field.type} className="w-full p-2 border rounded" placeholder={field.label} />
                  )}
                </div>
              ))}
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium">
                {element.props.buttonText || 'Send Message'}
              </button>
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div
            key={element.id}
            className="w-full h-full p-6 border rounded-lg"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#ffffff',
              borderColor: element.props.borderColor || '#e5e7eb'
            }}
          >
            <h3 className="text-lg font-bold mb-2">{element.props.title || 'Newsletter'}</h3>
            <p className="text-sm text-gray-600 mb-4">{element.props.subtitle || 'Subtitle'}</p>
            <div className="flex gap-2">
              <input type="email" className="flex-1 p-2 border rounded" placeholder={element.props.placeholder || 'Enter your email'} />
              <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium">
                {element.props.buttonText || 'Subscribe'}
              </button>
            </div>
          </div>
        );

      case 'grid-layout':
        return (
          <div
            key={element.id}
            className="w-full h-full border-2 border-dashed border-gray-300 rounded-md p-4"
            style={{
              ...elementStyle,
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
        );

      case 'flex-layout':
        return (
          <div
            key={element.id}
            className="w-full h-full border-2 border-dashed border-gray-300 rounded-md p-4"
            style={{
              ...elementStyle,
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
        );

      case 'video-player':
        return (
          <div key={element.id} className="w-full h-full rounded-lg overflow-hidden bg-black" style={elementStyle}>
            {(() => {
              const src: string = element.props.src || '';
              const autoplay = element.props.autoplay ? 1 : 0;
              const controls = element.props.controls === false ? 0 : 1;
              const loop = element.props.loop ? 1 : 0;
              const muted = element.props.muted ? 1 : 0;
              const start = parseInt(element.props.start || 0);
              const objectFit = element.props.objectFit || 'cover';
              const poster = element.props.poster;

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
              if (yt) {
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
        );

      case 'audio-player':
        return (
          <div key={element.id} className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#f8f9fa' }}>
            <div className="text-gray-600 text-center">
              <div className="text-lg mb-2">🎵</div>
              <div className="text-sm">{element.props.title || 'Audio Player'}</div>
            </div>
          </div>
        );

      case 'image-gallery':
        return (
          <div key={element.id} className="w-full h-full bg-gray-100 rounded-lg p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#f8f9fa' }}>
            <div className="text-center text-gray-600">
              <div className="text-lg mb-2">🖼️</div>
              <div className="text-sm">Gallery ({element.props.images?.length || 0} images)</div>
            </div>
          </div>
        );

      case 'accordion':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <div className="text-sm text-gray-600 mb-2">Accordion</div>
            {(element.props.items || []).map((item: any, index: number) => (
              <div key={index} className="border-b border-gray-200 py-2">
                <div className="font-medium text-sm">{item.title}</div>
              </div>
            ))}
          </div>
        );

      case 'tabs':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <div className="flex border-b">
              {(element.props.tabs || []).map((tab: any, index: number) => (
                <div key={index} className="px-4 py-2 text-sm border-r">{tab.label}</div>
              ))}
            </div>
            <div className="p-4 text-sm text-gray-600">Tab Content</div>
          </div>
        );

      case 'modal':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <div className="text-center text-gray-600">
              <div className="text-lg mb-2">📋</div>
              <div className="text-sm">Modal Dialog</div>
            </div>
          </div>
        );

      case 'dropdown':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-2" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <div className="text-sm text-gray-600">{element.props.label || 'Select Option'}</div>
          </div>
        );

      case 'data-table':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg overflow-hidden" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
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
        );

      case 'chart':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <div className="text-center text-gray-600">
              <div className="text-lg mb-2">📊</div>
              <div className="text-sm">{element.props.type || 'bar'} Chart</div>
            </div>
          </div>
        );

      case 'progress-bar':
        return (
          <div key={element.id} className="w-full h-full flex items-center p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#e5e7eb' }}>
            <div className="w-full">
              <div className="text-xs text-gray-600 mb-1">{element.props.label || 'Progress'}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${element.props.value || 0}%`, backgroundColor: element.props.fillColor || '#3b82f6' }}></div>
              </div>
              {element.props.showPercentage && (
                <div className="text-xs text-gray-600 mt-1">{element.props.value || 0}%</div>
              )}
            </div>
          </div>
        );

      case 'stats-card':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <div className="text-sm text-gray-600">{element.props.title || 'Total Users'}</div>
            <div className="text-2xl font-bold">{element.props.value || '1,234'}</div>
            <div className="text-xs text-green-600">{element.props.change || '+12%'}</div>
          </div>
        );

      case 'social-links':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center gap-2 p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || 'transparent' }}>
            {(element.props.platforms || []).map((platform: string, index: number) => (
              <div key={index} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                {platform.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        );

      case 'whatsapp-button':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center rounded-lg" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#25d366', color: element.props.textColor || '#ffffff' }}>
            <div className="text-center">
              <div className="text-lg mb-1">💬</div>
              <div className="text-sm font-medium">WhatsApp</div>
            </div>
          </div>
        );

      case 'contact-info':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-4" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span>📞</span><span>{element.props.phone || '+1 (555) 123-4567'}</span></div>
              <div className="flex items-center gap-2"><span>✉️</span><span>{element.props.email || 'contact@example.com'}</span></div>
              <div className="flex items-center gap-2"><span>📍</span><span>{element.props.address || '123 Main St, City, State'}</span></div>
            </div>
          </div>
        );

      case 'search-bar':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg flex items-center p-2" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#ffffff', borderColor: element.props.borderColor || '#e5e7eb' }}>
            <input type="text" className="flex-1 text-sm outline-none" placeholder={element.props.placeholder || 'Search...'} />
            <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-xs">{element.props.buttonText || 'Search'}</button>
          </div>
        );

      case 'timer':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center rounded-lg" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#1f2937', color: element.props.textColor || '#ffffff' }}>
            <div className="text-center">
              <div className="text-lg mb-1">⏰</div>
              <div className="text-sm">Countdown Timer</div>
            </div>
          </div>
        );

      case 'rating':
        return (
          <div key={element.id} className="w-full h-full flex items-center gap-1 p-2" style={elementStyle}>
            {Array.from({ length: element.props.max || 5 }).map((_, index) => (
              <span key={index} className="text-lg" style={{ color: index < (element.props.value || 0) ? (element.props.color || '#fbbf24') : '#e5e7eb' }}>★</span>
            ))}
            {element.props.showValue && (<span className="text-sm text-gray-600 ml-2">{element.props.value || 0}</span>)}
          </div>
        );

      case 'badge':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center rounded-lg" style={{ ...elementStyle, backgroundColor: element.props.backgroundColor || '#dbeafe', color: element.props.color || '#3b82f6' }}>
            <span className="text-sm font-medium">{element.props.text || 'New'}</span>
          </div>
        );

      case 'divider':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center" style={elementStyle}>
            <div className="w-full" style={{ height: `${element.props.thickness || 2}px`, backgroundColor: element.props.color || '#e5e7eb' }} />
          </div>
        );

      case 'header':
        return (
          <div
            key={element.id}
            className="w-full h-full flex items-center justify-between px-4 border-b"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#ffffff',
              color: element.props.color || '#111827'
            }}
          >
            <div className="font-semibold">{element.props.title || 'Header'}</div>
            <div className="text-xs text-gray-500">Navigation</div>
          </div>
        );

      case 'footer':
        return (
          <div
            key={element.id}
            className="w-full h-full flex items-center justify-center border-t"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#f9fafb',
              color: element.props.color || '#6b7280'
            }}
          >
            <div className="text-sm">{element.props.text || 'Footer'}</div>
          </div>
        );

      case 'carousel':
        return (
          <div
            key={element.id}
            className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center"
            style={elementStyle}
          >
            <div className="text-gray-500 text-sm">Carousel (preview)</div>
          </div>
        );

      case 'hero':
        return (
          <div
            key={element.id}
            className="w-full h-full flex flex-col items-center justify-center text-center p-6 rounded-lg"
            style={{
              ...elementStyle,
              backgroundColor: element.props.backgroundColor || '#f9fafb',
              color: element.props.color || '#111827'
            }}
          >
            <div className="text-xl font-bold">{element.props.title || 'Hero Title'}</div>
            <div className="text-sm text-gray-500">{element.props.subtitle || 'Hero subtitle'}</div>
          </div>
        );

      case 'pricing-card':
        return (
          <div key={element.id} className="w-full h-full p-4 border rounded-lg flex flex-col" style={elementStyle}>
            <div className="font-semibold">{element.props.plan || 'Plan'}</div>
            <div className="text-2xl">{element.props.price || '$0'}</div>
            <div className="text-xs text-gray-500 mt-1">Pricing Card</div>
          </div>
        );

      case 'testimonial':
        return (
          <div key={element.id} className="w-full h-full p-4 border rounded-lg" style={elementStyle}>
            <div className="italic">“{element.props.quote || 'Great product!'}”</div>
            <div className="text-xs text-gray-500 mt-2">— {element.props.author || 'Anonymous'}</div>
          </div>
        );

      case 'feature-list':
        return (
          <div key={element.id} className="w-full h-full p-4" style={elementStyle}>
            <div className="font-semibold mb-2">Features</div>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        );

      case 'cta':
        return (
          <div key={element.id} className="w-full h-full flex flex-col items-center justify-center text-center p-4 rounded-lg" style={elementStyle}>
            <div className="font-semibold mb-2">{element.props.title || 'Call to Action'}</div>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">{element.props.buttonText || 'Get Started'}</button>
          </div>
        );

      case 'contact-form':
        return (
          <div key={element.id} className="w-full h-full p-4 border rounded-lg" style={elementStyle}>
            <div className="text-sm text-gray-500">Contact Form (preview)</div>
          </div>
        );

      case 'newsletter':
        return (
          <div key={element.id} className="w-full h-full p-4 border rounded-lg" style={elementStyle}>
            <div className="text-sm text-gray-500">Newsletter Signup (preview)</div>
          </div>
        );

      case 'grid-layout':
        return (
          <div key={element.id} className="w-full h-full border-2 border-dashed border-gray-300 rounded-md p-4" style={elementStyle}>
            <div className="text-xs text-gray-500">Grid Layout</div>
          </div>
        );

      case 'flex-layout':
        return (
          <div key={element.id} className="w-full h-full border-2 border-dashed border-gray-300 rounded-md p-4" style={elementStyle}>
            <div className="text-xs text-gray-500">Flex Layout</div>
          </div>
        );

      case 'video-player':
        return (
          <div key={element.id} className="w-full h-full rounded-lg overflow-hidden bg-black flex items-center justify-center" style={elementStyle}>
            <div className="text-gray-300 text-xs">Video (preview)</div>
          </div>
        );

      case 'audio-player':
        return (
          <div key={element.id} className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-2" style={elementStyle}>
            <div className="text-gray-500 text-xs">Audio (preview)</div>
          </div>
        );

      case 'image-gallery':
        return (
          <div key={element.id} className="w-full h-full bg-gray-100 rounded-lg p-2" style={elementStyle}>
            <div className="text-gray-500 text-xs">Image Gallery (preview)</div>
          </div>
        );

      case 'accordion':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-3" style={elementStyle}>
            <div className="text-gray-500 text-xs">Accordion (preview)</div>
          </div>
        );

      case 'tabs':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-2" style={elementStyle}>
            <div className="text-gray-500 text-xs">Tabs (preview)</div>
          </div>
        );

      case 'modal':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-3" style={elementStyle}>
            <div className="text-gray-500 text-xs">Modal (preview)</div>
          </div>
        );

      case 'dropdown':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-2" style={elementStyle}>
            <div className="text-gray-500 text-xs">Dropdown (preview)</div>
          </div>
        );

      case 'data-table':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg overflow-hidden p-2" style={elementStyle}>
            <div className="text-gray-500 text-xs">Data Table (preview)</div>
          </div>
        );

      case 'chart':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-3" style={elementStyle}>
            <div className="text-gray-500 text-xs">Chart (preview)</div>
          </div>
        );

      case 'progress-bar':
        return (
          <div key={element.id} className="w-full h-full flex items-center p-2" style={elementStyle}>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div className="h-2 bg-blue-600 rounded" style={{ width: `${element.props.value || 50}%` }} />
            </div>
          </div>
        );

      case 'stats-card':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-3" style={elementStyle}>
            <div className="text-xs text-gray-500">Stats Card</div>
            <div className="text-lg font-semibold">{element.props.value || '0'}</div>
          </div>
        );

      case 'social-links':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center gap-2 p-2" style={elementStyle}>
            <div className="text-xs text-gray-500">Social Links</div>
          </div>
        );

      case 'whatsapp-button':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center rounded-lg" style={elementStyle}>
            <button className="px-3 py-1 rounded-md bg-green-500 text-white text-sm">WhatsApp</button>
          </div>
        );

      case 'contact-info':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg p-3" style={elementStyle}>
            <div className="text-xs text-gray-500">Contact Info</div>
          </div>
        );

      case 'search-bar':
        return (
          <div key={element.id} className="w-full h-full border rounded-lg flex items-center p-2" style={elementStyle}>
            <div className="text-xs text-gray-500">Search</div>
          </div>
        );

      case 'timer':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center rounded-lg" style={elementStyle}>
            <div className="text-xs text-gray-500">Timer</div>
          </div>
        );

      case 'rating':
        return (
          <div key={element.id} className="w-full h-full flex items-center gap-1 p-2" style={elementStyle}>
            {Array.from({ length: element.props.max || 5 }).map((_, index) => (
              <span key={index}>★</span>
            ))}
          </div>
        );

      case 'badge':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center rounded-lg" style={elementStyle}>
            <span className="px-2 py-0.5 bg-gray-200 rounded text-xs">{element.props.text || 'Badge'}</span>
          </div>
        );

      case 'divider':
        return (
          <div key={element.id} className="w-full h-full flex items-center justify-center" style={elementStyle}>
            <div className="w-full h-px bg-gray-300" />
          </div>
        );

      default:
        return (
          <div
            key={element.id}
            className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
            style={{
              ...elementStyle,
              backgroundColor: element.props?.backgroundColor || 'transparent'
            }}
            title={`Unsupported element: ${element.type}`}
          >
            <span className="text-gray-500 text-xs capitalize">
              {element.type || 'unknown'} (preview)
            </span>
          </div>
        );
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