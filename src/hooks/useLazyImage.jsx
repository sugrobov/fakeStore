import { useState, useEffect, useRef } from 'react';

/**
 * функция для ленивой загрузки изображения
 * @param {string} src - путь к изображению
 * @param {string} placeholder - путь к плейсхолдеру
 * @returns {object} объект с данными о состоянии изображения и ref для изображения
 */
export function useLazyImage({ src, placeholder = null, options = {} }) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const loadImage = () => {
      setIsLoading(true);
      setError(null);

      const img = new Image();
      img.src = src;

      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };

      img.onerror = () => {
        setError(`Failed to load image: ${src}`);
        setIsLoading(false);
        // Fallback на плейсхолдер если основное изображение не загрузилось
        if (placeholder) {
          setImageSrc(placeholder);
        }
      };
    };

    // Если Intersection Observer поддерживается
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      });

      observerRef.current = observer;

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      // Fallback для браузеров без Intersection Observer
      loadImage();
    }
  }, [src, placeholder, options]);

  return {
    src: imageSrc,
    isLoading,
    error,
    ref: imgRef
  };
}

/**
 * компонент для ленивой загрузки изображения
 * @returns {JSX.Element}
 */
export const LazyImage = ({
  src,
  alt,
  className = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
          setIsLoading(false);
          setHasError(true);
        };
        observer.disconnect();
      }
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  if (!src || hasError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center rounded`}>
        <span className="text-gray-400 text-sm">No Image</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${className} ${isLoading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
      loading="lazy"
      {...props}
    />
  );
};