"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BuilderElement } from "@/app/builder/page";

interface Props {
  selectedElement: BuilderElement;
  updateProps: (newProps: Record<string, any>) => void;
}

export default function VideoPlayerProperties({ selectedElement, updateProps }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="videoSrc">Video URL</Label>
        <Input
          id="videoSrc"
          value={selectedElement.props.src || ''}
          onChange={(e) => updateProps({ src: e.target.value })}
          placeholder="https://www.youtube.com/embed/..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="videoAutoplay">Autoplay</Label>
          <Select
            value={(selectedElement.props.autoplay ?? false) ? 'true' : 'false'}
            onValueChange={(v) => updateProps({ autoplay: v === 'true' })}
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
          <Label htmlFor="videoControls">Controls</Label>
          <Select
            value={(selectedElement.props.controls ?? true) ? 'true' : 'false'}
            onValueChange={(v) => updateProps({ controls: v === 'true' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Show</SelectItem>
              <SelectItem value="false">Hide</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="videoLoop">Loop</Label>
          <Select
            value={(selectedElement.props.loop ?? false) ? 'true' : 'false'}
            onValueChange={(v) => updateProps({ loop: v === 'true' })}
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
          <Label htmlFor="videoMuted">Muted</Label>
          <Select
            value={(selectedElement.props.muted ?? false) ? 'true' : 'false'}
            onValueChange={(v) => updateProps({ muted: v === 'true' })}
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="videoStart">Start At (s)</Label>
          <Input
            id="videoStart"
            type="number"
            value={selectedElement.props.start || 0}
            onChange={(e) => updateProps({ start: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label htmlFor="videoPoster">Poster</Label>
          <Input
            id="videoPoster"
            value={selectedElement.props.poster || ''}
            onChange={(e) => updateProps({ poster: e.target.value })}
            placeholder="https://example.com/thumbnail.jpg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="videoObjectFit">Object Fit</Label>
          <Select
            value={selectedElement.props.objectFit || 'cover'}
            onValueChange={(v) => updateProps({ objectFit: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="contain">Contain</SelectItem>
              <SelectItem value="fill">Fill</SelectItem>
              <SelectItem value="scale-down">Scale Down</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="videoAspect">Aspect Ratio</Label>
          <Select
            value={selectedElement.props.aspect || '16:9'}
            onValueChange={(v) => updateProps({ aspect: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16:9">16:9</SelectItem>
              <SelectItem value="4:3">4:3</SelectItem>
              <SelectItem value="1:1">1:1</SelectItem>
              <SelectItem value="21:9">21:9</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="videoTitle">Title</Label>
        <Input
          id="videoTitle"
          value={selectedElement.props.title || ''}
          onChange={(e) => updateProps({ title: e.target.value })}
          placeholder="Video Title"
        />
      </div>
    </div>
  );
}


