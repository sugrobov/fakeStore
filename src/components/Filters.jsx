export default function Filters({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    ratingFilter,
    onRatingChange
  }) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
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
  
        <div>
  <h3 className="font-medium mb-2">Minimum Rating</h3>
  <div className="flex space-x-2">
    {[1, 2, 3, 4, 5].map(rating => (
      <button
        key={rating}
        onClick={() => onRatingChange(ratingFilter === rating ? 0 : rating)}
        className={`p-2 rounded-full ${
          ratingFilter === rating ? 'bg-yellow-400' : 'bg-gray-200'
        }`}
      >
        {rating}
      </button>
    ))}
  </div>
</div>
      </div>
    )
  }