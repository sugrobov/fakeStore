
export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  ratingFilter,
  onRatingChange
}) {
  const handleRatingClick = (rating) => {
    onRatingChange(ratingFilter === rating ? 0 : rating);
  };

  const handleClearCategory = () => {
    onCategoryChange('all');
  };

  /**
   * автоматическая корректировка цен, если пользователь пытается установить min > max или max < min
   * @param {*} index === 0 - минимальное значение, index === 1 - максимальное значение
   * @param {*} value  текущее значение цены
   * 
   */
  const handlePriceChange = (index, value) => {
    const newValue = parseInt(value);
      
      if (index === 0) { // Изменение минимального значения
        if (newValue > priceRange[1]) {
          onPriceChange([newValue, newValue]);
        } else {
          onPriceChange([newValue, priceRange[1]]);
        }
      } else { // Изменение максимального значения
        if (newValue < priceRange[0]) {
          onPriceChange([newValue, newValue]);
        } else {
          onPriceChange([priceRange[0], newValue]);
        }
      }

  };

  return (
    <div className="space-y-6">
      {/* Фильтр по категориям */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">Categories</h3>
          {selectedCategory !== 'all' && (
            <button
              onClick={handleClearCategory}
              className="text-sm px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <option value="all">All Categories</option>
          {categories?.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Фильтр по цене */}
      <div className="space-y-3">
        <div className="flex items-baseline">
          <h3 className="font-medium text-gray-700 whitespace-nowrap">Price Range:</h3>
          <span className="ml-2 font-semibold text-blue-600 whitespace-nowrap">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Min</span>
              <span className="font-medium">${priceRange[0]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Max</span>
              <span className="font-medium">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-400 pt-1">
          <span>$0</span>
          <span>$500</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Фильтр по рейтингу */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-700">
            Minimum Rating
            {ratingFilter > 0 && (
              <span className="ml-2 text-yellow-500">
                ({ratingFilter}+)
              </span>
            )}
          </h3>
          {ratingFilter > 0 && (
            <button
              onClick={() => onRatingChange(0)}
              className="text-sm px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingClick(rating)}
              className={`px-3 py-2 rounded-lg flex items-center justify-center ${ratingFilter === rating
                ? 'bg-yellow-100 border-2 border-yellow-400 shadow-sm'
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                } transition-all duration-200 min-w-[3rem]`}
              aria-label={`Rating ${rating}`}
            >
              <div className="flex items-center">
                <svg
                  className={`w-5 h-5 mr-1 ${ratingFilter >= rating ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className={`font-medium ${ratingFilter === rating ? 'text-yellow-700' : 'text-gray-700'
                  }`}>{rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}