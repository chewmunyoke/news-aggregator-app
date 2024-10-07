'use client';

import { useTheme } from 'next-themes';

import IcMoon from '@/assets/moon.svg';
import IcSun from '@/assets/sun.svg';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <label
      className='fixed bottom-4 right-4 block cursor-pointer rounded-full bg-cyan-500 p-3 text-white shadow-lg transition-colors hover:bg-cyan-600 motion-reduce:transition-none dark:bg-cyan-700 dark:hover:bg-cyan-800'
      htmlFor='mode-toggle'
    >
      <input
        className='focus:outline-primary with-focus-ring absolute inset-0 cursor-pointer appearance-none rounded-full border-transparent dark:focus:border-cyan-500 dark:focus:ring-cyan-300'
        type='checkbox'
        id='mode-toggle'
        checked={theme === 'dark'}
        onChange={handleChange}
      />
      <IcSun
        className='dark:hidden'
        width={20}
        height={20}
        fill='currentColor'
      />
      <IcMoon
        className='hidden dark:block'
        width={20}
        height={20}
        fill='currentColor'
      />
      <span className='sr-only'>Toggle light / dark mode</span>
    </label>
  );
}
