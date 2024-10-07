'use client';

import { useState } from 'react';

import Modal from '@/components/modal';
import type { NewsItem } from '@/types';

export default function NewsCard({ item }: Readonly<{ item: NewsItem }>) {
  item.language = item.language.toUpperCase();
  item.country = item.country.toUpperCase();
  if (!item.image) {
    item.image = '/no-image-placeholder.jpg';
  }

  const now = new Date();
  const publishedDate = new Date(item.published_at);
  const diff = now.getTime() - publishedDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const timeShort = `${days ? days + 'd' : hours ? hours + 'h' : minutes + 'm'}`;
  const timeLong = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(publishedDate.getTime());

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = '/no-image-placeholder.jpg';
  };

  return (
    <>
      <div
        className='relative h-full cursor-pointer overflow-hidden rounded-lg border border-transparent bg-white shadow-md transition-all hover:scale-105 focus:border-cyan-400 focus:outline-none focus:ring focus:ring-cyan-100 motion-reduce:transition-none dark:bg-neutral-800 dark:focus:border-cyan-500 dark:focus:ring-cyan-300'
        tabIndex={0}
        onClick={handleClick}
      >
        <figure>
          <img
            className='relative h-[200px] w-full object-cover'
            src={item.image}
            alt={item.title}
            loading='lazy'
            onError={handleImageError}
          />
        </figure>
        <div className='flex h-[calc(100%-200px)] flex-col justify-between gap-y-4 p-2 md:p-4'>
          <div className='flex flex-col gap-y-2'>
            <div className='line-clamp-5 font-bold'>{item.title}</div>
          </div>
          <div className='break-words text-xs lg:text-sm'>
            {`${item.source} • `}
            <time dateTime={timeShort}>{timeShort}</time>
            {` ago`}
          </div>
        </div>
        <div className='absolute right-0 top-0 flex flex-col items-end gap-y-1 p-1 md:p-2'>
          {[item.category, item.country, item.language].map((tag) => (
            <div
              key={tag}
              className='w-fit rounded-md bg-white/[.75] px-1 text-xs font-medium dark:bg-black/[.75] lg:text-sm'
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onClose={handleModalClose}>
        <article>
          <figure>
            <img
              className='h-[33dvh] w-full object-cover'
              src={item.image}
              alt={item.title}
              loading='lazy'
              onError={handleImageError}
            />
          </figure>
          <div className='flex h-auto max-h-[calc(100%-25dvh-70px)] flex-col gap-y-4 overflow-y-auto px-4 pt-4'>
            <div className='text-base font-semibold lg:text-lg'>
              {item.title}
            </div>
            <p>{item.description}</p>
            <div className='flex flex-wrap items-end justify-between gap-x-2 text-xs lg:text-sm'>
              <div>{item.source}</div>
              <time
                className='whitespace-nowrap'
                dateTime={publishedDate.toLocaleString()}
              >
                {timeLong}
              </time>
            </div>
          </div>
        </article>
        <div className='flex justify-end gap-x-4 p-4'>
          <button className='button-secondary' onClick={handleModalClose}>
            Close
          </button>
          <a className='button-primary' href={item.url} target='_blank'>
            Read more
          </a>
        </div>
      </Modal>
    </>
  );
}
