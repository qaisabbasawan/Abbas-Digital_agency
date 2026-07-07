import { supabase } from './supabase'

const BUCKET = 'blog-images'
const MAX_WIDTH = 1600
const QUALITY = 0.82

/* Decode the picked image and re-encode it as WebP on a canvas,
   downscaling to MAX_WIDTH so a phone photo doesn't ship at 12MP. */
async function toWebP(file) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_WIDTH / bitmap.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', QUALITY))
  if (!blob) throw new Error('Could not convert this image to WebP.')
  return blob
}

/* Convert to WebP, upload to Supabase Storage, return the public URL. */
export async function uploadBlogImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.')
  const blob = await toWebP(file)
  const base = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'image'
  const path = `${Date.now()}-${base}.webp`

  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: 'image/webp',
    cacheControl: '31536000',
  })
  if (error) {
    if (/bucket not found/i.test(error.message)) {
      throw new Error('Storage bucket "blog-images" is missing — create it in Supabase first.')
    }
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
