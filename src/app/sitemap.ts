import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) {
    return [];
  }

  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/resources/help`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}


