import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ mobile = false, onClose }) {
    const location = useLocation();

    // Определяем активный путь
    const isActive = (path) => location.pathname === path;

    // классы для ссылок
    const baseLinkClass = "relative py-2 px-1 transition-all duration-300 ease-in-out";
    const desktopLinkClass = `${baseLinkClass} text-gray-600 hover:text-blue-600`;
    const mobileLinkClass = `${baseLinkClass} block text-gray-700 hover:text-blue-600`;

    {/* Подчеркивание для активной ссылки */ }
    const activeLinkClass = `absolute bottom-0 left-0 h-0.5 bg-blue-600 
          transition-all duration-200 ease-in-out`;

    return (
        <nav className={mobile ? "space-y-2" : "hidden md:flex space-x-6"}>
            <Link
                to="/"
                className={mobile ? mobileLinkClass : desktopLinkClass}
                onClick={mobile ? onClose : undefined}
            >
                Link 1
                <span className={`
          ${activeLinkClass} 
          ${isActive('/') ? 'w-full' : 'w-0'}
        `}></span>
            </Link>

            <Link
                to="/link2"
                className={mobile ? mobileLinkClass : desktopLinkClass}
                onClick={mobile ? onClose : undefined}
            >
                Link 2
                <span className={`
          ${activeLinkClass}
          ${isActive('/link2') ? 'w-full' : 'w-0'}
        `}></span>
            </Link>

            <Link
                to="/link3"
                className={mobile ? mobileLinkClass : desktopLinkClass}
                onClick={mobile ? onClose : undefined}
            >
                Link 3
                <span className={`
          ${activeLinkClass}
          ${isActive('/link3') ? 'w-full' : 'w-0'}
        `}></span>
            </Link>
        </nav>
    );
}