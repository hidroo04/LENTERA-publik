/**
 * Mendapatkan class CSS berdasarkan level prestasi.
 * @param level - 'Internasional' | 'Nasional' | 'Provinsi' | 'Kabupaten'
 * @param prefix - Awalan class (contoh: 'tag' -> 'tag-internasional', 'badge' -> 'badge-internasional')
 */
export function levelBadgeClass(level: string | undefined | null, prefix: string = 'tag'): string {
  if (!level) return `${prefix}-kabupaten`;
  
  switch (level) {
    case 'Internasional':
      return `${prefix}-internasional`;
    case 'Nasional':
      return `${prefix}-nasional`;
    case 'Provinsi':
      return `${prefix}-provinsi`;
    case 'Kabupaten':
    default:
      return `${prefix}-kabupaten`;
  }
}
