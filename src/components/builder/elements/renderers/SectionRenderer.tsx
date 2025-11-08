import { BuilderElement } from "@/app/builder/page";

interface SectionRendererProps {
  element: BuilderElement;
}

export function SectionRenderer({ element }: SectionRendererProps) {
  return (
    <div 
      className="w-full h-full border border-gray-200 rounded-md"
      style={{
        backgroundColor: element.props.backgroundColor || '#ffffff',
        paddingTop: element.props.paddingTop || element.props.padding || 40,
        paddingRight: element.props.paddingRight || element.props.padding || 40,
        paddingBottom: element.props.paddingBottom || element.props.padding || 40,
        paddingLeft: element.props.paddingLeft || element.props.padding || 40,
        minHeight: element.props.minHeight || 200,
        maxWidth: element.props.maxWidth || '100%',
        backgroundImage: element.props.backgroundImage ? `url(${element.props.backgroundImage})` : 'none',
        backgroundPosition: element.props.backgroundPosition || 'center',
        backgroundSize: element.props.backgroundSize || 'cover',
        backgroundRepeat: element.props.backgroundRepeat || 'no-repeat'
      }}
    >
      <div className="text-gray-500 text-sm">Section</div>
    </div>
  );
}

