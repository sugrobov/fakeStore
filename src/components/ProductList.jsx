import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ITEMS_PER_PAGE } from "../config";
import { useDispatch } from "react-redux";
import { removeProductAsync } from "../store/productsSlice";

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

  const dispatch = useDispatch();

  /**
   * Пагинация для пользовательских продуктов
   */
  const [currentPageCustom, setCurrentPageCustom] = useState(1);

  // Получаем пользовательские продукты из Redux
  const customProducts = useSelector((state) => state.products.customProducts);

  // Состояние для переключения между API и пользовательскими продуктами
  const [showCustom, setShowCustom] = useState(false);

  const [showPublished, setShowPublished] = useState(false);

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

      const matchesPublished = !showPublished || product.published;
 
    return matchesCategory && matchesPrice && matchesRating && matchesSearch && matchesPublished;
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

    const handleDeleteProduct = (id) => {
    dispatch(
      removeProductAsync(id)
    );
  }

  return (
    <>
      {/* Переключатель источника данных */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showCustom ? "Показать API-продукты" : "Показать пользовательские"}
       {/** чек для фильтрации опубликованных */}
        </button>
                {showCustom && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPublished"
              checked={showPublished}
              onChange={() => setShowPublished(!showPublished)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="showPublished" className="ml-2 text-gray-700">
              Только опубликованные
            </label>
          </div>
        )}
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
              onDelete={handleDeleteProduct}
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