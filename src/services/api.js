export const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json()
  }
  
  export const fetchCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json()
  }