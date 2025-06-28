import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../config';

/**
 * Компонент навигации для мобильных устройств
 * @param {mobile} - boolean мобильное устройство
 * @param {onClose} - функция для закрытия модального окна
 * @returns 
 */
export default function Navigation({ mobile = false, onClose }) {
    const location = useLocation();

    // Определяем активный путь
    const isActive = (path) => location.pathname === path;

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