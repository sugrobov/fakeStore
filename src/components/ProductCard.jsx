import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import PublicationMarker from "./ui/PublicationMarker";
import Grade from "./ui/Grade";
import { addToCart } from "../store/cartSlice";

/**
 * Вызывается для отображения карточки товара
 * @param {product} - product object
 * @param {isCustom} - boolean - пользовательский продукт
 * @param {onDelete} - callback для удаления продукта
 * @returns { jsx }
 */
export default function ProductCard({ product, isCustom = false, onDelete }) {

  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail
      })
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden 
    hover:shadow-lg transition-shadow duration-300 h-full flex flex-col relative">
      {/* статус опубликованности (только для пользовательских продуктов) */}
      {isCustom && (
        <PublicationMarker
          product={product}
        />

      )}

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
        <Grade product={product} />
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price}</span>
        </div>
        <div className="mt-4 w-full">
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors w-10 h-10"
              title="Просмотр"
            >
              {/* просмотр */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>

            {isCustom && (
              <>
                <Link
                  to={`/product/edit/${product.id}`}
                  className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition-colors w-10 h-10"
                  title="Редактировать"
                >
                  {/* редактирование */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors w-10 h-10"
                  title="Удалить"
                >
                  {/* удаление */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
            <button
              onClick={handleAddToCart}
              className="px-2 md:px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 whitespace-nowrap"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
      {isCustom && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onConfirm={() => {
            onDelete(product.id);
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
          title="Удаление товара"
          message={`Вы уверены, что хотите удалить товар "${product.title}"?`}
        />
      )}
    </div>
  );
}