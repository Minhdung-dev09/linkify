"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Save, 
  Link as LinkIcon, 
  Eye, 
  Copy, 
  Check,
  AlertCircle,
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { BuilderPage } from "@/app/builder/page";

interface SaveLandingPageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SaveLandingPageData) => Promise<void>;
  currentPage: BuilderPage;
}

interface SaveLandingPageData {
  title: string;
  description: string;
  slug: string;
  settings: any;
  elements: any[];
}

export default function SaveLandingPageDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  currentPage 
}: SaveLandingPageDialogProps) {
  const [formData, setFormData] = useState({
    title: currentPage.title || "Untitled Page",
    description: "",
    slug: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState<boolean | null>(null);
  const [savedLink, setSavedLink] = useState<string | null>(null);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("Vui lòng nhập slug");
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        title: formData.title,
        description: formData.description,
        slug: formData.slug.toLowerCase(),
        settings: currentPage.settings,
        elements: currentPage.elements
      });
      
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const link = `${baseUrl}/${formData.slug}`;
      setSavedLink(link);
      
      toast.success("Landing page đã được lưu thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu landing page");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlugChange = (value: string) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, slug }));
    
    // Basic validation
    if (slug.length < 3) {
      setIsSlugValid(false);
    } else {
      setIsSlugValid(true);
    }
  };

  const copyLink = () => {
    if (savedLink) {
      navigator.clipboard.writeText(savedLink);
      toast.success("Đã copy link!");
    }
  };

  const openLink = () => {
    if (savedLink) {
      window.open(savedLink, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Lưu Landing Page
          </DialogTitle>
        </DialogHeader>

        {savedLink ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Landing Page đã được tạo thành công!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Landing page của bạn đã được lưu và có thể truy cập qua link bên dưới
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Link của bạn:</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <code className="flex-1 text-sm text-blue-600 break-all">
                    {savedLink}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyLink}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={openLink}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Xem trước
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyLink}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    Landing page đã được tích hợp với hệ thống link shortener
                  </h4>
                  <p className="text-sm text-blue-700">
                    Link này sẽ xuất hiện trong dashboard của bạn và có thể theo dõi traffic, analytics như các link thông thường.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nhập tiêu đề landing page"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <div className="relative">
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="my-landing-page"
                    className={isSlugValid === false ? "border-red-500" : ""}
                  />
                  {isSlugValid === false && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả ngắn về landing page"
                rows={3}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Thông tin Landing Page</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Số elements:</span>
                  <Badge variant="secondary" className="ml-2">
                    {currentPage.elements.length}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">Background:</span>
                  <span className="ml-2 text-gray-800">
                    {currentPage.settings.backgroundColor}
                  </span>
                </div>
              </div>
            </div>

            {formData.slug && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <LinkIcon className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Link sẽ là:</span>
                </div>
                <code className="text-sm text-blue-600">
                  {process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/{formData.slug}
                </code>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {savedLink ? (
            <Button onClick={onClose} className="w-full">
              Đóng
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isLoading || !formData.title.trim() || !formData.slug.trim() || isSlugValid === false}
                className="min-w-[100px]"
              >
                {isLoading ? "Đang lưu..." : "Lưu"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
