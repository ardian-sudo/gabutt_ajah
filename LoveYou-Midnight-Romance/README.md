# LoveYou — Midnight Romance

Web app surprise romantis dengan tema langit malam, bintang, amplop interaktif, surat cinta, musik latar, dan final surprise dengan animasi hati. Dibangun dengan React + Vite + CSS dan siap deploy ke Vercel.

## Menjalankan secara lokal

1. Install Node.js LTS: https://nodejs.org/
2. Ekstrak ZIP.
3. Buka folder project di VS Code.
4. Jalankan di terminal:

   ```bash
   npm install
   npm run dev
   ```

5. Buka URL yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Personalisasi konten

Buka `src/App.jsx`, lalu ubah objek `LOVE_CONFIG` di bagian atas file:

- `partnerName`: nama pasangan.
- `senderName`: namamu atau nama panggilan.
- `intro`: kalimat pembuka.
- `letter`: isi surat cinta.
- `finalMessage`: pesan di kejutan terakhir.
- `specialDate`: tanggal penting format `YYYY-MM-DD` (opsional).
- `musicUrl`: URL langsung ke file audio `.mp3` atau `.ogg` (opsional).
- `musicLabel`: label musik.

Gunakan URL audio langsung yang dapat diakses publik. Link halaman YouTube/Spotify bukan file audio langsung. Musik tidak dipaksa autoplay saat halaman dibuka; pengunjung dapat menekan tombol Play music, sesuai pembatasan autoplay browser.

## Deploy ke Vercel

1. Buat repository di GitHub dan unggah isi folder project (bukan ZIP-nya).
2. Buka https://vercel.com/ lalu pilih **Add New → Project**.
3. Import repository GitHub.
4. Pastikan pengaturan build:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Klik **Deploy**.

`vercel.json` disertakan dengan rewrite fallback untuk aplikasi.

## Catatan

- Semua konten saat ini berada di `LOVE_CONFIG`; tidak membutuhkan database.
- Karena website statis, jangan menyimpan rahasia/password pribadi di source code.
- Gunakan file audio yang kamu punya hak untuk digunakan.
- Layout responsif untuk layar HP dan laptop; animasi dikurangi otomatis jika pengunjung mengaktifkan preferensi reduced motion.
