import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../store/authSlice";

import localforage from "localforage";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(true); // Добавляем состояние подтверждения

  const handleLogout = () => {
    localforage.removeItem('auth');
    dispatch(logout());
    navigate('/');
  };

    const handleCancel = () => {
    navigate(-1); // назад
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {showConfirmation ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Выход из системы</h2>
          <p className="mb-6">Вы уверены, что хотите выйти?</p>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Выйти
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Logout;