import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addProductAsync } from "../store/productsSlice";
import { fetchCategories } from "../services/api";
import { nanoid } from "@reduxjs/toolkit";

/**
 * 
 * @returns {JSX.Element} - компонент добавления продукта
 *
 */
function ProductAddForm() {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);   // категории

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        published: false,
        thumbnail: '',
        rating: '',
        category: '',
    });

    /**
     * useEffect для загрузки категорий
     */
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData.sort());      // сортировка
            } catch (error) {
                console.error("Ошибка загрузки категорий:", error);
            }
        }
        loadCategories();

    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.price) { newErrors.price = 'Price is required' }
        else if (formData.price <= 0 || isNaN(formData.price)) {
            newErrors.price = 'Price must be a positive number'
        }

        if (!formData.description.trim()) newErrors.description = 'Description is required';

        if (formData.rating === '') {
            newErrors.rating = 'Rating is required';

        } else if (isNaN(formData.rating) || formData.rating < 0) {
            newErrors.rating = 'Rating must be a number between 0 and 5';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const productId = `custom_${nanoid()}`;   // id
        const thumbnail = `https://placehold.co/200x300/666666/FFFFFF?text=${formData.title}`;
        // thumbnail

        try {
            await dispatch(
                addProductAsync({
                    ...formData,
                    id: productId,
                    thumbnail,
                    price: Number(formData.price),
                    category: formData.category,
                    rating: Number(formData.rating) || 0,
                })
            ).unwrap(); // unwrap the promise

            navigate('/');
        } catch (error) {
            console.error("Ошибка сохранения:", error);
        }
    };

    /**
     * Функция отмены
     */
    const handleCancel = () => {
        navigate(-1); // Возврат на предыдущую страницу
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Добавить продукт</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Категория</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        {Array.isArray(categories) && categories.map((category, index) => (
                            <option key={index} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Название *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Цена *</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Описание *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Опубликован</label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Рейтинг *</label>
                    <input
                        type="number"
                        name="rating"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                </div>

                <div className="flex gap-3 pt-2"> {/* Добавлен контейнер для кнопок */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );

}

export default ProductAddForm;