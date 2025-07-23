import { Link } from "react-router-dom";

/**
 * Вызывается для отображения карточки товара
 * @param {product} - product object
 * @returns 
 */
export default function ProductCard({ product }) {

  // const isCustom = product.id.startsWith('custom_');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">{product.description}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price}</span>
          <Link
            to={`/product/${product.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}