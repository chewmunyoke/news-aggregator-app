'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import IcSearch from '@/assets/search.svg';
import Select from '@/components/select';
import Tabs from '@/components/tabs';
import {
  CATEGORIES,
  COUNTRIES,
  LANGUAGES,
  SORTS,
  defaultParams,
} from '@/utils/api';

export default function Header({
  currentCategory,
}: {
  currentCategory: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef(0);

  const [query, setQuery] = useState<string>(
    searchParams.get('keywords') || ''
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    searchParams.get('countries') || ''
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    searchParams.get('languages') || defaultParams.languages!
  );
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get('sort') || defaultParams.sort!
  );

  const fetchNews = () => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('keywords', query.toString());
    } else {
      params.delete('keywords');
    }
    if (selectedCountry) {
      params.set('countries', selectedCountry);
    } else {
      params.delete('countries');
    }
    params.set('languages', selectedLanguage);
    params.set('sort', selectedSort);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchNews();
    }
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  const handleButtonClick = () => {
    fetchNews();
  };

  const handleTabClick = (index: number) => {
    const selectedCategory = CATEGORIES[index];
    const params = new URLSearchParams(searchParams);
    router.push(`/news/${selectedCategory}?${params.toString()}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;

      const scrollingElement =
        document.scrollingElement ?? document.documentElement;
      const diff = scrollingElement.scrollTop - scrollTopRef.current;
      const isScrollingDown = diff > 0;

      const headerHeight = header.clientHeight;
      const translateY = isScrollingDown ? headerHeight : 0;

      header.style.setProperty('--translateY', `-${translateY}px`);
      scrollTopRef.current = scrollingElement.scrollTop;
    };

    globalThis.addEventListener('scroll', handleScroll);

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className='responsive-header sticky top-0 z-40 flex flex-col transition-transform max-lg:translate-y-[--translateY]'
      ref={headerRef}
    >
      <div className='flex flex-col gap-4 bg-white pb-2 pt-4 dark:bg-black'>
        <div className='flex flex-auto flex-col gap-x-4 gap-y-2 lg:flex-row'>
          <div className='relative flex-auto'>
            <input
              className='with-focus-ring h-full w-full rounded-2xl border-neutral-500 px-4 pb-2 pt-5 dark:border-neutral-300'
              placeholder='Tip: include "-" in front of the phrase you wish to exclude'
              id='search-input'
              aria-labelledby='search-label'
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleInputKeydown}
            ></input>
            <label
              className='absolute left-0 top-1.5 mx-4 font-medium text-neutral-600 dark:text-neutral-300'
              id='search-label'
              htmlFor='search-input'
            >
              Search
            </label>
          </div>
          <div className='flex flex-wrap justify-between gap-x-4 gap-y-2'>
            <div className='flex flex-wrap gap-x-4 gap-y-2'>
              <Select
                label='Country'
                options={[{ key: '', value: '---' }, ...COUNTRIES]}
                defaultValue={selectedCountry}
                onChange={handleCountryChange}
              />
              <Select
                label='Language'
                options={LANGUAGES}
                defaultValue={selectedLanguage}
                onChange={handleLanguageChange}
              />
              <Select
                label='Sort'
                options={SORTS}
                defaultValue={selectedSort}
                onChange={handleSortChange}
              />
            </div>
            <div className='self-end'>
              <button
                className='group/button with-focus-ring relative rounded-2xl border-transparent bg-cyan-500 p-3 text-white hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-800 sm:p-3.5'
                aria-label='Search'
                onClick={handleButtonClick}
              >
                <IcSearch width={24} height={24} />
                <span className='absolute left-1/2 top-full hidden -translate-x-1/2 translate-y-0.5 rounded-md bg-zinc-700 px-2 py-1 text-xs group-hover/button:block lg:text-sm'>
                  Search
                </span>
              </button>
            </div>
          </div>
        </div>
        <Tabs
          id='categories'
          data={CATEGORIES.map((category) => ({
            label: `${category.charAt(0).toUpperCase()}${category.substring(1)}`,
            selected: category === currentCategory,
          }))}
          onTabClick={(index) => {
            handleTabClick(index);
          }}
        />
      </div>
      <div className='h-4 bg-gradient-to-b from-white dark:from-black'></div>
    </header>
  );
}
