import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeProducts } from '../store/productsSlice';
import { initializeAuth } from '../store/authSlice';
import { initializeCart } from '../store/cartSlice';

import { fetchProducts, fetchCategories } from '../services/api';

import Filters from '../components/Filters';
import SearchInput from '../components/SearchInput';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import useIsMobile from '../hooks/useIsMobile';
import { ITEMS_PER_PAGE } from '../config'; 
import localforage from 'localforage';

export default function App() {
  /**
   * Состояние фильтров и пагинации:
   * - currentPage: текущая страница
   * - selectedCategory: выбранная категория
   * - priceRange: диапазон цен
   * - ratingFilter: фильтр по рейтингу
   * - searchQuery: поисковая строка
   * - isSidebarOpen: состояние открытия/закрытия сайдбара
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * Состояние сортировки
   */
  const [sortOptions, setSortOptions] = useState({
        field: 'title',
        direction: 'asc'
  });

  /**
   * Состояние сортировки - загрузка из localforage
   */
  useEffect(() => {
    const loadSortOptions = async () => {
      const savedSort = await localforage.getItem('sortOptions');
      if (savedSort) {
        try {
          setSortOptions(JSON.parse(savedSort));
        } catch (error) {
          console.error('Failed to parse sort options:', error);
        }
      }
    }
    loadSortOptions()
  }, []);

  /** 
   * Функция изменения сортировка
   */
  const handleSortChange = useCallback((field, direction) => {
    setSortOptions({
      field,
      direction
    });

  }, []);

  const { data: products, isLoading: productsLoading, isError: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const customProducts = useSelector(state => state.products.customProducts);

  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ['categories', products, customProducts],
    queryFn: () => fetchCategories(products, customProducts),
    enabled: !!products
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeProducts());
    dispatch(initializeCart())
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1); // Сбрасываем страницу при изменении фильтров
  }, [selectedCategory, priceRange, ratingFilter, searchQuery, sortOptions]);

  /**
   * Инициализация состояния авторизации из localforage
   */
  useEffect(() => {
    localforage.getItem('auth').then((savedAuth) => {
      if (savedAuth) {
        dispatch(initializeAuth({
          isAuthenticated: savedAuth.isAuthenticated,
          user: savedAuth.user,
          token: savedAuth.token
        }));
      }
    });
  }, [dispatch]);

  /**
   *   Инициализация состояния сортировки - удален
   */
  // useEffect(() => {
  //   localforage.getItem('sortOptions').then((savedSort) => {
  //     if (savedSort) {
  //       setSortOptions(JSON.parse(savedSort));
  //     }
  //   }, []);

  // }, [sortOptions]);

  /**
   * Сохранение состояния сортировки в localforage
   */
  useEffect(() => {
    localforage.setItem('sortOptions', JSON.stringify(sortOptions));
  }, [sortOptions]);

  // Фильтрация данных; оптимизация
   const filteredProducts = useMemo(() => {
    return (products || []).filter(product => {
      const matchesCategory = selectedCategory === 'all' ||
        (product.category && product.category.toLowerCase()) === (selectedCategory && selectedCategory.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = Math.round(product.rating) >= ratingFilter;
      const matchesSearch = searchQuery === '' ||
        product.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.trim().toLowerCase());

      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });
  }, [products, selectedCategory, priceRange, ratingFilter, searchQuery]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sortOptions]);

   const isMobile = useIsMobile();

  const toggleSidebar = useCallback(() => {
    if (!isMobile && isSidebarOpen) return;
    setIsSidebarOpen(prev => !prev);
  }, [isMobile, isSidebarOpen]);

  // Пагинация
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  if (productsLoading || categoriesLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (productsError || categoriesError) {
    return <div className="text-center py-8 text-red-500">Error fetching data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      <div className="mx-auto px-4 py-8 flex flex-col md:flex-row max-w-7xl">
        {/* Sidebar для фильтров (скрывается на мобильных) */}
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
          <div className="space-y-6">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />

            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              ratingFilter={ratingFilter}
              onRatingChange={setRatingFilter}
              onSortChange={handleSortChange}
              sortOptions={sortOptions}
            />
          </div>
        </Sidebar>

        {/* Основной контент */}
        <main className="flex-1 md:ml-6">
          <Outlet context={{
            paginatedProducts,
            totalPages,
            currentPage,
            setCurrentPage,
            filteredProducts: sortedProducts,
            selectedCategory,
            priceRange,
            ratingFilter,
            searchQuery,
            sortOptions,
            onSortChange: handleSortChange
          }} />

        </main>
      </div>
    </div>
  );
}