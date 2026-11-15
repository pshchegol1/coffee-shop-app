import type { Product } from '../data/products';
import { PRODUCT_IMAGE_SIZE, productImageSrcSet, productImageUrl } from '../lib/images';

/**
 * Responsive product photo: AVIF with a WebP fallback, at the smallest width that
 * fits `sizes` (the image's rendered width in CSS, e.g. "96px" or "(min-width: 1024px) 400px, 100vw").
 */
export function ProductImage({ product, sizes, alt = product.name, className = '', loading = 'lazy' }: {
  product: Product;
  sizes: string;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <picture className="block w-full h-full">
      <source type="image/avif" srcSet={productImageSrcSet(product.imageId, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={productImageSrcSet(product.imageId, 'webp')} sizes={sizes} />
      <img
        src={productImageUrl(product.imageId, 800)}
        alt={alt}
        width={PRODUCT_IMAGE_SIZE.width}
        height={PRODUCT_IMAGE_SIZE.height}
        loading={loading}
        decoding="async"
        className={`w-full h-full object-cover ${className}`}
      />
    </picture>
  );
}
