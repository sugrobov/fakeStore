import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        time: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleValidate = () => {
        const newErrors = {};
        if (formData.name.trim() === '') newErrors.name = 'Введите имя';
        if (formData.phone.trim() === '') newErrors.phone = 'Введите номер телефона';
        if (formData.address.trim() === '') newErrors.address = 'Введите адрес';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidate()) {
            setIsSubmitting(true);
            // Отправка данных на сервер
            setTimeout(() => {
                setIsSubmitting(false);
                onSuccess();
                onClose();
            }, 1000);

        }

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Оформление заказа</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Имя *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Адрес доставки *
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Телефон *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Время доставки *
                            </label>
                            <input
                                type="datetime-local"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                Отмена
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );

    }
}
    export default OrderModal;