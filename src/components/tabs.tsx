'use client';

import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

function Tab({
  id,
  index,
  label,
  selected,
  focusDirty,
  focusIndex,
  selectedTab,
  setSelectedTab,
  onClick,
  onFocus,
}: {
  id: string;
  index: number;
  label: string;
  selected?: boolean;
  focusDirty: boolean;
  focusIndex: number;
  selectedTab?: string;
  setSelectedTab(id: string): void;
  onClick(): void;
  onFocus(): void;
}) {
  const tabRef = useRef<HTMLButtonElement>(null);

  // The selected tab is focusable by default
  // If there is no selected tab, make the first tab focusable
  const hasTabIndex = selected || (selectedTab === undefined && index === 0);

  useEffect(() => {
    const tab = tabRef.current as HTMLButtonElement;

    if (focusDirty && index === focusIndex) {
      tab.focus();
    }
  }, [focusIndex]);

  useEffect(() => {
    if (selected) {
      setSelectedTab(id);
    }
  }, [selected]);

  return (
    <li
      className={cx('group/tab', { 'is-selected': selected })}
      id={id}
      role='presentation'
    >
      <button
        className='with-focus-ring relative flex w-fit items-center justify-center rounded-md border-transparent px-2 py-1 font-semibold after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-0 after:-translate-x-1/2 after:rounded-md after:bg-cyan-500 after:transition-all after:duration-300 after:ease-bounce group-[.is-selected]/tab:text-cyan-500 group-[.is-selected]/tab:after:w-full group-[:not(.is-selected)]/tab:hover:bg-cyan-100 group-[:not(.is-selected)]/tab:hover:after:w-1/3 dark:group-[:not(.is-selected)]/tab:hover:bg-cyan-800'
        role='tab'
        tabIndex={hasTabIndex ? undefined : -1}
        aria-selected={Boolean(selected)}
        ref={tabRef}
        onClick={onClick}
        onFocus={onFocus}
      >
        {label}
      </button>
    </li>
  );
}

export default function Tabs({
  data,
  id = 'tabs',
  onTabClick,
}: {
  data: { label: string; selected?: boolean }[];
  id?: string;
  onTabClick(index: number): void;
}) {
  const [focusDirty, setFocusDirty] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(
    data.findIndex((item) => item.selected)
  );
  const [selectedTab, setSelectedTab] = useState<string>();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    switch (event.key) {
      case 'ArrowLeft':
        setFocusIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case 'ArrowRight':
        setFocusIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
        break;
      case 'Home':
        setFocusIndex(0);
        break;
      case 'End':
        setFocusIndex(data.length - 1);
        break;
    }
  };

  const handleTabFocus = (tabIndex: number) => {
    setFocusDirty(true);
    setFocusIndex(tabIndex);
  };

  return (
    <ul
      className='flex flex-wrap gap-y-2 md:gap-x-2'
      id={`${id}__tablist`}
      role='tablist'
      aria-orientation='horizontal'
      onKeyDown={handleKeyDown}
    >
      {data.map((item, index) => (
        <Tab
          {...item}
          key={`${id}__tab-${index}`}
          id={`${id}__tab-${index}`}
          index={index}
          focusDirty={focusDirty}
          focusIndex={focusIndex}
          onClick={() => {
            onTabClick?.(index);
          }}
          onFocus={() => {
            handleTabFocus(index);
          }}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </ul>
  );
}
