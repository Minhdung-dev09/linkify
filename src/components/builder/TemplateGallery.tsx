"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Search, 
  Filter, 
  Grid, 
  List,
  Download,
  Eye,
  Copy,
  Check,
  Layout
} from "lucide-react";
import { BuilderPage } from "@/app/builder/page";
import { getAuthHeaders } from "@/lib/auth";

interface TemplateGalleryProps {
  onClose: () => void;
  onSelectTemplate: (template: BuilderPage) => void;
}

const TemplateGallery = ({ onClose, onSelectTemplate }: TemplateGalleryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'yours' | 'catalog'>("yours");
  const [landingPages, setLandingPages] = useState<any[]>([]);
  const [lpPage, setLpPage] = useState(1);
  const perPage = 9;
  const [isLoadingYours, setIsLoadingYours] = useState(false);
  const [drafts, setDrafts] = useState<BuilderPage[]>([]);

  useEffect(() => {
    const fetchYours = async () => {
      try {
        setIsLoadingYours(true);
        const headers = getAuthHeaders();
        const res = await fetch('/api/landing-pages', { headers });
        if (res.ok) {
          const data = await res.json();
          setLandingPages(data.landingPages || []);
        }
      } catch (_) {
      } finally {
        setIsLoadingYours(false);
      }
    };

    const loadDrafts = () => {
      try {
        const raw = localStorage.getItem('builder_drafts');
        if (raw) {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) setDrafts(arr);
        }
      } catch (_) {}
    };

    fetchYours();
    loadDrafts();
  }, []);

  const templates: Array<BuilderPage & { 
    id: string; 
    name: string; 
    description: string; 
    category: string; 
    thumbnail: string;
    isPremium: boolean;
    tags: string[];
  }> = [
    {
      id: 'template-1',
      name: 'Business Landing',
      description: 'Professional business landing page with hero section and features',
      category: 'business',
      thumbnail: '/placeholder-template-1.jpg',
      isPremium: false,
      tags: ['business', 'professional', 'hero'],
      title: 'Business Landing Page',
      elements: [
        {
          id: 'hero-heading',
          type: 'heading',
          position: { x: 100, y: 100 },
          size: { width: 600, height: 80 },
          props: {
            text: 'Welcome to Our Business',
            fontSize: 48,
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center'
          }
        },
        {
          id: 'hero-subtitle',
          type: 'paragraph',
          position: { x: 100, y: 200 },
          size: { width: 600, height: 60 },
          props: {
            text: 'We provide the best solutions for your business needs',
            fontSize: 20,
            color: '#6b7280',
            textAlign: 'center'
          }
        },
        {
          id: 'cta-button',
          type: 'button',
          position: { x: 300, y: 300 },
          size: { width: 200, height: 50 },
          props: {
            text: 'Get Started',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            borderRadius: 8,
            fontSize: 18
          }
        }
      ],
      settings: {
        backgroundColor: '#ffffff',
        maxWidth: 1200,
        padding: 40
      }
    },
    {
      id: 'template-2',
      name: 'E-commerce Store',
      description: 'Modern e-commerce landing page with product showcase',
      category: 'ecommerce',
      thumbnail: '/placeholder-template-2.jpg',
      isPremium: true,
      tags: ['ecommerce', 'store', 'products'],
      title: 'E-commerce Store',
      elements: [
        {
          id: 'store-title',
          type: 'heading',
          position: { x: 100, y: 100 },
          size: { width: 500, height: 60 },
          props: {
            text: 'Amazing Products',
            fontSize: 36,
            fontWeight: 'bold',
            color: '#1f2937'
          }
        },
        {
          id: 'product-image',
          type: 'image',
          position: { x: 100, y: 200 },
          size: { width: 300, height: 200 },
          props: {
            src: '/placeholder-product.jpg',
            alt: 'Product Image',
            objectFit: 'cover'
          }
        },
        {
          id: 'buy-button',
          type: 'button',
          position: { x: 100, y: 450 },
          size: { width: 150, height: 45 },
          props: {
            text: 'Buy Now',
            backgroundColor: '#10b981',
            color: '#ffffff',
            borderRadius: 6,
            fontSize: 16
          }
        }
      ],
      settings: {
        backgroundColor: '#f9fafb',
        maxWidth: 1200,
        padding: 30
      }
    },
    {
      id: 'template-3',
      name: 'Portfolio Showcase',
      description: 'Creative portfolio page to showcase your work',
      category: 'portfolio',
      thumbnail: '/placeholder-template-3.jpg',
      isPremium: false,
      tags: ['portfolio', 'creative', 'showcase'],
      title: 'My Portfolio',
      elements: [
        {
          id: 'portfolio-title',
          type: 'heading',
          position: { x: 100, y: 100 },
          size: { width: 400, height: 50 },
          props: {
            text: 'Creative Portfolio',
            fontSize: 32,
            fontWeight: 'bold',
            color: '#1f2937'
          }
        },
        {
          id: 'portfolio-description',
          type: 'paragraph',
          position: { x: 100, y: 170 },
          size: { width: 400, height: 80 },
          props: {
            text: 'Showcasing my creative work and projects',
            fontSize: 16,
            color: '#6b7280'
          }
        }
      ],
      settings: {
        backgroundColor: '#ffffff',
        maxWidth: 1200,
        padding: 50
      }
    },
    {
      id: 'template-4',
      name: 'Event Landing',
      description: 'Event promotion page with countdown timer',
      category: 'event',
      thumbnail: '/placeholder-template-4.jpg',
      isPremium: true,
      tags: ['event', 'countdown', 'promotion'],
      title: 'Upcoming Event',
      elements: [
        {
          id: 'event-title',
          type: 'heading',
          position: { x: 100, y: 100 },
          size: { width: 500, height: 60 },
          props: {
            text: 'Amazing Event Coming Soon',
            fontSize: 40,
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center'
          }
        },
        {
          id: 'register-button',
          type: 'button',
          position: { x: 250, y: 300 },
          size: { width: 200, height: 50 },
          props: {
            text: 'Register Now',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            borderRadius: 8,
            fontSize: 18
          }
        }
      ],
      settings: {
        backgroundColor: '#fef2f2',
        maxWidth: 1200,
        padding: 40
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'business', name: 'Business', count: templates.filter(t => t.category === 'business').length },
    { id: 'ecommerce', name: 'E-commerce', count: templates.filter(t => t.category === 'ecommerce').length },
    { id: 'portfolio', name: 'Portfolio', count: templates.filter(t => t.category === 'portfolio').length },
    { id: 'event', name: 'Event', count: templates.filter(t => t.category === 'event').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Template Gallery</h1>
            <Badge variant="secondary" className="text-xs">
              {(landingPages?.length || 0) + (drafts?.length || 0)} items
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          
          <Button onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r bg-muted/30 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Bản nháp</h3>
                  {drafts.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Chưa có bản nháp</div>
                  ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {drafts.map((d, idx) => (
                <Card 
                        key={idx}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                        onClick={() => onSelectTemplate(d)}
                      >
                    <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Layout className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <div className="text-sm">Draft Preview</div>
                  </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{d.title || 'Draft'}</h3>
                            <Badge variant="outline" className="text-xs">Draft</Badge>
                      </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">{d.elements?.length || 0} elements</p>
                  </CardContent>
                </Card>
              ))}
            </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Đã lưu</h3>
                  {isLoadingYours ? (
                    <div className="text-sm text-muted-foreground">Đang tải...</div>
                  ) : (landingPages.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Chưa có landing page nào</div>
                  ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {landingPages.slice((lpPage-1)*perPage, lpPage*perPage).map(lp => (
                      <Card 
                        key={lp.slug}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                        onClick={async () => {
                          try {
                            const headers = getAuthHeaders();
                            const res = await fetch(`/api/landing-pages/${lp.slug}`, { headers });
                            if (res.ok) {
                              const data = await res.json();
                              if (data?.landingPage) {
                                onSelectTemplate({
                                  id: data.landingPage.slug,
                                  title: data.landingPage.title,
                                  elements: data.landingPage.elements || [],
                                  settings: data.landingPage.settings || { backgroundColor: '#ffffff', maxWidth: 1200, padding: 20 }
                                } as any);
                              }
                            }
                          } catch (_) {}
                        }}
                      >
                        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden flex items-center justify-center">
                          {lp.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <Layout className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <div className="text-sm">No Preview</div>
                      </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{lp.title}</h3>
                              <Badge variant="secondary" className="text-xs">/{lp.slug}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                              <Button asChild size="sm" variant="outline">
                                <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${lp.slug}`} target="_blank" rel="noopener noreferrer">Xem</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

                      {Math.ceil(landingPages.length / perPage) > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={lpPage === 1}
                            onClick={() => setLpPage(p => Math.max(1, p - 1))}
                          >
                            Trang trước
                          </Button>
                          <div className="text-xs text-muted-foreground">
                            Trang {lpPage} / {Math.ceil(landingPages.length / perPage)}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={lpPage >= Math.ceil(landingPages.length / perPage)}
                            onClick={() => setLpPage(p => Math.min(Math.ceil(landingPages.length / perPage), p + 1))}
                          >
                            Trang sau
                          </Button>
            </div>
          )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
