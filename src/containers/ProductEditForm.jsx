import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProductAsync } from '../store/productsSlice';
function ProductEditForm() {
    const { id } = useParams();
    const productId = id;
    // console.log(productId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector(state =>
        state.products.customProducts.find(p => p.id === productId)
    );

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        published: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price.toString(),
                description: product.description,
                published: product.published || false
            });
        }
    }, [product]);

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
        const updatedProduct = {
            id: productId,
            ...formData,
            price: parseFloat(formData.price),
            // Добавляем обязательные поля, которые могут отсутствовать
            thumbnail: product.thumbnail || `https://placehold.co/200x300/666666/FFFFFF?text=${formData.title}`,
            rating: product.rating || 0,
            category: product.category || 'other'
        };
        
        await dispatch(updateProductAsync(updatedProduct)).unwrap();
        
        // Явный переход с replace, чтобы избежать проблем с историей
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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
            </form>
        </div>
    );
}

export default ProductEditForm;