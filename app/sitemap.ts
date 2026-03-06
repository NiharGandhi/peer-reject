import { MetadataRoute } from 'next';

const APP_URL = 'https://peer-reject.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
