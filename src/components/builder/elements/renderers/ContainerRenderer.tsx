import { BuilderElement } from "@/app/builder/page";

interface ContainerRendererProps {
  element: BuilderElement;
}

export function ContainerRenderer({ element }: ContainerRendererProps) {
  return (
    <div 
      className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center"
      style={{
        backgroundColor: element.props.backgroundColor || '#f8f9fa',
        paddingTop: element.props.paddingTop || element.props.padding || 20,
        paddingRight: element.props.paddingRight || element.props.padding || 20,
        paddingBottom: element.props.paddingBottom || element.props.padding || 20,
        paddingLeft: element.props.paddingLeft || element.props.padding || 20,
        borderWidth: element.props.borderWidth || 1,
        borderStyle: element.props.borderStyle || 'solid',
        borderColor: element.props.borderColor || '#e5e7eb',
        borderRadius: element.props.borderRadius || 8,
        backgroundImage: element.props.backgroundImage ? `url(${element.props.backgroundImage})` : 'none',
        backgroundPosition: element.props.backgroundPosition || 'center',
        backgroundSize: element.props.backgroundSize || 'cover',
        backgroundRepeat: element.props.backgroundRepeat || 'no-repeat'
      }}
    >
      <span className="text-gray-500 text-sm">Container</span>
    </div>
  );
}

