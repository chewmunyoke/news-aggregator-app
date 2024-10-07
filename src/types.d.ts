export type ButtonType = 'primary' | 'secondary';

export type SortType = 'published_desc' | 'published_asc' | 'popularity';

export interface SearchParams {
  keywords?: string;
  languages?: string;
  countries?: string;
  categories?: string;
  limit?: string;
  sort?: SortType;
}

export interface NewsItem {
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

export interface NewsSuccessResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: NewsItem[];
}

export interface NewsErrorResponse {
  error: {
    code: string;
    message: string;
    context?: Record<string, string>;
  };
}
