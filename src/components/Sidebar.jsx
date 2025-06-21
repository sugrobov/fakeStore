
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose, children }) {
      const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // Стили для мобильных ссылок
    const mobileLinkClass = "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors";
    const activeMobileLinkClass = "bg-blue-50 text-blue-600";

  return (
    
          <>
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0 md:w-56`}
            >
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
                <div className="md:hidden border-b">
                    <nav className="space-y-1 p-2">
                        <Link
                            to="/"
                            className={`${mobileLinkClass} ${isActive('/') ? activeMobileLinkClass : ''}`}
                            onClick={onClose}
                        >
                            Link 1
                        </Link>
                        <Link
                            to="/link2"
                            className={`${mobileLinkClass} ${isActive('/link2') ? activeMobileLinkClass : ''}`}
                            onClick={onClose}
                        >
                            Link 2
                        </Link>
                        <Link
                            to="/link3"
                            className={`${mobileLinkClass} ${isActive('/link3') ? activeMobileLinkClass : ''}`}
                            onClick={onClose}
                        >
                            Link 3
                        </Link>
                    </nav>
                </div>

                <div className="p-4 h-full overflow-y-auto">
                    {children}
                </div>
            </aside>
      
    </>
      
  );
}