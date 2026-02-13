import React from 'react';
import { useLazyImage, LazyImage } from '../hooks/useLazyImage';

// SVG плейсхолдер как data URL
const createPlaceholderSVG = (text = 'Loading') => 
  `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <circle cx="100" cy="80" r="30" fill="#e2e8f0"/>
      <rect x="50" y="120" width="100" height="10" rx="5" fill="#e2e8f0"/>
      <rect x="70" y="140" width="60" height="8" rx="4" fill="#e2e8f0"/>
      <text x="100" y="180" font-family="Arial" font-size="12" fill="#94a3b8" text-anchor="middle">${text}</text>
    </svg>
  `)}`;

// const defaultPlaceholder = createPlaceholderSVG('Product');

/**
 * Специализированный компонент для изображений продуктов с плейсхолдером
 */
export const LazyProductImage = ({ 
  src, 
  alt, 
  className = '',
  ...props 
}) => {

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={`${className}`}
      {...props}
    />
  );
};

/**
 * Хук для управления загрузкой нескольких изображений продукта
 */
export const useProductImages = (product) => {
  const mainImage = useLazyImage(product?.thumbnail);
  const galleryImages = (product?.images || [])
    .filter(img => img !== product.thumbnail)
    .map(img => useLazyImage(img));

  return {
    mainImage,
    galleryImages,
    allImages: [mainImage, ...galleryImages]
  };
};