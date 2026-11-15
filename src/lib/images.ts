/**
 * Product photos live in public/images/products as `<imageId>-<width>.<format>`.
 * Regenerate all widths/formats together if a photo changes (sources are 800×600).
 */
export const PRODUCT_IMAGE_WIDTHS = [200, 400, 800] as const;
export const PRODUCT_IMAGE_SIZE = { width: 800, height: 600 };

type ImageWidth = (typeof PRODUCT_IMAGE_WIDTHS)[number];
type ImageFormat = 'avif' | 'webp';

export const productImageUrl = (imageId: string, width: ImageWidth, format: ImageFormat = 'webp') =>
  `/images/products/${imageId}-${width}.${format}`;

export const productImageSrcSet = (imageId: string, format: ImageFormat) =>
  PRODUCT_IMAGE_WIDTHS.map(w => `${productImageUrl(imageId, w, format)} ${w}w`).join(', ');
