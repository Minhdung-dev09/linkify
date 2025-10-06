"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BuilderElement } from "@/app/builder/page";

interface Props {
  selectedElement: BuilderElement;
  updateProps: (newProps: Record<string, any>) => void;
}

export default function CarouselProperties({ selectedElement, updateProps }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Images</Label>
        <div className="space-y-2">
          {(selectedElement.props.images || []).map((url: string, idx: number) => (
            <div key={idx} className="border rounded-md p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  {url ? (
                    <img src={url} alt="thumb" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-400">No Img</span>
                  )}
                </div>
                <Input
                  value={url}
                  onChange={(e) => {
                    const next = [...(selectedElement.props.images || [])];
                    next[idx] = e.target.value;
                    updateProps({ images: next });
                  }}
                  placeholder={`Image URL #${idx + 1}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const next = [...(selectedElement.props.images || [])];
                    next.splice(idx, 1);
                    const nextAlts = [...(selectedElement.props.imageAlts || [])];
                    const nextLinks = [...(selectedElement.props.imageLinks || [])];
                    const nextTargets = [...(selectedElement.props.imageLinkTargets || [])];
                    const nextCaptions = [...(selectedElement.props.captions || [])];
                    nextAlts.splice(idx, 1);
                    nextLinks.splice(idx, 1);
                    nextTargets.splice(idx, 1);
                    nextCaptions.splice(idx, 1);
                    updateProps({ images: next, imageAlts: nextAlts, imageLinks: nextLinks, imageLinkTargets: nextTargets, captions: nextCaptions });
                  }}
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs">Alt</Label>
                  <Input
                    value={(selectedElement.props.imageAlts || [])[idx] || ''}
                    onChange={(e) => {
                      const list = [...(selectedElement.props.imageAlts || [])];
                      list[idx] = e.target.value;
                      updateProps({ imageAlts: list });
                    }}
                    placeholder="Alt text"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Link URL</Label>
                  <Input
                    value={(selectedElement.props.imageLinks || [])[idx] || ''}
                    onChange={(e) => {
                      const list = [...(selectedElement.props.imageLinks || [])];
                      list[idx] = e.target.value;
                      updateProps({ imageLinks: list });
                    }}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label className="text-xs">Target</Label>
                  <Select
                    value={((selectedElement.props.imageLinkTargets || [])[idx] || '_self')}
                    onValueChange={(value) => {
                      const list = [...(selectedElement.props.imageLinkTargets || [])];
                      list[idx] = value;
                      updateProps({ imageLinkTargets: list });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_self">Same Tab</SelectItem>
                      <SelectItem value="_blank">New Tab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Caption</Label>
                  <Input
                    value={(selectedElement.props.captions || [])[idx] || ''}
                    onChange={(e) => {
                      const list = [...(selectedElement.props.captions || [])];
                      list[idx] = e.target.value;
                      updateProps({ captions: list });
                    }}
                    placeholder="Optional caption"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const next = [...(selectedElement.props.images || [])];
              next.push('');
              updateProps({ images: next });
            }}
          >
            Add Image
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (navigator?.clipboard?.readText) {
                navigator.clipboard.readText().then((text) => {
                  if (!text) return;
                  const next = [...(selectedElement.props.images || [])];
                  next.push(text.trim());
                  updateProps({ images: next });
                }).catch(() => {
                  const next = [...(selectedElement.props.images || [])];
                  next.push('');
                  updateProps({ images: next });
                });
              } else {
                const next = [...(selectedElement.props.images || [])];
                next.push('');
                updateProps({ images: next });
              }
            }}
          >
            Paste Link
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="carouselInterval">Interval (ms)</Label>
          <Input
            id="carouselInterval"
            type="number"
            value={selectedElement.props.intervalMs || 3000}
            onChange={(e) => updateProps({ intervalMs: parseInt(e.target.value) || 3000 })}
          />
        </div>
        <div>
          <Label htmlFor="carouselTransition">Transition</Label>
          <Select
            value={selectedElement.props.transition || 'fade'}
            onValueChange={(value) => updateProps({ transition: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fade">Fade</SelectItem>
              <SelectItem value="slide">Slide</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="carouselAutoplay">Autoplay</Label>
          <Select
            value={(selectedElement.props.autoplay ?? true) ? 'true' : 'false'}
            onValueChange={(value) => updateProps({ autoplay: value === 'true' })}
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
          <Label htmlFor="carouselPause">Pause on Hover</Label>
          <Select
            value={(selectedElement.props.pauseOnHover ?? true) ? 'true' : 'false'}
            onValueChange={(value) => updateProps({ pauseOnHover: value === 'true' })}
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
          <Label htmlFor="carouselArrows">Show Arrows</Label>
          <Select
            value={(selectedElement.props.showArrows ?? true) ? 'true' : 'false'}
            onValueChange={(value) => updateProps({ showArrows: value === 'true' })}
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
        <div>
          <Label htmlFor="carouselIndicators">Show Indicators</Label>
          <Select
            value={(selectedElement.props.showIndicators ?? true) ? 'true' : 'false'}
            onValueChange={(value) => updateProps({ showIndicators: value === 'true' })}
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

      <div>
        <Label htmlFor="carouselObjectFit">Image Fit</Label>
        <Select
          value={selectedElement.props.objectFit || 'cover'}
          onValueChange={(value) => updateProps({ objectFit: value })}
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
    </div>
  );
}


