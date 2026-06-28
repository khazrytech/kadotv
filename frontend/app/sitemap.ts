import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kadotv.work.gd', // Hii ni homepage
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Ongeza kurasa zingine hapa bila kurudia ile ya juu
    {
      url: 'https://kadotv.work.gd/login', 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
