export default function Filters({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    ratingFilter,
    onRatingChange
  }) {
    // рейтинг
    const handleRatingClick = (rating) => {
      // сбрасываем фильтр
      onRatingChange(ratingFilter === rating ? 0 : rating);
    };

    const handleClearCategory = () => {
        onCategoryChange('all')
      }
  
    return (
      <div className="space-y-6">
        {/* Фильтр по категориям */}
        <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium mb-2">Categories</h3>
          {selectedCategory !== 'all' && (
            <button
              onClick={handleClearCategory}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Clear
            </button>
          )}
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2 border rounded"
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
        <div>
          <h3 className="font-medium mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</h3>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
  
        {/* Фильтр по рейтингу */}
        <div>
          <h3 className="font-medium mb-2">
            Minimum Rating
            {ratingFilter > 0 && (
              <span className="ml-2 text-yellow-500">
                ({ratingFilter}+)
              </span>
            )}
          </h3>
          
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingClick(rating)}
                className={`p-1 rounded-full flex items-center ${
                  ratingFilter === rating 
                    ? 'bg-yellow-100 border-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200'
                } border transition-colors`}
                aria-label={`Rating ${rating}`}
              >
                {/* Иконка звезды */}
                <svg 
                  className={`w-4 h-4 mr-1 ${
                    ratingFilter >= rating ? 'text-yellow-400' : 'text-gray-400'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {rating}
              </button>
            ))}
          </div>
  
          {/* Кнопка сброса рейтинга  */}
          {ratingFilter > 0 && (
            <button
              onClick={() => onRatingChange(0)}
              className="mt-2 text-sm text-blue-500 hover:text-blue-700 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear rating
            </button>
          )}
        </div>
      </div>
    );
  }