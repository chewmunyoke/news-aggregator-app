import type { SearchParams, SortType } from '@/types';

// API Reference: https://mediastack.com/documentation

export const COUNTRIES = [
  { key: 'ar', value: 'Argentina' },
  { key: 'au', value: 'Australia' },
  { key: 'at', value: 'Austria' },
  { key: 'be', value: 'Belgium' },
  { key: 'br', value: 'Brazil' },
  { key: 'bg', value: 'Bulgaria' },
  { key: 'ca', value: 'Canada' },
  { key: 'cn', value: 'China' },
  { key: 'co', value: 'Colombia' },
  { key: 'cz', value: 'Czech Republic' },
  { key: 'eg', value: 'Egypt' },
  { key: 'fr', value: 'France' },
  { key: 'de', value: 'Germany' },
  { key: 'gr', value: 'Greece' },
  { key: 'hk', value: 'Hong Kong' },
  { key: 'hu', value: 'Hungary' },
  { key: 'in', value: 'India' },
  { key: 'id', value: 'Indonesia' },
  { key: 'ie', value: 'Ireland' },
  { key: 'il', value: 'Israel' },
  { key: 'it', value: 'Italy' },
  { key: 'jp', value: 'Japan' },
  { key: 'lv', value: 'Latvia' },
  { key: 'lt', value: 'Lithuania' },
  { key: 'my', value: 'Malaysia' },
  { key: 'mx', value: 'Mexico' },
  { key: 'ma', value: 'Morocco' },
  { key: 'nl', value: 'Netherlands' },
  { key: 'nz', value: 'New Zealand' },
  { key: 'ng', value: 'Nigeria' },
  { key: 'no', value: 'Norway' },
  { key: 'ph', value: 'Philippines' },
  { key: 'pl', value: 'Poland' },
  { key: 'pt', value: 'Portugal' },
  { key: 'ro', value: 'Romania' },
  { key: 'sa', value: 'Saudi Arabia' },
  { key: 'rs', value: 'Serbia' },
  { key: 'sg', value: 'Singapore' },
  { key: 'sk', value: 'Slovakia' },
  { key: 'si', value: 'Slovenia' },
  { key: 'za', value: 'South Africa' },
  { key: 'kr', value: 'South Korea' },
  { key: 'se', value: 'Sweden' },
  { key: 'ch', value: 'Switzerland' },
  { key: 'tw', value: 'Taiwan' },
  { key: 'th', value: 'Thailand' },
  { key: 'tr', value: 'Turkey' },
  { key: 'ae', value: 'UAE' },
  { key: 'ua', value: 'Ukraine' },
  { key: 'gb', value: 'United Kingdom' },
  { key: 'us', value: 'United States' },
  { key: 've', value: 'Venezuela' },
];

export const LANGUAGES = [
  { key: 'en', value: 'English' },
  { key: 'ar', value: 'Arabic' },
  { key: 'de', value: 'German' },
  { key: 'es', value: 'Spanish' },
  { key: 'fr', value: 'French' },
  { key: 'he', value: 'Hebrew' },
  { key: 'it', value: 'Italian' },
  { key: 'nl', value: 'Dutch' },
  { key: 'no', value: 'Norwegian' },
  { key: 'pt', value: 'Portuguese' },
  { key: 'ru', value: 'Russian' },
  { key: 'se', value: 'Swedish' },
  { key: 'zh', value: 'Chinese' },
];

export const SORTS: { key: SortType; value: string }[] = [
  { key: 'published_desc', value: 'Published Date (Newest First)' },
  { key: 'published_asc', value: 'Published Date (Oldest First)' },
  { key: 'popularity', value: 'Popularity' },
];

export const CATEGORIES = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

export const defaultParams: SearchParams = {
  sort: 'published_desc',
  languages: 'en',
};

export const getApiEndpoint = (params: SearchParams = {}) => {
  const newParams = { ...defaultParams, ...params };
  const paramsString = Object.entries(newParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `https://api.mediastack.com/v1/news?access_key=${process.env.NEXT_PUBLIC_MEDIASTACK_API_KEY}&limit=100&${paramsString}`;
};
