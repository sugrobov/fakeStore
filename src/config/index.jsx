import App from "../containers/App";
import ProductList from "../components/ProductList";
import ProductDetail from "../containers/ProductDetail";
import FeedbackForm from "../containers/FeedbackForm";
import AboutFrom from "../components/AboutFrom";


/**
 * Конфигурация маршрутов
 * @param {React.ComponentType} props.ProductList - Компонент списка продуктов
 * @param {React.ComponentType} props.ProductDetail - Компонент деталей продукта
 * @returns {routesConfig []} Массив объектов конфигурации маршрутов
 */


export const routesConfig = () => [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <ProductList />,
            },
            {
                path: 'product/:id',
                element: <ProductDetail />,
            },
            {
                path: '/link2',
                element: 'Page 2',
            },
            {
                path: '/link3',
                element: 'Page 3',
            },
            {
                path: '/feedback',
                element: <FeedbackForm />,
            },
            {
                path: '/about',
                element: <AboutFrom />,
            },
            {
                path: '*',
                element: '404',
            }
        ]
    }
];

/**
 * Конфигурация стилей для мобильной версии навигации
 * @typedef {Object} MobileLinkProps
 * @property {string} className - CSS-классы для мобильного элемента
 * @property {string} activeClass - CSS-классы для активного состояния (мобильная версия)
 */

/**
 * Конфигурация стилей для десктопной версии навигации
 * @typedef {Object} DesktopLinkProps
 * @property {string} className - CSS-классы для десктопного элемента
 * @property {string} activeIndicator - CSS-стили для индикатора активного состояния
 */

/**
 * Конфигурация навигационной ссылки
 * @typedef {Object} NavLinkConfig
 * @property {string} path - Путь для роутинга
 * @property {string} label - Текст ссылки
 * @property {MobileLinkProps} mobileProps - Стили для мобильной версии
 * @property {DesktopLinkProps} desktopProps - Стили для десктопной версии
 */

/**
 * Массив конфигураций навигационных ссылок
 * @type {navLinks[]}
 * @description 
 * 
 * @example
 * // как использовать :
 * navLinks.map(link => (
 *   <NavLink 
 *     to={link.path}
 *     className={link.desktopProps.className}
 *     activeClassName={link.mobileProps.activeClass}
 *   >
 *     {link.label}
 *   </NavLink>
 * ))
 */

export const navLinks = [

    {
        path: "/",
        label: "Главная",
        mobileProps: {
            className: "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors",
            activeClass: "bg-blue-50 text-blue-600"
        },
        desktopProps: {
            className: "relative py-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out",
            activeIndicator: "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ease-in-out"
        }
    },
    {
        path: "/link2",
        label: "Link 2",
        mobileProps: {
            className: "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors",
            activeClass: "bg-blue-50 text-blue-600"
        },
        desktopProps: {
            className: "relative py-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out",
            activeIndicator: "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ease-in-out"
        }
    },
    {
        path: "/link3",
        label: "Link 3",
        mobileProps: {
            className: "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors",
            activeClass: "bg-blue-50 text-blue-600"
        },
        desktopProps: {
            className: "relative py-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out",
            activeIndicator: "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ease-in-out"
        }
    },
    {
        path: "/about",
        label: "О компании",
        mobileProps: {
            className: "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors",
            activeClass: "bg-blue-50 text-blue-600"
        },
        desktopProps: {
            className: "relative py-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out",
            activeIndicator: "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ease-in-out"
        }
    },
    {
        path: "/feedback",
        label: "Обратная связь",
        mobileProps: {
            className: "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors",
            activeClass: "bg-blue-50 text-blue-600"
        },
        desktopProps: {
            className: "relative py-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out",
            activeIndicator: "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ease-in-out"
        }
    },
];

/**
 * Количество элементов на странице
 */
export const ITEMS_PER_PAGE = 5;