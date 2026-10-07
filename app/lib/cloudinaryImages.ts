const CLOUDINARY_UPLOAD_URL = 'https://res.cloudinary.com/plgkusx1/image/upload/';
const OPTIMIZED_TRANSFORM = 'f_auto,q_auto,c_limit,w_1200/';

export function cloudinaryImage(publicId: string): string {
  return `${CLOUDINARY_UPLOAD_URL}${OPTIMIZED_TRANSFORM}${publicId}`;
}

export function toCloudinaryImageUrl(source: string): string {
  if (source.startsWith(CLOUDINARY_UPLOAD_URL)) {
    if (source.startsWith(`${CLOUDINARY_UPLOAD_URL}${OPTIMIZED_TRANSFORM}`)) return source;
    if (source.startsWith(`${CLOUDINARY_UPLOAD_URL}f_auto,q_auto/`)) {
      return source.replace(`${CLOUDINARY_UPLOAD_URL}f_auto,q_auto/`, `${CLOUDINARY_UPLOAD_URL}${OPTIMIZED_TRANSFORM}`);
    }
    return source.replace(CLOUDINARY_UPLOAD_URL, `${CLOUDINARY_UPLOAD_URL}${OPTIMIZED_TRANSFORM}`);
  }

  const assetPrefix = '/assets/images/';
  if (!source.startsWith(assetPrefix)) return source;

  const [folder, ...pathParts] = source.slice(assetPrefix.length).split('/');
  const filename = pathParts.at(-1);
  if (!filename) return source;

  let publicId = filename.replace(/\.(?:jpe?g|png|webp)$/i, '');
  if (folder === 'batch4_images' && !publicId.endsWith('_batch_4')) publicId += '_batch_4';
  if (folder === 'batch5_images' && !publicId.endsWith('_batch_5')) publicId += '_batch_5';

  return cloudinaryImage(`${publicId}.jpg`);
}