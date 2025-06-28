import Navigation from "./Navigation";
import BurgerButton from "./BurgerButton";

/**
 * 
 * @param {toggleSidebar} - функция для открытия/закрытия бургер меню
 * @param {isSidebarOpen} - состояние бургер меню
 * @returns 
 */
function Header({ toggleSidebar, isSidebarOpen }) {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
                <div className="flex items-center space-x-8">
                    <h1 className="text-2xl font-bold text-gray-800">FakeStore</h1>
                    <Navigation />
                </div>
                <BurgerButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
        </header>
    )
}

export default Header;