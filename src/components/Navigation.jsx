import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../config';

export default function Navigation({ mobile = false, onClose }) {
    const location = useLocation();

    // Определяем активный путь
    const isActive = (path) => location.pathname === path;

    // // классы для ссылок
    // const baseLinkClass = "relative py-2 px-1 transition-all duration-300 ease-in-out";
    // const desktopLinkClass = `${baseLinkClass} text-gray-600 hover:text-blue-600`;
    // const mobileLinkClass = `${baseLinkClass} block text-gray-700 hover:text-blue-600`;

    // {/* Подчеркивание для активной ссылки */ }
    // const activeLinkClass = `absolute bottom-0 left-0 h-0.5 bg-blue-600 
    //       transition-all duration-200 ease-in-out`;

    return (
        <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`${link.desktopProps.className}`}
                >
                    {link.label}
                    <span
                        className={`${link.desktopProps.activeIndicator} ${isActive(link.path) ? 'w-full' : 'w-0'
                            }`}
                    />
                </Link>
            ))}
        </nav>
    );
}