import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { getOptimizedImage, generateSrcSet, getDefaultSizes } from '../utils/imageManifest';

/**
 * OptimizedImage - Enhanced lazy loading image component with:
 * - WebP/AVIF format support via <picture> element
 * - Responsive srcset for different screen sizes
 * - Blur-up placeholder effect
 * - Intersection Observer for lazy loading
 * 
 * @param {string} src - Original image source URL (e.g., '/images/cardamom-pods.png')
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {string} placeholderColor - Background color while loading (default: natural green)
 * @param {string} blurDataUrl - Override the auto-generated blur placeholder
 * @param {string} aspectRatio - Optional aspect ratio (e.g., "16/9", "4/3", "1/1")
 * @param {string} sizes - Responsive sizes attribute (default: auto-generated)
 * @param {boolean} priority - If true, loads immediately without lazy loading (for above-fold images)
 * @param {string} objectFit - CSS object-fit value (default: 'cover')
 * @param {function} onLoad - Callback when image loads
 */
const LazyImage = ({
    src,
    alt,
    className = '',
    placeholderColor = '#2D4A3E',
    blurDataUrl: customBlurDataUrl,
    aspectRatio,
    sizes,
    priority = false,
    objectFit = 'cover',
    onLoad: externalOnLoad,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);
    const wrapperRef = useRef(null);

    // Get optimized image data from manifest
    const imageData = useMemo(() => getOptimizedImage(src), [src]);
    
    // Use custom blur URL or fall back to manifest blur URL
    const blurDataUrl = customBlurDataUrl || imageData?.blurDataUrl;
    
    // Generate srcsets for modern formats
    const avifSrcSet = useMemo(() => 
        imageData ? generateSrcSet(imageData, 'avif') : null, 
        [imageData]
    );
    const webpSrcSet = useMemo(() => 
        imageData ? generateSrcSet(imageData, 'webp') : null, 
        [imageData]
    );
    
    // Determine the sizes attribute
    const sizesAttr = sizes || getDefaultSizes();
    
    // Get the best available source URLs
    const avifSrc = imageData?.formats?.avif;
    const webpSrc = imageData?.formats?.webp;
    const fallbackSrc = imageData?.formats?.png || src;

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px', threshold: 0.01 }
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    // Handle successful load
    const handleLoad = useCallback((e) => {
        setIsLoaded(true);
        externalOnLoad?.(e);
    }, [externalOnLoad]);

    // Handle error - fall back to original source
    const handleError = useCallback(() => {
        setHasError(true);
    }, []);

    // Generate placeholder styles
    const placeholderStyle = blurDataUrl
        ? { 
            backgroundImage: `url(${blurDataUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
        }
        : {
            background: `linear-gradient(135deg, ${placeholderColor} 0%, ${adjustColor(placeholderColor, -15)} 100%)`
        };

    // For priority images, we use native loading="eager" and fetchpriority="high"
    const loadingAttr = priority ? 'eager' : 'lazy';
    const fetchPriorityAttr = priority ? 'high' : 'auto';

    return (
        <div
            ref={wrapperRef}
            className={`lazy-image-wrapper ${className} ${isLoaded ? 'is-loaded' : ''} ${hasError ? 'has-error' : ''}`}
            style={{
                backgroundColor: placeholderColor,
                overflow: 'hidden',
                position: 'relative',
                ...(aspectRatio && { aspectRatio })
            }}
        >
            {/* Blur placeholder layer */}
            <div 
                className={`lazy-image-placeholder ${isLoaded ? 'fade-out' : ''}`}
                style={placeholderStyle}
                aria-hidden="true"
            />
            
            {/* Skeleton shimmer animation */}
            {!isLoaded && !hasError && (
                <div className="lazy-image-skeleton" aria-hidden="true">
                    <div className="skeleton-shimmer" />
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="lazy-image-error" role="alert">
                    <span className="error-icon">🖼️</span>
                    <span className="error-text">Failed to load</span>
                </div>
            )}

            {/* Optimized picture element with modern formats */}
            {isInView && !hasError && (
                <picture>
                    {/* AVIF source - best compression, newest format */}
                    {avifSrcSet && (
                        <source
                            type="image/avif"
                            srcSet={avifSrcSet}
                            sizes={sizesAttr}
                        />
                    )}
                    {avifSrc && !avifSrcSet && (
                        <source
                            type="image/avif"
                            srcSet={avifSrc}
                        />
                    )}
                    
                    {/* WebP source - good compression, wide support */}
                    {webpSrcSet && (
                        <source
                            type="image/webp"
                            srcSet={webpSrcSet}
                            sizes={sizesAttr}
                        />
                    )}
                    {webpSrc && !webpSrcSet && (
                        <source
                            type="image/webp"
                            srcSet={webpSrc}
                        />
                    )}
                    
                    {/* Fallback img element - PNG/JPG for older browsers */}
                    <img
                        ref={imgRef}
                        src={fallbackSrc}
                        alt={alt}
                        onLoad={handleLoad}
                        onError={handleError}
                        loading={loadingAttr}
                        fetchpriority={fetchPriorityAttr}
                        decoding="async"
                        className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
                        style={{ objectFit }}
                        {...props}
                    />
                </picture>
            )}
        </div>
    );
};

/**
 * SimpleOptimizedImage - A simpler version for inline images that don't need
 * the full lazy loading wrapper (e.g., small icons, thumbnails)
 */
export const SimpleOptimizedImage = ({ 
    src, 
    alt, 
    className = '',
    sizes,
    ...props 
}) => {
    const imageData = useMemo(() => getOptimizedImage(src), [src]);
    
    const avifSrcSet = useMemo(() => 
        imageData ? generateSrcSet(imageData, 'avif') : null, 
        [imageData]
    );
    const webpSrcSet = useMemo(() => 
        imageData ? generateSrcSet(imageData, 'webp') : null, 
        [imageData]
    );
    
    const sizesAttr = sizes || getDefaultSizes();
    const avifSrc = imageData?.formats?.avif;
    const webpSrc = imageData?.formats?.webp;
    const fallbackSrc = imageData?.formats?.png || src;

    return (
        <picture>
            {avifSrcSet && (
                <source type="image/avif" srcSet={avifSrcSet} sizes={sizesAttr} />
            )}
            {avifSrc && !avifSrcSet && (
                <source type="image/avif" srcSet={avifSrc} />
            )}
            {webpSrcSet && (
                <source type="image/webp" srcSet={webpSrcSet} sizes={sizesAttr} />
            )}
            {webpSrc && !webpSrcSet && (
                <source type="image/webp" srcSet={webpSrc} />
            )}
            <img
                src={fallbackSrc}
                alt={alt}
                className={className}
                loading="lazy"
                decoding="async"
                {...props}
            />
        </picture>
    );
};

/**
 * BackgroundImage - Component for optimized background images
 * Uses inline styles with WebP/AVIF detection
 */
export const BackgroundImage = ({
    src,
    children,
    className = '',
    blurDataUrl: customBlurDataUrl,
    style = {},
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageData = useMemo(() => getOptimizedImage(src), [src]);
    const blurDataUrl = customBlurDataUrl || imageData?.blurDataUrl;
    
    // Prefer WebP, fall back to original
    const optimizedSrc = imageData?.formats?.webp || src;

    useEffect(() => {
        const img = new Image();
        img.onload = () => setIsLoaded(true);
        img.src = optimizedSrc;
    }, [optimizedSrc]);

    return (
        <div
            className={`background-image-wrapper ${className} ${isLoaded ? 'loaded' : ''}`}
            style={{
                backgroundImage: isLoaded 
                    ? `url(${optimizedSrc})` 
                    : blurDataUrl 
                        ? `url(${blurDataUrl})` 
                        : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'filter 0.3s ease-out',
                filter: isLoaded ? 'none' : 'blur(20px)',
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

// Helper function to darken/lighten a hex color
function adjustColor(color, percent) {
    // Handle rgb/rgba colors
    if (color.startsWith('rgb')) {
        return color;
    }
    
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

export default LazyImage;
