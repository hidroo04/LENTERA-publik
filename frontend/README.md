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
### Beranda
<img width="2880" height="1534" alt="image" src="https://github.com/user-attachments/assets/02688c3a-87b6-4b2a-8e92-ce0ba528fc38" />
<img width="2880" height="1532" alt="image" src="https://github.com/user-attachments/assets/2a1301f3-d8dd-4fff-b34c-d5a19fe45da6" />

### Prestasi
<img width="2880" height="1524" alt="image" src="https://github.com/user-attachments/assets/6798964f-c15e-4d2b-9a63-82332588e4e8" />

### Statistik
<img width="2880" height="1522" alt="image" src="https://github.com/user-attachments/assets/82664f82-fdb4-4f01-b404-060b536b4482" />

### Tentang
<img width="2880" height="1528" alt="image" src="https://github.com/user-attachments/assets/0a6cc47a-de7d-4965-8991-9d5472507280" />


### Kontak
<img width="2868" height="1528" alt="image" src="https://github.com/user-attachments/assets/c85e9441-c767-46ec-a639-796d70f5f012" />



