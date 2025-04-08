import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from './services/api';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import Filters from './components/Filters';
import SearchInput from './components/SearchInput';
import Sidebar from './components/Sidebar';
import BurgerButton from './components/BurgerButton';

const ITEMS_PER_PAGE = 5;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: products, isLoading, isError } = useQuery({ 
    queryKey: ['products'], 
    queryFn: fetchProducts 
  });

  const { data: categories } = useQuery({ 
    queryKey: ['categories'], 
    queryFn: fetchCategories 
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error fetching data</div>;

  // Фильтрация данных
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = Math.round(product.rating.rate) >= ratingFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">FakeStore</h1>
          <BurgerButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
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
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No products found matching your criteria
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}