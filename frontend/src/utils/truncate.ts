/**
 * Memotong teks jika melebihi batas panjang maksimum dan menambahkan ellipsis ("...").
 */
export function truncate(text: string | null | undefined, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
