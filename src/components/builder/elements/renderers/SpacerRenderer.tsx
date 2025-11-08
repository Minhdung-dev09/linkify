import { BuilderElement } from "@/app/builder/page";

interface SpacerRendererProps {
  element: BuilderElement;
}

export function SpacerRenderer({ element }: SpacerRendererProps) {
  return (
    <div
      className="w-full h-full bg-gray-100 border border-gray-200 rounded"
      style={{
        backgroundColor: element.props.backgroundColor || '#f3f4f6',
        height: element.props.height || element.size.height || 50
      }}
    >
      <div className="text-gray-500 text-xs text-center">Spacer</div>
    </div>
  );
}

