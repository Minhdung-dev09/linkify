"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/lib/auth";
import { ApiBlog, apiAdminCreateBlog, apiAdminDeleteBlog, apiAdminListBlogs, apiAdminUpdateBlog } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
const ReactQuill: any = dynamic(() => import("react-quill" as any), { ssr: false }) as any;
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

export default function AdminBlogsPage() {
  const token = getToken();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ApiBlog | null>(null);
  const [form, setForm] = useState<Partial<ApiBlog>>({ published: false, read_time_minutes: 5 });
  const [tagInput, setTagInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [useRichEditor, setUseRichEditor] = useState(true);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const slugify = (input: string) => {
    return input
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["admin-blogs", { search }],
    queryFn: () => apiAdminListBlogs(token!, { q: search, page: 1, limit: 50 }),
    enabled: !!token,
  });

  const createMut = useMutation({
    mutationFn: (payload: Partial<ApiBlog>) => apiAdminCreateBlog(token!, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blogs"] }); setOpen(false); setEditing(null); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ApiBlog> }) => apiAdminUpdateBlog(token!, id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blogs"] }); setOpen(false); setEditing(null); },
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => apiAdminDeleteBlog(token!, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blogs"] }),
  });

  const items = data?.items || [];

  const handleOpenCreate = () => {
    setEditing(null);
    setForm({ published: false, read_time_minutes: 5 });
    setSlugManuallyEdited(false);
    setOpen(true);
  };

  const handleOpenEdit = (b: ApiBlog) => {
    setEditing(b);
    setForm({ ...b });
    setSlugManuallyEdited(false);
    setOpen(true);
  };

  const handleSubmit = () => {
    const payload: Partial<ApiBlog> = {
      ...form,
      author: { name: form.author?.name || "Admin" },
      seo: {
        ...(form.seo || {}),
        meta_keywords: form.seo?.meta_keywords || [],
      },
    };
    if (!payload.slug || !payload.title || !payload.author?.name) return alert("Cần slug và title");
    if (editing?._id) {
      updateMut.mutate({ id: editing._id, payload });
    } else {
      createMut.mutate(payload);
    }
  };

  const addTag = () => {
    const v = tagInput.trim();
    if (!v) return;
    setForm((f) => ({ ...f, tags: Array.from(new Set([...(f.tags || []), v])) }));
    setTagInput("");
  };

  const removeTag = (t: string) => {
    setForm((f) => ({ ...f, tags: (f.tags || []).filter((x) => x !== t) }));
  };

  const addKeyword = () => {
    const v = keywordInput.trim();
    if (!v) return;
    setForm((f) => ({
      ...f,
      seo: { ...(f.seo || {}), meta_keywords: Array.from(new Set([...(f.seo?.meta_keywords || []), v])) }
    }));
    setKeywordInput("");
  };

  const removeKeyword = (k: string) => {
    setForm((f) => ({
      ...f,
      seo: { ...(f.seo || {}), meta_keywords: (f.seo?.meta_keywords || []).filter((x) => x !== k) }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quản lý Blog</CardTitle>
          <div className="flex items-center gap-2">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo từ khoá..." className="w-64" />
            <Button onClick={handleOpenCreate}>Thêm bài viết</Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6 text-muted-foreground">Đang tải...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Ngày đăng</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Xuất bản</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((b) => (
                    <TableRow key={b._id || b.slug}>
                      <TableCell className="font-medium">{b.title}</TableCell>
                      <TableCell>{b.slug}</TableCell>
                      <TableCell>{b.date_published ? new Date(b.date_published).toLocaleDateString() : "-"}</TableCell>
                      <TableCell className="space-x-1">
                        {(b.tags || []).slice(0, 3).map((t) => (<Badge key={t} variant="secondary">{t}</Badge>))}
                      </TableCell>
                      <TableCell>
                        <Switch checked={!!b.published} onCheckedChange={(v) => updateMut.mutate({ id: String(b._id), payload: { published: v, date_published: v && !b.date_published ? new Date().toISOString() : b.date_published } })} />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleOpenEdit(b)}>Sửa</Button>
                        <Button size="sm" variant="destructive" onClick={() => { if (confirm("Xoá bài viết?")) deleteMut.mutate(String(b._id)); }}>Xoá</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[96vw] md:max-w-5xl lg:max-w-6xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>{editing ? "Cập nhật bài viết" : "Thêm bài viết"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(90vh-140px)] overflow-y-auto pr-1">
            {/* Left: Title, Description, Content */}
            <div className="flex flex-col min-h-0">
              <div className="space-y-3">
                <Input
                  value={form.title || ""}
                  onChange={(e) => {
                    const nextTitle = e.target.value;
                    setForm((f) => {
                      const next: Partial<ApiBlog> = { ...f, title: nextTitle };
                      if (!slugManuallyEdited) {
                        next.slug = slugify(nextTitle);
                      }
                      return next;
                    });
                  }}
                  placeholder="Tiêu đề"
                />
                <Textarea value={form.description || ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Mô tả ngắn" className="min-h-[88px]" />
              </div>
              <div className="mt-4 flex-1 min-h-0 space-y-2">
                <div className="flex items-center gap-3">
                  <Switch checked={useRichEditor} onCheckedChange={setUseRichEditor} />
                  <span className="text-sm">Dùng Rich Editor</span>
                </div>
                {useRichEditor ? (
                  <div className="min-h-[320px] h-full">
                    <ReactQuill theme="snow" value={form.content_html || ""} onChange={(v: string) => setForm((f) => ({ ...f, content_html: v }))} className="h-[calc(100%-8px)]" />
                  </div>
                ) : (
                  <Textarea value={form.content_markdown || ""} onChange={(e) => setForm((f) => ({ ...f, content_markdown: e.target.value }))} placeholder="# Nội dung markdown" className="h-full min-h-[320px]" />
                )}
              </div>
            </div>

            {/* Right: Slug, Image, Category, Tags, Publish, SEO */}
            <div className="space-y-6">
              <Input
                value={form.slug || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setSlugManuallyEdited(true);
                  setForm((f) => ({ ...f, slug: v }));
                }}
                onBlur={() => {
                  setForm((f) => ({ ...f, slug: f.slug ? slugify(f.slug) : f.slug }));
                }}
                placeholder="Slug (unique)"
              />
              <Input value={form.image || ""} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="Ảnh bìa (URL)" />
              {form.image && (
                <div className="rounded-lg border overflow-hidden">
                  <div className="relative w-full h-40">
                    <Image
                      src={form.image}
                      alt="Xem trước ảnh bìa"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              <Input value={form.category || ""} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Danh mục" />

              {/* Tags input with Enter add and chips */}
              <div>
                <div className="text-sm mb-2">Tags</div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); addTag(); }
                    }}
                    placeholder="Nhập tag và nhấn Enter"
                  />
                  <Button type="button" variant="outline" onClick={addTag}>Thêm</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(form.tags || []).map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-sm">
                      {t}
                      <button aria-label="Remove" className="hover:text-destructive" onClick={() => removeTag(t)}>
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={!!form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} />
                <span className="text-sm">Xuất bản</span>
              </div>

              {/* SEO Section */}
              <div className="space-y-3 border-t pt-4">
                <div className="text-sm font-medium">SEO</div>
                <Input value={form.seo?.title || ""} onChange={(e) => setForm((f) => ({ ...f, seo: { ...(f.seo || {}), title: e.target.value } }))} placeholder="SEO Title (tối ưu 50-60 ký tự)" />
                <Textarea value={form.seo?.description || ""} onChange={(e) => setForm((f) => ({ ...f, seo: { ...(f.seo || {}), description: e.target.value } }))} placeholder="SEO Description (tối ưu 150-160 ký tự)" />
                <Input value={form.seo?.canonical_url || ""} onChange={(e) => setForm((f) => ({ ...f, seo: { ...(f.seo || {}), canonical_url: e.target.value } }))} placeholder="Canonical URL" />
                <Input value={form.seo?.og_image || ""} onChange={(e) => setForm((f) => ({ ...f, seo: { ...(f.seo || {}), og_image: e.target.value } }))} placeholder="OG Image URL (1200x630 đề xuất)" />

                {/* Keywords */}
                <div>
                  <div className="text-sm mb-2">Keywords</div>
                  <div className="flex gap-2">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }}
                      placeholder="Nhập keyword và nhấn Enter"
                    />
                    <Button type="button" variant="outline" onClick={addKeyword}>Thêm</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(form.seo?.meta_keywords || []).map((k) => (
                      <span key={k} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-sm">
                        {k}
                        <button aria-label="Remove" className="hover:text-destructive" onClick={() => removeKeyword(k)}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Robots */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <Switch checked={!!form.seo?.noindex} onCheckedChange={(v) => setForm((f) => ({ ...f, seo: { ...(f.seo || {}), noindex: v } }))} />
                    noindex
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Switch checked={!!form.seo?.nofollow} onCheckedChange={(v) => setForm((f) => ({ ...f, seo: { ...(f.seo || {}), nofollow: v } }))} />
                    nofollow
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Huỷ</Button>
            <Button onClick={handleSubmit} disabled={createMut.isPending || updateMut.isPending}>{editing ? "Lưu" : "Tạo"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


