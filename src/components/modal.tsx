'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export default function Modal({
  children,
  show,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  show: boolean;
  onClose(): void;
}>) {
  const portalRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    portalRef.current = document.getElementById('modal');

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return portalRef.current
    ? createPortal(
        <CSSTransition
          classNames='modal-'
          noderef={modalRef}
          in={show}
          timeout={300}
          unmountOnExit
        >
          <div
            className='fixed inset-0 z-50 content-center bg-black/[.50] backdrop-blur-sm'
            ref={modalRef}
            onClick={handleBackdropClick}
          >
            <div className='responsive-modal my-8 flex h-[calc(100dvh-4rem)] items-center justify-center'>
              <div className='grid h-fit max-h-full grid-rows-1 overflow-hidden rounded-2xl'>
                <div
                  className='h-full max-h-full bg-white dark:bg-neutral-800'
                  role='dialog'
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>,
        portalRef.current
      )
    : null;
}
