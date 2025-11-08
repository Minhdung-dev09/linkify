import { BuilderElement } from "@/app/builder/page";

interface ImageRendererProps {
  element: BuilderElement;
}

export function ImageRenderer({ element }: ImageRendererProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.props.linkUrl) {
      if (element.props.linkTarget === '_blank') {
        window.open(element.props.linkUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = element.props.linkUrl;
      }
    }
  };

  return (
    <div 
      className="w-full h-full bg-gray-200 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
      style={{
        backgroundColor: element.props.backgroundColor || '#f3f4f6',
        borderRadius: element.props.borderRadius || 0,
        borderWidth: element.props.borderWidth || 0,
        borderStyle: element.props.borderStyle || 'solid',
        borderColor: element.props.borderColor || 'transparent'
      }}
      onClick={handleClick}
    >
      {element.props.src ? (
        <img
          src={element.props.src}
          alt={element.props.alt || 'Image'}
          className="w-full h-full object-cover"
          style={{
            objectFit: element.props.objectFit || 'cover',
            borderRadius: element.props.borderRadius || 0
          }}
          loading={element.props.lazy ? 'lazy' : 'eager'}
        />
      ) : (
        <div className="text-gray-500 text-sm">No Image</div>
      )}
    </div>
  );
}

