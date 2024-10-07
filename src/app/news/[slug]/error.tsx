'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='m-8 flex flex-col items-center justify-center gap-y-4'>
      <img
        className='w-80 rounded-xl'
        src='/failed-to-load.jpg'
        alt='An error occurred'
      />
      <div className='text-base font-semibold lg:text-lg'>
        An error occurred
      </div>
      <button className='button-primary' onClick={reset}>
        Try again
      </button>
    </div>
  );
}
