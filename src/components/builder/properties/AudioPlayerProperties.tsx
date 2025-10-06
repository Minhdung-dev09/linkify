"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BuilderElement } from "@/app/builder/page";

interface Props {
  selectedElement: BuilderElement;
  updateProps: (newProps: Record<string, any>) => void;
}

export default function AudioPlayerProperties({ selectedElement, updateProps }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="audioSrc">Audio URL</Label>
        <Input
          id="audioSrc"
          value={selectedElement.props.src || ''}
          onChange={(e) => updateProps({ src: e.target.value })}
          placeholder="https://example.com/audio.mp3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="audioAutoplay">Autoplay</Label>
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
          <Label htmlFor="audioControls">Controls</Label>
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
          <Label htmlFor="audioLoop">Loop</Label>
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
          <Label htmlFor="audioMuted">Muted</Label>
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
          <Label htmlFor="audioStart">Start At (s)</Label>
          <Input
            id="audioStart"
            type="number"
            value={selectedElement.props.start || 0}
            onChange={(e) => updateProps({ start: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label htmlFor="audioPlaybackRate">Playback Rate</Label>
          <Input
            id="audioPlaybackRate"
            type="number"
            step="0.1"
            value={selectedElement.props.playbackRate ?? 1}
            onChange={(e) => updateProps({ playbackRate: parseFloat(e.target.value) || 1 })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="audioVolume">Volume</Label>
        <Slider
          value={[typeof selectedElement.props.volume === 'number' ? selectedElement.props.volume : 1]}
          onValueChange={([v]) => updateProps({ volume: v })}
          max={1}
          step={0.01}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground mt-1">
          {Math.round(((typeof selectedElement.props.volume === 'number' ? selectedElement.props.volume : 1) * 100))}%
        </div>
      </div>

      <div>
        <Label htmlFor="audioCover">Cover Image (optional)</Label>
        <Input
          id="audioCover"
          value={selectedElement.props.cover || ''}
          onChange={(e) => updateProps({ cover: e.target.value })}
          placeholder="https://example.com/cover.jpg"
        />
      </div>

      <div>
        <Label htmlFor="audioTitle">Title</Label>
        <Input
          id="audioTitle"
          value={selectedElement.props.title || ''}
          onChange={(e) => updateProps({ title: e.target.value })}
          placeholder="Audio Title"
        />
      </div>

    </div>
  );
}


