import { BuilderElement } from "@/app/builder/page";

interface ParagraphRendererProps {
  element: BuilderElement;
}

export function ParagraphRenderer({ element }: ParagraphRendererProps) {
  return (
    <p 
      className="w-full h-full flex items-start"
      style={{
        fontSize: element.props.fontSize || 16,
        color: element.props.color || '#666666',
        textAlign: element.props.textAlign || 'left',
        fontFamily: element.props.fontFamily || 'inherit',
        lineHeight: element.props.lineHeight || 1.5,
        fontWeight: element.props.fontWeight || 'normal',
        fontStyle: element.props.fontStyle || 'normal',
        textDecoration: element.props.textDecoration || 'none',
        letterSpacing: element.props.letterSpacing || 0
      }}
    >
      {element.props.text || 'Paragraph text goes here...'}
    </p>
  );
}

