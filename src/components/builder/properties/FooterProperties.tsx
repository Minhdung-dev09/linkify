"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { BuilderElement } from "@/app/builder/page";

interface Props {
  selectedElement: BuilderElement;
  updateProps: (newProps: Record<string, any>) => void;
}

export default function FooterProperties({ selectedElement, updateProps }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="footerCopyright">Copyright Text</Label>
        <Input
          id="footerCopyright"
          value={selectedElement.props.copyright || ''}
          onChange={(e) => updateProps({ copyright: e.target.value })}
          placeholder="© 2025 Your Company"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="footerBg">Background Color</Label>
          <Input
            id="footerBg"
            type="color"
            value={selectedElement.props.backgroundColor || '#374151'}
            onChange={(e) => updateProps({ backgroundColor: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="footerTextColor">Text Color</Label>
          <Input
            id="footerTextColor"
            type="color"
            value={selectedElement.props.textColor || '#ffffff'}
            onChange={(e) => updateProps({ textColor: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="footerPaddingY">Padding Y</Label>
          <Slider
            value={[selectedElement.props.paddingY ?? 16]}
            onValueChange={([v]) => updateProps({ paddingY: v })}
            max={80}
            step={2}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="footerPaddingX">Padding X</Label>
          <Slider
            value={[selectedElement.props.paddingX ?? 24]}
            onValueChange={([v]) => updateProps({ paddingX: v })}
            max={80}
            step={2}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="footerLinks">Links (JSON array)</Label>
        <Textarea
          id="footerLinks"
          value={JSON.stringify(selectedElement.props.links || [], null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              updateProps({ links: parsed });
            } catch {
              // ignore invalid JSON
            }
          }}
          placeholder='[{"label":"About","href":"/about","target":"_self"}]'
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="footerShowMap">Show Google Map</Label>
          <Select
            value={(selectedElement.props.showMap ?? false) ? 'true' : 'false'}
            onValueChange={(v) => updateProps({ showMap: v === 'true' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">On</SelectItem>
              <SelectItem value="false">Off</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="footerMapHeight">Map Height (px)</Label>
          <Input
            id="footerMapHeight"
            type="number"
            value={selectedElement.props.mapHeight ?? 220}
            onChange={(e) => updateProps({ mapHeight: parseInt(e.target.value) || 220 })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="footerMapEmbed">Google Map Embed URL (iframe src)</Label>
        <Input
          id="footerMapEmbed"
          value={selectedElement.props.mapEmbedUrl || ''}
          onChange={(e) => updateProps({ mapEmbedUrl: e.target.value })}
          placeholder="https://www.google.com/maps/embed?..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="footerAddress">Address</Label>
          <Input
            id="footerAddress"
            value={selectedElement.props.address || ''}
            onChange={(e) => updateProps({ address: e.target.value })}
            placeholder="123 Main St, City"
          />
        </div>
        <div>
          <Label htmlFor="footerPhone">Phone</Label>
          <Input
            id="footerPhone"
            value={selectedElement.props.phone || ''}
            onChange={(e) => updateProps({ phone: e.target.value })}
            placeholder="(+84) 000 000 000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="footerEmail">Email</Label>
        <Input
          id="footerEmail"
          value={selectedElement.props.email || ''}
          onChange={(e) => updateProps({ email: e.target.value })}
          placeholder="hello@example.com"
        />
      </div>
    </div>
  );
}


