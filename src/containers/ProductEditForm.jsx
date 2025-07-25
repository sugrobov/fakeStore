import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProductAsync } from '../store/productsSlice';
import { fetchCategories } from '../services/api';

function ProductEditForm() {
    const { id } = useParams();
    const productId = id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector(state =>
        state.products.customProducts.find(p => p.id === productId)
    );

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        published: false,
        category: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    // загрузка категорий
    useEffect(() => {
        const loadCategories = async () => {
            setLoadingCategories(true);
            try {
                const categoriesData = await fetchCategories();
                // Работаем с категориями как с массивом строк
                setCategories(categoriesData);
            } catch (error) {
                console.error('Ошибка загрузки категорий:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price.toString(),
                description: product.description,
                published: product.published || false,
                category: product.category
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Название обязательно';
        if (!formData.price) {
            newErrors.price = 'Цена обязательна';
        } else if (isNaN(formData.price)) {
            newErrors.price = 'Цена должна быть числом';
        } else if (parseFloat(formData.price) <= 0) {
            newErrors.price = 'Цена должна быть положительной';
        }
        if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
        if (!formData.category) newErrors.category = 'Категория обязательна';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const updatedProduct = {
                id: productId,
                ...formData,
                price: parseFloat(formData.price),
                thumbnail: product.thumbnail || `https://placehold.co/200x300/666666/FFFFFF?text=${formData.title}`,
                rating: product.rating || 0
            };

            await dispatch(updateProductAsync(updatedProduct)).unwrap();
            navigate('/products', { replace: true });
        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!product) return <div>Продукт не найден</div>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Редактировать продукт</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Поле выбора категории */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Категория *
                    </label>
                    {loadingCategories ? (
                        <p>Загрузка категорий...</p>
                    ) : (
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((category, index) => {
                                // Определяем название категории в зависимости от типа
                                const categoryName =
                                    typeof category === 'string'
                                        ? category.charAt(0).toUpperCase() + category.slice(1)
                                        : category.name || String(category);

                                // Определяем значение категории
                                const categoryValue =
                                    typeof category === 'string'
                                        ? category
                                        : category.slug || String(category);

                                return (
                                    <option key={index} value={categoryValue}>
                                        {categoryName}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
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

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
                    >
                        Назад
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductEditForm;