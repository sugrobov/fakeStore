import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../services/api";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useSelector } from "react-redux";

/**
 * Контейнер для отображения детальной информации о продукте
 * @returns {JSX.Element} 
 */
function ProductDetail() {
  const { id } = useParams();
  const customProducts = useSelector((state) => state.products.customProducts);
  const isCustomProduct = id?.startsWith("custom_");

  /**
   * Запрос для API-продуктов
   */
  const { data: apiProduct, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !isCustomProduct, // запрос только для API продуктов
  });

  // Поиск пользовательского продукта в Redux
  const customProduct = isCustomProduct
    ? customProducts.find((product) => product.id === id)
    : null;

  // Определение текущего продукта (API или пользовательский)
  const currentProduct = isCustomProduct ? customProduct : apiProduct;

  if (isLoading) {
    if (isCustomProduct) {
      return <div className="text-center py-8">Loading custom product...</div>;
    } else {
      return <div className="text-center py-8">Loading API product...</div>;
    }
  }

  // если пользовательский продукт не найден
  if (isError || !currentProduct) {
    return <div className="text-center py-8 text-red-500">Product not found</div>;
  }

  // console.log('Product ID:', id);
  // console.log('Is custom:', isCustomProduct);
  // console.log('Custom products:', customProducts);
  // console.log('Found product:', customProduct);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 text-sm text-gray-600">
        <Breadcrumbs currentPage={currentProduct.title} />
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img
              src={currentProduct.thumbnail}
              alt={currentProduct.title}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-4">{currentProduct.title}</h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(currentProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600 ml-2">Rating: {currentProduct.rating}/5</span>
            </div>
            <p className="text-gray-700 mb-4">{currentProduct.description}</p>
            <div className="text-xl font-bold mb-4">${currentProduct.price}</div>
            <div className="mb-4">
              <span className="font-semibold">Brand:</span> {currentProduct.brand}
            </div>
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;