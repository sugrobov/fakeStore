import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";

/**
 * Компонент для отображения списка продуктов
 * 
 * @param {Array} paginatedProducts - массив продуктов
 * @param {Number} totalPages - общее количество страниц
 * @param {Number} currentPage - текущая страница
 * @param {Function} setCurrentPage - функция для установки текущей страницы
 * @param {Array} filteredProducts - отфильтрованный массив продуктов
 * @returns {JSX.Element}   Воврящает JSX элемент
 * - с сеткой продуктов
 * - с сообщением о том, что продуктов не найдено
 * - с пагинацией, если есть продукты
 */
function ProductList() {
    const { 
    paginatedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    filteredProducts
  } = useOutletContext();

    return (
        <>
            {
                paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {
                            paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product} />
                            ))
                        }
                    </div>

                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <h3>No products found.</h3>
                    </div>
                )}

            {
                totalPages > 1 && filteredProducts.length > 0 && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage} />
                )
            }


        </>
    )


}

export default ProductList;