import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ITEMS_PER_PAGE } from "../config";

/**
 * Компонент для отображения списка продуктов
 */
function ProductList() {
  // Получаем данные из контекста маршрута (для API-продуктов)
  const {
    paginatedProducts: apiPaginatedProducts,
    totalPages: apiTotalPages,
    currentPage: apiCurrentPage,
    setCurrentPage: setApiCurrentPage,
    filteredProducts: apiFilteredProducts,
    selectedCategory,
    priceRange,
    ratingFilter,
    searchQuery,
  } = useOutletContext();

  /**
   * Пагинация для пользовательских продуктов
   */
  const [currentPageCustom, setCurrentPageCustom] = useState(1);

  // Получаем пользовательские продукты из Redux
  const customProducts = useSelector((state) => state.products.customProducts);

  // Состояние для переключения между API и пользовательскими продуктами
  const [showCustom, setShowCustom] = useState(false);

  // Фильтрация пользовательских продуктов по тем же критериям, что и API
  const filteredCustomProducts = customProducts.filter((product) => {
    // console.log("Продукт:", product.id, product.title); // 

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = Math.round(product.rating) >= ratingFilter;
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      product.description.toLowerCase().includes(
        searchQuery.trim().toLowerCase()
      );

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  // Пагинация для пользовательских продуктов
  const totalPagesCustom = Math.ceil(
    filteredCustomProducts.length / ITEMS_PER_PAGE
  );
  const startIndexCustom = (currentPageCustom - 1) * ITEMS_PER_PAGE;
  const paginatedCustomProducts = filteredCustomProducts.slice(
    startIndexCustom,
    startIndexCustom + ITEMS_PER_PAGE
  );

  const handleEditProduct = (product) => {
    navigate(`/product/edit/${product.id}`);
  }

  return (
    <>
      {/* Переключатель источника данных */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showCustom ? "Показать API-продукты" : "Показать пользовательские"}
        </button>
      </div>

      {/* Отображение продуктов */}
      {showCustom ? (
         paginatedCustomProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedCustomProducts.map((product) => (
              <ProductCard 
              key={product.id} 
              product={product} 
              onEdit={handleEditProduct}
              isCustom={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <h3>Нет пользовательских продуктов</h3>
          </div>
        )
      ) : (
        apiPaginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {apiPaginatedProducts.map((product) => (
              <ProductCard 
              key={product.id} 
              product={product} 
              
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <h3>Продукт не найден.</h3>
          </div>
        )
      )}

      {/* Пагинация в зависимости от выбора */}
      {showCustom ? (
        totalPagesCustom > 1 && paginatedCustomProducts.length > 0 && (
          <Pagination
            totalPages={totalPagesCustom}
            currentPage={currentPageCustom}
            onPageChange={setCurrentPageCustom}
          />
        )
      ) : (
        apiTotalPages > 1 && apiPaginatedProducts.length > 0 && (
          <Pagination
            totalPages={apiTotalPages}
            currentPage={apiCurrentPage}
            onPageChange={setApiCurrentPage}
          />
        )
      )}
    </>
  );
}

export default ProductList;