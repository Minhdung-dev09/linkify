"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuilderElement } from "@/app/builder/page";
import { basicElements, advancedElements } from "./elements/definitions";

interface ElementLibraryProps {
  onAddElement: (element: Omit<BuilderElement, 'id'>) => void;
  category: 'basic' | 'advanced';
}

const ElementLibrary = ({ onAddElement, category }: ElementLibraryProps) => {
  const elements = category === 'basic' ? basicElements : advancedElements;

  return (
    <div className="space-y-3">
      {elements.map((item, index) => (
        <Card 
          key={index}
          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
          onClick={() => onAddElement(item.element)}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {item.description}
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {item.element.type}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ElementLibrary;
