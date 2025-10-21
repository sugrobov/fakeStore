import { mockProducts, mockCategories } from "../config/data";

// Флажок для переключения между мок-данными и реальным API
const USE_MOCK_DATA = true;

// Имитация сетевой задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Универсальная функция-обертка для имитации API
const mockApiCall = async (data, errorRate = 0) => {
  await delay(200 + Math.random() * 300); // Случайная задержка 200-500ms
  
  if (Math.random() < errorRate) {
    throw new Error('Simulated API error');
  }
  
  return JSON.parse(JSON.stringify(data)); // Глубокое копирование
};

export const fetchProducts = async (params = {}) => {
  if (!USE_MOCK_DATA) {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.warn('Real API failed, falling back to mock data');
      // Fallback на мок-данные при ошибке
      return mockApiCall(mockProducts);
    }
  }

  // Мок-данные с фильтрацией
  let filteredProducts = [...mockProducts];
  
  // Фильтрация по категории
  if (params.category && params.category !== 'all') {
    filteredProducts = filteredProducts.filter(
      product => product.category === params.category
    );
  }
  
  // Поиск
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
  }
  
  // Фильтрация по цене
  if (params.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= params.minPrice
    );
  }
  
  if (params.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.price <= params.maxPrice
    );
  }
  
  // Фильтрация по рейтингу
  if (params.minRating !== undefined) {
    filteredProducts = filteredProducts.filter(
      product => product.rating >= params.minRating
    );
  }

  return mockApiCall(filteredProducts);
};

export const fetchCategories = async () => {
  if (!USE_MOCK_DATA) {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (error) {
      console.warn('Real API failed, falling back to mock data');
      return mockApiCall(mockCategories);
    }
  }

  return mockApiCall(mockCategories);
};

export const fetchProduct = async (id) => {
  if (!USE_MOCK_DATA) {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (error) {
      console.warn('Real API failed, falling back to mock data');
      // Fallback на поиск в мок-данных
      const product = mockProducts.find(p => p.id === parseInt(id));
      if (!product) throw new Error('Product not found');
      return mockApiCall(product);
    }
  }

  const product = mockProducts.find(p => p.id === parseInt(id));
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  
  return mockApiCall(product);
};

export const fetchProductsByCategory = async (category) => {
  const products = mockProducts.filter(p => p.category === category);
  return mockApiCall(products);
};

// Дополнительные API методы
export const api = {
  fetchProducts,
  fetchCategories, 
  fetchProduct,
  fetchProductsByCategory,
  
  // Для отладки - получить все мок-данные
  getMockData: () => ({
    products: mockProducts,
    categories: mockCategories
  })
};