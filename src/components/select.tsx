import type { ChangeEvent } from 'react';

export default function Select({
  label,
  options,
  defaultValue,
  onChange,
}: Readonly<{
  label: string;
  options: { key: string; value: string }[];
  defaultValue?: string;
  onChange?(event: ChangeEvent<HTMLSelectElement>): void;
}>) {
  return (
    <div className='flex flex-col justify-between gap-y-1'>
      <label className='font-medium text-neutral-600 dark:text-neutral-300'>
        {label}
      </label>
      <select
        className='with-focus-ring h-full rounded-lg border border-neutral-500 p-1 dark:border-neutral-300'
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}
