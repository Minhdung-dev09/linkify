import { BuilderElement } from "@/app/builder/page";

interface ButtonRendererProps {
  element: BuilderElement;
}

export function ButtonRenderer({ element }: ButtonRendererProps) {
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
    <button
      className="w-full h-full flex items-center justify-center rounded-md transition-all hover:opacity-90"
      style={{
        backgroundColor: element.props.backgroundColor || '#3b82f6',
        color: element.props.color || '#ffffff',
        borderRadius: element.props.borderRadius || 8,
        fontSize: element.props.fontSize || 16,
        fontWeight: element.props.fontWeight || 'medium',
        fontStyle: element.props.fontStyle || 'normal',
        textDecoration: element.props.textDecoration || 'none',
        textAlign: element.props.textAlign || 'center',
        paddingTop: element.props.paddingTop || 12,
        paddingRight: element.props.paddingRight || 24,
        paddingBottom: element.props.paddingBottom || 12,
        paddingLeft: element.props.paddingLeft || 24
      }}
      onClick={handleClick}
    >
      {element.props.text || 'Click Me'}
    </button>
  );
}

