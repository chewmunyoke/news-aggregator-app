import { redirect } from 'next/navigation';

import { defaultParams } from '@/utils/api';

export default async function Home() {
  const paramsString = Object.entries(defaultParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  redirect(`/news/general?${paramsString}`);
}
