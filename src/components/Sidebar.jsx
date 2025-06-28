
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../config';

/**
 * 
 * @param {isOpen} - boolean если true, то сайдбар будет открыт
 * @param {onClose} - функция для закрытия сайдбара
 * @param {children} - содержимое сайдбара
 * @returns компонент Sidebar
 */
export default function Sidebar({ isOpen, onClose, children }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // // Стили для мобильных ссылок
  // const mobileLinkClass = "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors";
  // const activeMobileLinkClass = "bg-blue-50 text-blue-600";

  return (

    <>
      {/* Затемнение фона для мобильной версии */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 md:w-56`}
      >
        <div className="flex flex-col h-full">
          {/* Шапка сайдбара */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold">Menu</h2>
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

          {/* Мобильная навигация */}
          <div className="md:hidden border-b overflow-y-auto">
            <nav className="space-y-1 p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${link.mobileProps.className} ${isActive(link.path) ? link.mobileProps.activeClass : ''
                    }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Основное содержимое сайдбара с возможностью прокрутки */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </aside>
    </>
  );
}