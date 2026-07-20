/**
 * Memformat string tanggal (contoh: "YYYY-MM-DD") menjadi format bahasa Indonesia.
 * Contoh output: "2 Mei 2025" atau "02 Mei 2025" tergantung opsi.
 */
export function formatDate(dateStr: string | null | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return '-';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short', // atau 'long' tergantung kebutuhan
    year: 'numeric'
  };

  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', options || defaultOptions);
  } catch (error) {
    return dateStr; // fallback jika parsing gagal
  }
}
