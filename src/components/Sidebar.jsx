import { useEffect, useRef } from 'react';

export default function Sidebar({ isOpen, onClose, children }) {
  // const sidebarRef = useRef(null);
  // const overlayRef = useRef(null);

  // useEffect(() => {
  //   const handleEscape = (e) => {
  //     if (e.key === 'Escape') {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.body.classList.add('overflow-hidden');
  //     document.addEventListener('keydown', handleEscape);
  //   } else {
  //     document.body.classList.remove('overflow-hidden');
  //     document.removeEventListener('keydown', handleEscape);
  //   }

  //   return () => {
  //     document.body.classList.remove('overflow-hidden');
  //     document.removeEventListener('keydown', handleEscape);
  //   };
  // }, [isOpen, onClose]);

  // const handleOverlayClick = (e) => {
  //   if (e.target === overlayRef.current) {
  //     onClose();
  //   }
  // };

  return (
    <>
      {/* Overlay */}
      {/* <div
        ref={overlayRef}
        className={`fixed inset-0 z-20 transition-opacity duration-300 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        } md:hidden`}
        onClick={handleOverlayClick}
      /> */}

      {/* Sidebar */}
      <aside
        // ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:w-56`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 h-full overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
}