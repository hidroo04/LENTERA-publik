# LENTERA - Portal Publik

## Deskripsi Project
LENTERA (Layanan Edukasi dan Nilai Tambah Elektronik Rapor Akhir - *sesuaikan kepanjangan jika ada*) Portal Publik adalah antarmuka web (frontend) interaktif yang ditujukan bagi masyarakat umum atau pengguna non-admin. Platform ini digunakan untuk melihat daftar prestasi, statistik data, informasi tentang instansi (BPS), serta halaman kontak secara transparan dan informatif. 

Proyek ini dipisahkan dari panel admin untuk memastikan keamanan dan optimalisasi performa bagi pengunjung (public-facing).

## Fitur Utama
- **Beranda (Home):** Halaman utama yang menampilkan highlight atau informasi sambutan.
- **Prestasi:** Katalog daftar prestasi yang menampilkan capaian atau penghargaan (mendukung pencarian dan filter).
- **Detail Prestasi:** Halaman informasi lengkap mengenai suatu prestasi spesifik beserta media pendukungnya.
- **Statistik:** Halaman visualisasi data atau rekap capaian (charts/graphs).
- **Tentang:** Informasi seputar latar belakang, tujuan, dan profil organisasi.
- **Kontak:** Menampilkan informasi lokasi, email, atau form untuk menghubungi pihak terkait.

## Teknologi yang Digunakan
- **Framework:** [React 19](https://react.dev/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v7)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Ikon:** [React Icons](https://react-icons.github.io/react-icons/)
- **Linter:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## Struktur Folder
Di dalam direktori `src/`, proyek disusun menggunakan arsitektur *feature-based* dan pembagian tugas komponen yang jelas:
```text
src/
├── api/          # Konfigurasi Axios & pemanggilan API endpoint (achievement, category, statistik)
├── assets/       # File statis seperti gambar, font, atau logo (tidak diproses kompilasi berat)
├── components/   # Komponen UI global yang dapat digunakan kembali (Reusable components)
├── constants/    # Variabel konstanta global (misal: route paths, konfigurasi konstan)
├── features/     # Modul atau komponen spesifik yang terkait erat dengan fitur tertentu
├── hooks/        # Custom React Hooks (misal: useFetch, usePagination)
├── layouts/      # Komponen layout pembungkus halaman (misal: PublicLayout dengan Header/Footer)
├── pages/        # Komponen utama yang merepresentasikan suatu halaman/route utuh
├── types/        # Definisi tipe data TypeScript (Interfaces/Types)
└── utils/        # Fungsi-fungsi pembantu (helper functions) seperti format tanggal, dll.
```

## Persyaratan Sistem
Sebelum menjalankan proyek ini, pastikan sistem Anda telah menginstal:
- **Node.js**: Versi 18.x atau yang lebih baru (disarankan menggunakan versi LTS terbaru).
- **Package Manager**: npm (bawaan Node.js) atau yarn / pnpm.

## Instalasi
1. Clone repositori ini atau ekstrak folder project.
2. Buka terminal/command prompt dan arahkan ke direktori `frontend` publik ini:
   ```bash
   cd path/to/LENTERA-publik/frontend
   ```
3. Instal semua dependensi yang dibutuhkan:
   ```bash
   npm install
   ```

## Konfigurasi Environment
Buat file bernama `.env` di *root directory* (sejajar dengan `package.json`) berdasarkan kebutuhan API backend Anda. Contoh isi `.env`:

```env
# URL dasar untuk API Backend LENTERA
VITE_API_BASE_URL=https://lentera1810.web.bps.go.id/api

# URL dasar untuk mengakses file storage/media (gambar/dokumen)
VITE_STORAGE_URL=https://lentera1810.web.bps.go.id/storage
```

## Menjalankan Aplikasi

**Mode Development (Pengembangan):**
```bash
npm run dev
```
Aplikasi akan berjalan di server lokal (biasanya `http://localhost:5173`). Buka URL tersebut di browser Anda.

**Mode Build (Produksi):**
Untuk men-generate file statis yang siap di-deploy ke server (seperti Nginx atau Apache):
```bash
npm run build
```
File hasil build akan berada di dalam folder `dist/`. Anda dapat mengujinya secara lokal menggunakan perintah `npm run preview`.

## Routing
Navigasi diatur menggunakan `React Router DOM` di `src/App.tsx`. Daftar rute yang tersedia:
- `/` - Halaman Beranda
- `/prestasi` - Halaman Daftar Prestasi
- `/prestasi/:slug` - Halaman Detail Prestasi Spesifik
- `/statistik` - Halaman Statistik Capaian
- `/tentang` - Halaman Tentang LENTERA
- `/kontak` - Halaman Kontak/Hubungi Kami

## Integrasi API
Aplikasi ini berkomunikasi dengan backend melalui `axios` yang dikonfigurasi di `src/api/axios.ts`. 
Semua interaksi request ke server dipusatkan pada folder `src/api/` (contoh: `achievementApi.ts`, `statisticsApi.ts`, dll) agar mudah dikelola dan di-maintain. 
Aplikasi mengambil konfigurasi Base URL otomatis dari file `.env`.

## Screenshot
*(Tambahkan gambar screenshot aplikasi publik Anda di dalam folder aset, lalu gunakan link di bawah ini)*

![Screenshot Beranda LENTERA Publik](./src/assets/screenshot-home.png)
*Tampilan Halaman Beranda Publik LENTERA*
