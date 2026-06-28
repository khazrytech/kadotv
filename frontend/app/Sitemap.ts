
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kadotv.work.gd',
      lastModified: new Date(),
    },
  ]
}
