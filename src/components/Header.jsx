import Navigation from "./Navigation";
import BurgerButton from "./BurgerButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";


/**
 * 
 * @param {toggleSidebar} - функция для открытия/закрытия бургер меню
 * @param {isSidebarOpen} - состояние бургер меню
 * @returns {JSX}
 */
function Header({ toggleSidebar, isSidebarOpen }) {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <h1 className="text-2xl font-bold text-gray-800 mr-6">FakeStore</h1>
                    <Navigation />
                    <CartIcon />
                </div>
                {/**
         * скрываем бургер меню на малых и средних экранах
         */}
                <div className={`${isSidebarOpen ? 'invisible md:visible' : 'visible'}`}>
                    <BurgerButton onClick={toggleSidebar} isOpen={isSidebarOpen} />

                    <div className="flex justify-end flex-grow pl-4">
                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <span className="text-sm text-gray-700">
                                        Здравствуйте, {user || 'Гость'}
                                    </span>
                                    <Link
                                        to="/logout"
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Выйти
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Войти
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;