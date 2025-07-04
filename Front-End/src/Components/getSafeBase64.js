export function getSafeBase64(base64, mime = 'image/png') {
  if (!base64) return '/default-user.png';
  return base64.startsWith('data:image') ? base64 : `data:${mime};base64,${base64}`;
}