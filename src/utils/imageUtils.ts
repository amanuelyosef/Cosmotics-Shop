/**
 * Image Optimization Utilities
 * 
 * Transforms Cloudinary and Unsplash URLs into lightweight, hardware-accelerated,
 * properly dimensioned images. This prevents memory leaks, GPU texture corruption,
 * and rainbow static artifacts on low-power and integrated laptop GPUs.
 */

export function getOptimizedImageUrl(url: string | undefined, width = 800): string {
  if (!url || typeof url !== 'string') {
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
  }

  const trimmed = url.trim();

  // Cloudinary image transformation
  if (trimmed.includes('res.cloudinary.com') && trimmed.includes('/image/upload/')) {
    // If already has transformation parameters, return as is
    if (trimmed.includes('/image/upload/f_auto') || trimmed.includes('/image/upload/w_') || trimmed.includes('/image/upload/c_')) {
      return trimmed;
    }
    // Insert dynamic auto-format, auto-quality, and bounded width
    const transform = `f_auto,q_auto:good,w_${width},c_limit/`;
    return trimmed.replace('/image/upload/', `/image/upload/${transform}`);
  }

  // Unsplash image optimization
  if (trimmed.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(trimmed);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('q', '80');
      return urlObj.toString();
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}
