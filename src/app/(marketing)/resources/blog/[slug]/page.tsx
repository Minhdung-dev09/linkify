import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import blogs from "@/utils/constants/blogs.json";
import { apiGetBlogBySlug, apiListBlogs } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AnimationContainer, MaxWidthWrapper } from "@/components";
import type { Metadata } from 'next';

interface Props {
    params: {
        slug: string
    }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

function renderMarkdown(md?: string) {
  if (!md) return null;
  const lines = md.split('\n');
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let inCode = false;
  let codeBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-2">
        {listBuffer.map((l, i) => (
          <li key={i}>{l.replace(/^[-*]\s*/, '')}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  const flushCode = () => {
    if (!inCode) return;
    elements.push(
      <pre key={`pre-${elements.length}`} className="bg-muted/40 rounded-lg p-4 overflow-auto text-sm"><code>{codeBuffer.join('\n')}</code></pre>
    );
    codeBuffer = [];
    inCode = false;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith('```')) {
      if (!inCode) {
        flushList();
        inCode = true;
        codeBuffer = [];
      } else {
        flushCode();
      }
      continue;
    }
    if (inCode) {
      codeBuffer.push(raw);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      listBuffer.push(line);
      continue;
    }
    flushList();
    if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${elements.length}`} className="text-xl md:text-2xl font-semibold mt-8 mb-3">{line.replace('### ', '')}</h3>);
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${elements.length}`} className="text-2xl md:text-3xl font-semibold mt-10 mb-4">{line.replace('## ', '')}</h2>);
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={`h1-${elements.length}`} className="text-3xl md:text-4xl font-bold mt-12 mb-6">{line.replace('# ', '')}</h1>);
      continue;
    }
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={`bq-${elements.length}`} className="border-l-4 pl-4 py-2 my-4 text-muted-foreground">
          {line.replace('> ', '')}
        </blockquote>
      );
      continue;
    }
    if (line === '') {
      elements.push(<div key={`sp-${elements.length}`} className="h-3" />);
      continue;
    }
    // paragraph
    elements.push(<p key={`p-${elements.length}`} className="leading-7 text-base md:text-lg">{line}</p>);
  }
  flushList();
  flushCode();
  return <div className="prose prose-invert max-w-none">{elements}</div>;
}

const BlogPage = async ({ params }: Props) => {
  let blog: any = null;
  try {
    blog = await apiGetBlogBySlug(params.slug);
  } catch {
    // fallback to static mock if backend not available
    blog = blogs.find((b) => b.slug === params.slug);
  }
  if (!blog || blog.published === false) {
    return (
      <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-4 md:px-6 py-24">
        <p className="text-muted-foreground">Bài viết không tồn tại hoặc đã bị ẩn.</p>
        <Link href="/resources/blog" className="mt-6 underline">Quay lại Blog</Link>
      </div>
    )
  }

  let related: any[] = [];
  try {
    const { items } = await apiListBlogs({ tag: Array.isArray(blog?.tags) ? blog.tags[0] : undefined, page: 1, limit: 6 });
    related = (items || []).filter((b: any) => b.slug !== blog.slug).slice(0, 3);
  } catch {
    related = blogs.filter((b) => b.slug !== blog.slug && b.tags && blog.tags && b.tags.some((t: string) => blog.tags!.includes(t))).slice(0, 3);
  }
  const shareUrl = (blog.seo && blog.seo.canonical_url) || `https://yourdomain.com/resources/blog/${blog.slug}`;

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <MaxWidthWrapper>
        <div className="pt-6">
          <span className="text-sm text-muted-foreground">
            from CCmeTech with ❤️
            </span>
        </div>
      </MaxWidthWrapper>

      {/* Hero */}
      <div className="relative mt-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        <div className="h-[36vh] md:h-[48vh] w-full overflow-hidden">
          <Image src={blog.image || "/assets/blog1.jpg"} alt={blog.title} width={1920} height={1080} priority className="w-full h-full object-cover" />
        </div>
      </div>

      <MaxWidthWrapper>
        <AnimationContainer delay={0.05} className="-mt-16 md:-mt-24">
          <div className="rounded-2xl bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={blog.author?.image} alt={blog.author?.name} />
                  <AvatarFallback>{(blog.author?.name || 'A').slice(0,1)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground">{formatDate(blog.date_published)} • {blog.read_time_minutes || 5} phút đọc</div>
                  <div className="text-base md:text-lg font-medium">{blog.author?.name}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {Array.isArray(blog.tags) && blog.tags.map((t: string) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold font-heading mt-6 !leading-tight">
              {blog.title}
                </h1>
            {blog.description && (
              <p className="text-base md:text-lg mt-4 text-muted-foreground max-w-3xl">{blog.description}</p>
            )}

            <Separator className="my-8" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
              {/* Content */}
              <div className="min-w-0">
                {blog.content_html ? (
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content_html }} />
                ) : (
                  renderMarkdown((blog as any).content_markdown)
                )}

                {blog.cover_image_credit?.text && (
                  <p className="text-xs text-muted-foreground mt-8">Ảnh bìa: <a href={blog.cover_image_credit.url} target="_blank" rel="noreferrer" className="underline">{blog.cover_image_credit.text}</a></p>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div>
                  <div className="text-sm font-medium mb-3">Chia sẻ</div>
                  <div className="flex gap-2 flex-wrap">
                    <Link target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}><Button variant="outline" size="sm">Facebook</Button></Link>
                    <Link target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}><Button variant="outline" size="sm">Twitter</Button></Link>
                    <Link target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}><Button variant="outline" size="sm">LinkedIn</Button></Link>
                  </div>
                </div>

                {blog.author?.bio && (
                  <div className="rounded-xl border p-4 bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={blog.author.image} alt={blog.author.name} />
                        <AvatarFallback>{(blog.author.name || 'A').slice(0,1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{blog.author.name}</div>
                        <div className="text-xs text-muted-foreground">Tác giả</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{blog.author.bio}</p>
                    <div className="flex gap-3 mt-3">
                      {blog.author.socials?.website && (<Link className="text-xs underline" href={blog.author.socials.website} target="_blank" rel="noreferrer">Website</Link>)}
                      {blog.author.socials?.twitter && (<Link className="text-xs underline" href={blog.author.socials.twitter} target="_blank" rel="noreferrer">Twitter</Link>)}
                      {blog.author.socials?.linkedin && (<Link className="text-xs underline" href={blog.author.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</Link>)}
                    </div>
                  </div>
                )}

                {related.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Bài viết liên quan</div>
                    <ul className="space-y-2">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link href={`/resources/blog/${r.slug}`} className="text-sm hover:underline">
                            {r.title}
                          </Link>
                          <div className="text-xs text-muted-foreground">{formatDate(r.date_published)}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
        </div>
    )
};

export default BlogPage

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let blog: any = null;
  try {
    blog = await apiGetBlogBySlug(params.slug);
  } catch {
    blog = blogs.find((b) => b.slug === params.slug);
  }
  if (!blog) return {};
  const title = blog.seo?.title || blog.title;
  const description = blog.seo?.description || blog.description;
  const url = blog.seo?.canonical_url || `https://yourdomain.com/resources/blog/${blog.slug}`;
  const images = [blog.seo?.og_image || blog.image].filter(Boolean) as string[];
  const robots = {
    index: blog.seo?.noindex ? false : true,
    follow: blog.seo?.nofollow ? false : true,
  } as const;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots,
    openGraph: {
      type: blog.seo?.og_type || 'article',
      siteName: blog.seo?.og_site_name,
      url,
      title,
      description,
      images,
    },
    twitter: {
      card: (blog.seo?.twitter_card as any) || 'summary_large_image',
      site: blog.seo?.twitter_site,
      creator: blog.seo?.twitter_creator,
      title,
      description,
      images,
    },
    keywords: blog.seo?.meta_keywords,
  };
}
