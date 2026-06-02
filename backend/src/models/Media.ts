import { BaseMockModel } from './BaseMockModel';

export interface IMedia {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  type: 'movie' | 'series' | 'sport';
  posterUrl: string;
  videoUrl: string;
  previewUrl?: string;
  rating: number;
  tags: string[];
  featured: boolean;
  live: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class MediaClass extends BaseMockModel implements IMedia {
  static dbName = 'Media';

  id: string;
  _id: string;
  title: string;
  description: string;
  category: string;
  type: 'movie' | 'series' | 'sport';
  posterUrl: string;
  videoUrl: string;
  previewUrl?: string;
  rating: number;
  tags: string[];
  featured: boolean;
  live: boolean;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: Partial<IMedia>) {
    super();
    this.title = data.title || '';
    this.description = data.description || '';
    this.category = data.category || '';
    this.type = data.type || 'movie';
    this.posterUrl = data.posterUrl || '';
    this.videoUrl = data.videoUrl || '';
    this.previewUrl = data.previewUrl;
    this.rating = data.rating || 0;
    this.tags = data.tags || [];
    this.featured = data.featured || false;
    this.live = data.live || false;
    this.id = data.id || data._id || Math.random().toString(36).substring(2, 15);
    this._id = this.id;
    if (data.createdAt) this.createdAt = data.createdAt;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
  }
}

export const Media = MediaClass as any;
