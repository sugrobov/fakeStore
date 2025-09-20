import App from "../containers/App";
import ProductList from "../components/ProductList";
import ProductDetail from "../containers/ProductDetail";
import ProductAddForm from "../components/ProductAddForm";
import FeedbackForm from "../containers/FeedbackForm";
import AboutFrom from "../components/AboutFrom";
import ProductEditForm from "../containers/ProductEditForm";
import CartPage from "../components/CartPage";

import Login from "../components/Login";
import Logout from "../components/Logout";


import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


/**
 * 
 * @param {children} - Дочерние компоненты
 * @returns {маршрут}
 */
export const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated ? children : <Navigate to="/login" />
}

/**
 * Конфигурация маршрутов
 * @param {React.ComponentType} props.ProductList - Компонент списка продуктов
 * @param {React.ComponentType} props.ProductDetail - Компонент деталей продукта
 * @returns {routesConfig []} Массив объектов конфигурации маршрутов
 */


export const routesConfig = () => [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/logout',
        element: <Logout />,
    },

    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <PrivateRoute><ProductList /></PrivateRoute>, },
            { path: 'products', element: <PrivateRoute><ProductList /></PrivateRoute> }, // Добавлен путь для списка продуктов после успешного редактирования
            { path: 'product/:id', element: <PrivateRoute><ProductDetail /></PrivateRoute>, },
            { path: '/create', element: <PrivateRoute><ProductAddForm /></PrivateRoute>, },
            { path: '/cart', element: <PrivateRoute><CartPage /></PrivateRoute>, },
            { path: '/feedback', element: <PrivateRoute><FeedbackForm /></PrivateRoute>, },
            { path: '/about', element: <PrivateRoute><AboutFrom /></PrivateRoute>, },
            { path: '/product/edit/:id', element: <PrivateRoute><ProductEditForm /></PrivateRoute>, },
            { path: '*', element: '404', }
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
 * // 
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
    // {
    //     path: "/link2",
    //     label: "Link 2",
    //     mobileProps: {
    //         className: "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors",
    //         activeClass: "bg-blue-50 text-blue-600"
    //     },
    //     desktopProps: {
    //         className: "relative py-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out",
    //         activeIndicator: "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ease-in-out"
    //     }
    // },
    // {
    //     path: "/link3",
    //     label: "Link 3",
    //     mobileProps: {
    //         className: "block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors",
    //         activeClass: "bg-blue-50 text-blue-600"
    //     },
    //     desktopProps: {
    //         className: "relative py-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out",
    //         activeIndicator: "absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ease-in-out"
    //     }
    // },
    {
        path: "/create",
        label: "Добавить",
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