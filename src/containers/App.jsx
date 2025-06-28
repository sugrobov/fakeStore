import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import { fetchProducts, fetchCategories } from '../services/api';

import Filters from '../components/Filters';
import SearchInput from '../components/SearchInput';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import useIsMobile from '../hooks/useIsMobile';


import { ITEMS_PER_PAGE } from '../config';

/**
 * Главный компонент приложения
 *   
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: products, isLoading: productsLoading, isError: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  useEffect(() => {
    setCurrentPage(1); // Сбрасываем страницу при изменении фильтров
  }, [selectedCategory, priceRange, ratingFilter, searchQuery]);

  const isMobile = useIsMobile();

  const toggleSidebar = useCallback(() => {
    if (!isMobile && isSidebarOpen) return;
    setIsSidebarOpen(prev => !prev);
  }, [isMobile, isSidebarOpen]);



  if (productsLoading || categoriesLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (productsError || categoriesError) {
    return <div className="text-center py-8 text-red-500">Error fetching data</div>;
  }
  // Фильтрация данных
  const filteredProducts = (products || []).filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = Math.round(product.rating) >= ratingFilter; // DummyJSON: rating - число
    const matchesSearch = searchQuery === '' ||
      product.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.trim().toLowerCase());

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);


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
            filteredProducts
          }} />

        </main>
      </div>
    </div>
  );
}