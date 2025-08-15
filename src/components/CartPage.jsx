import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { loadCart, removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import OrderModal from "./OrderModal";
import Breadcrumbs from "./Breadcrumbs";

function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [showOrderModal, setShowOrderModal] = useState(false);

      useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
        <div className="max-w-4xl mx-auto p-4">
      <Breadcrumbs currentPage="Корзина" />
      <h1 className="text-2xl font-bold mb-6">Ваша корзина</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Ваша корзина пуста</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Вернуться к покупкам
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cartItems.map(item => (
              <div key={item.id} className="border-b p-4 flex items-center">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-20 h-20 object-contain mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => dispatch(updateQuantity({
                      id: item.id,
                      quantity: parseInt(e.target.value) || 1
                    }))}
                    className="w-16 p-2 border rounded text-center"
                  />
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
            
            <div className="p-4 flex justify-between items-center">
              <div className="text-xl font-bold">
                Итого: ${total.toFixed(2)}
              </div>
              <div className="p-4 flex gap-4">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Очистить корзину
                </button>
                <button
                  onClick={() => setShowOrderModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {showOrderModal && (
        <OrderModal 
          onClose={() => setShowOrderModal(false)} 
          onSuccess={() => {
            dispatch(clearCart());
            setShowOrderModal(false);
          }}
        />
      )}
    </div>
  );
  
}

export default CartPage;