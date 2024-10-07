import type {
  NewsErrorResponse,
  NewsSuccessResponse,
  SearchParams,
} from '@/types';
import { getApiEndpoint } from '@/utils/api';

import NewsCard from './card';

export const revalidate = 60 * 5; // 5 minutes

export default async function NewsPage({
  params,
  searchParams,
}: Readonly<{ params: { slug: string }; searchParams: SearchParams }>) {
  const category = params.slug;

  const response = await fetch(
    getApiEndpoint({ categories: category, ...searchParams })
  );
  const json = await response.json();

  if (!response.ok) {
    const { error } = json as NewsErrorResponse;

    return (
      <div className='m-8 flex flex-col items-center justify-center gap-y-4'>
        <img
          className='w-80 rounded-xl'
          src='/failed-to-load.jpg'
          alt='An error occurred'
        />
        <div className='text-base font-semibold lg:text-lg'>
          {`Error: ${error.code}`}
        </div>
        <div>{error.message}</div>
        {error.context ? (
          <ul>
            {Object.entries(error.context).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  const { data = [] } = json as NewsSuccessResponse;

  return data.length > 0 ? (
    <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6'>
      {data.map((item, index) => (
        <li key={index}>
          <NewsCard item={item} />
        </li>
      ))}
    </ul>
  ) : (
    <div className='m-8 flex flex-col items-center justify-center gap-y-4'>
      <img
        className='w-80 rounded-xl'
        src='/no-results-found.jpg'
        alt='No results found'
      />
      <div className='text-center'>
        <div className='text-base font-semibold lg:text-lg'>
          No results found
        </div>
        <div>Please try again with different filters or keywords</div>
      </div>
    </div>
  );
}
