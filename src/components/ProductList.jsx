import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITEMS_PER_PAGE } from "../config";
import { useDispatch } from "react-redux";
import { removeProductAsync } from "../store/productsSlice";

function ProductList() {
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
    sortOptions,
    onSortChange
  } = useOutletContext();

  const dispatch = useDispatch();
  const [showCustom, setShowCustom] = useState(false);
  const [showPublished, setShowPublished] = useState(false);
  
  const customProducts = useSelector((state) => state.products.customProducts);

  // Фильтрация пользовательских продуктов
  const filteredCustomProducts = useMemo(() => { 
   return customProducts.filter((product) => {
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

    const isPublished = product.published ?? false;
    const matchesPublished = showPublished ? isPublished : !isPublished;
 
    return matchesCategory && matchesPrice && matchesRating && matchesSearch && matchesPublished;
  });
}, [customProducts, selectedCategory, priceRange, ratingFilter, searchQuery, showPublished]);

  // Функция сортировки
  const sortProducts = useCallback((products) => {
    return [...products].sort((a, b) => {
      let valueA, valueB;
      
      switch (sortOptions.field) {
        case 'title':
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case 'price':
          valueA = a.price;
          valueB = b.price;
          break;
        case 'rating':
          valueA = a.rating;
          valueB = b.rating;
          break;
        default:
          return 0;
      }
      
      if (valueA < valueB) {
        return sortOptions.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOptions.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [sortOptions]);

  // Сортировка продуктов
  const sortedApiFilteredProducts = useMemo(() => 
  sortProducts(apiFilteredProducts), [apiFilteredProducts, sortProducts]);

  const sortedCustomFilteredProducts = useMemo(() => 
    sortProducts(filteredCustomProducts), 
  [filteredCustomProducts, sortProducts]);

  /**
   * сброс страницы при изменении фильтров
   */
  useEffect(() => {
    setApiCurrentPage(1);
    setCurrentPageCustom(1);
  }, [selectedCategory, priceRange, ratingFilter, searchQuery, sortOptions]);

  // Пагинация
  const [currentPageCustom, setCurrentPageCustom] = useState(1);

  const totalPagesCustom = useMemo(() => 
    Math.ceil(sortedCustomFilteredProducts.length / ITEMS_PER_PAGE
  ), [sortedCustomFilteredProducts]);

  const paginatedCustomProducts = useMemo(() => {
    const startIndex = (currentPageCustom - 1) * ITEMS_PER_PAGE;
    return sortedCustomFilteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  }, [sortedCustomFilteredProducts, currentPageCustom]);

  const handleEditProduct = (product) => {
    navigate(`/product/edit/${product.id}`);
  }

  const handleDeleteProduct = (id) => {
    dispatch(removeProductAsync(id));
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showCustom ? "Показать API-продукты" : "Показать пользовательские"}
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
      ) : apiPaginatedProducts.length > 0 ? (
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
      )}

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