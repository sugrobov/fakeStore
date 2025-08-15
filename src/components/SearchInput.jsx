import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

/**
 * Функция для поиска товаров
 * @param {value} - значение для поиска
 * @param {onChange} - функция для изменения значения
 * @returns {JSX} компонент для поиска товаров
 */
export default function SearchInput({ value, onChange }) {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedValue = useDebounce(displayValue, 500);

  useEffect(() => {
    onChange(debouncedValue.trim())
  }, [debouncedValue, onChange]);

  const handleClear = () => {
    setDisplayValue('');
    onChange('');
  }

  const handleChange = (e) => {
    setDisplayValue(e.target.value);
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full p-2 pl-10 border rounded"
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {displayValue && (<button
        onClick={handleClear}
        className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
        aria-label="Clear search"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>)}
    </div>
  )
}