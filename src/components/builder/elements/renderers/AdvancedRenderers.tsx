import { BuilderElement } from "@/app/builder/page";
import CanvasCarousel from "../renderers/CanvasCarousel";

interface AdvancedRendererProps {
  element: BuilderElement;
  isDragging?: boolean;
  isResizing?: boolean;
}

export function HeaderRenderer({ element }: AdvancedRendererProps) {
  return (
    <div
      className="w-full h-full flex items-center justify-between px-4 border-b cursor-pointer transition-all duration-200 hover:shadow-lg"
      style={{
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
  );
}

export function FooterRenderer({ element }: AdvancedRendererProps) {
  return (
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
          if (/^https?:\/(?!\/)/i.test(embedUrl)) {
            embedUrl = embedUrl.replace(/^https?:\//i, (p) => p + '/');
          }
          if (!/^https?:\/\//i.test(embedUrl)) {
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
  );
}

export function VideoPlayerRenderer({ element, isDragging, isResizing }: AdvancedRendererProps) {
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
}

export function HeroRenderer({ element }: AdvancedRendererProps) {
  return (
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
  );
}

// Placeholder renderers for other advanced elements
export function GridLayoutRenderer({ element }: AdvancedRendererProps) {
  return (
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
  );
}

export function FlexLayoutRenderer({ element }: AdvancedRendererProps) {
  return (
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
  );
}

// Generic placeholder for other advanced elements
export function GenericAdvancedRenderer({ element }: AdvancedRendererProps) {
  const elementType = element.type;
  const displayName = elementType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return (
    <div
      className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center p-4"
      style={{
        backgroundColor: element.props.backgroundColor || '#ffffff',
        borderColor: element.props.borderColor || '#e5e7eb'
      }}
    >
      <div className="text-center text-gray-500">
        <div className="text-sm font-medium">{displayName}</div>
        <div className="text-xs mt-1">({elementType})</div>
      </div>
    </div>
  );
}

