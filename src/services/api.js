export const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.products; // { products: [...] }
};

export const fetchCategories = async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json(); // 
};

export const fetchProduct = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};