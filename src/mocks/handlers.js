import { http, HttpResponse } from 'msw';
import { mockProducts, mockCategories } from '../config/data';

export const handlers = [
  // GET /products
  http.get('https://dummyjson.com/products', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const search = url.searchParams.get('q') || '';
    
    let filteredProducts = mockProducts;
    
    // Поиск по названию или описанию
    if (search) {
      filteredProducts = mockProducts.filter(product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);
    
    return HttpResponse.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      skip,
      limit
    });
  }),

  // GET /products/categories
  http.get('https://dummyjson.com/products/categories', () => {
    return HttpResponse.json(mockCategories);
  }),

  // GET /products/:id
  http.get('https://dummyjson.com/products/:id', ({ params }) => {
    const { id } = params;
    const product = mockProducts.find(p => p.id === parseInt(id));
    
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(product);
  }),

  // GET /products/category/:category
  http.get('https://dummyjson.com/products/category/:category', ({ params }) => {
    const { category } = params;
    const categoryProducts = mockProducts.filter(p => p.category === category);
    
    return HttpResponse.json({
      products: categoryProducts,
      total: categoryProducts.length
    });
  })
];