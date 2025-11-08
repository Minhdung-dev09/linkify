import { BuilderElement } from "@/app/builder/page";

interface HeadingRendererProps {
  element: BuilderElement;
}

export function HeadingRenderer({ element }: HeadingRendererProps) {
  return (
    <h1 
      className="w-full h-full flex items-center"
      style={{
        fontSize: element.props.fontSize || 32,
        fontWeight: element.props.fontWeight || 'bold',
        color: element.props.color || '#000000',
        textAlign: element.props.textAlign || 'left',
        fontFamily: element.props.fontFamily || 'inherit',
        fontStyle: element.props.fontStyle || 'normal',
        textDecoration: element.props.textDecoration || 'none',
        lineHeight: element.props.lineHeight || 1.2,
        letterSpacing: element.props.letterSpacing || 0
      }}
    >
      {element.props.text || 'Heading Text'}
    </h1>
  );
}

