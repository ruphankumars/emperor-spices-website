import React, { useMemo } from 'react';
import { getOptimizedImage, generateSrcSet, getDefaultSizes } from '../utils/imageManifest';

/**
 * OptimizedImg - Drop-in replacement for <img> tags with WebP/AVIF support
 * 
 * This component automatically:
 * - Serves AVIF to browsers that support it (best compression)
 * - Falls back to WebP for good browser support
 * - Uses original PNG/JPG as final fallback
 * - Adds responsive srcset for different screen sizes
 * 
 * Usage:
 *   Before: <img src="/images/cardamom-pods.png" alt="Cardamom" />
 *   After:  <OptimizedImg src="/images/cardamom-pods.png" alt="Cardamom" />
 * 
 * @param {string} src - Original image path (e.g., '/images/cardamom-pods.png')
 * @param {string} alt - Alt text for accessibility (required)
 * @param {string} className - CSS classes
 * @param {string} sizes - Responsive sizes attribute (optional, auto-generated if not provided)
 * @param {boolean} priority - If true, uses eager loading and high fetch priority
 * @param {object} style - Inline styles
 * @param {string} loading - Native lazy loading ('lazy' | 'eager'), defaults to 'lazy'
 */
const OptimizedImg = ({
    src,
    alt,
    className = '',
    sizes,
    priority = false,
    style,
    loading,
    ...props
}) => {
    // Get optimized image data from manifest
    const imageData = useMemo(() => getOptimizedImage(src), [src]);
    
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
    
    // Get source URLs
    const avifSrc = imageData?.formats?.avif;
    const webpSrc = imageData?.formats?.webp;
    const fallbackSrc = imageData?.formats?.png || src;

    // Loading attributes
    const loadingAttr = loading || (priority ? 'eager' : 'lazy');
    const fetchPriorityAttr = priority ? 'high' : undefined;

    // If no optimized versions exist, just render a regular img
    if (!imageData) {
        return (
            <img
                src={src}
                alt={alt}
                className={className}
                style={style}
                loading={loadingAttr}
                decoding="async"
                {...props}
            />
        );
    }

    return (
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
            
            {/* Fallback img element */}
            <img
                src={fallbackSrc}
                alt={alt}
                className={className}
                style={style}
                loading={loadingAttr}
                fetchPriority={fetchPriorityAttr}
                decoding="async"
                {...props}
            />
        </picture>
    );
};

/**
 * HeroImage - Optimized image specifically for hero sections
 * Pre-loaded with high priority and blur placeholder
 */
export const HeroImage = ({
    src,
    alt,
    className = '',
    blurPlaceholder = true,
    ...props
}) => {
    const imageData = useMemo(() => getOptimizedImage(src), [src]);
    const blurDataUrl = imageData?.blurDataUrl;
    
    return (
        <div className={`hero-image-wrapper ${className}`} style={{ position: 'relative' }}>
            {/* Blur placeholder */}
            {blurPlaceholder && blurDataUrl && (
                <div 
                    className="hero-image-blur"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${blurDataUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)',
                        zIndex: 1
                    }}
                    aria-hidden="true"
                />
            )}
            <OptimizedImg
                src={src}
                alt={alt}
                priority={true}
                style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', objectFit: 'cover' }}
                {...props}
            />
        </div>
    );
};

export default OptimizedImg;
