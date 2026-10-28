# SILRS Mobile

**Prototype antarmuka layanan informasi laboratorium untuk pasien.**

SILRS Mobile merupakan proyek web berorientasi perangkat seluler yang mengeksplorasi cara pasien melihat hasil pemeriksaan laboratorium, jadwal kunjungan, dan informasi profil dalam satu antarmuka. Repository ini berisi prototipe front-end, bukan sistem informasi laboratorium yang sudah terhubung dengan layanan rumah sakit atau data pasien nyata.

## Fitur yang ditampilkan

- **Halaman pembuka dan login:** splash screen dengan navigasi menuju halaman masuk. Login saat ini bersifat demonstrasi tanpa autentikasi pengguna.
- **Dashboard pasien:** ringkasan menu pemeriksaan dan contoh notifikasi.
- **Hasil pemeriksaan:** daftar pemeriksaan dan halaman detail dengan contoh parameter laboratorium, nilai hasil, satuan, serta rentang rujukan.
- **Jadwal pemeriksaan:** tampilan kalender dan daftar jadwal kunjungan.
- **Profil pasien:** tampilan informasi akun dan tombol pengelolaan profil.

Sebagian elemen, seperti tombol tindakan, pencarian, filter, dan menu layanan, masih berupa antarmuka atau interaksi terbatas. Konten pasien, jadwal, dan hasil laboratorium yang ditampilkan adalah data contoh yang tertanam di halaman.

## Teknologi

- HTML5 untuk struktur halaman
- CSS3 untuk tata letak dan gaya antarmuka
- JavaScript untuk animasi, navigasi, dan interaksi dasar
- Font Awesome dan Google Fonts sebagai aset antarmuka eksternal

## Menjalankan proyek

1. Clone repository:

   ```bash
   git clone https://github.com/ShikinariShiki/silrs.git
   cd silrs
   ```

2. Jalankan server lokal sederhana dari folder proyek, misalnya:

   ```bash
   python -m http.server 8000
   ```

3. Buka `http://localhost:8000` melalui browser. Untuk melihat halaman tertentu secara langsung, buka `/login.html`, `/dashboard.html`, `/hasil.html`, atau `/jadwal.html`.

Proyek ini tidak memerlukan proses build atau instalasi dependensi npm. Beberapa aset menggunakan CDN sehingga membutuhkan koneksi internet.

## Struktur halaman

| Berkas | Fungsi |
| --- | --- |
| `index.html` | Splash screen |
| `login.html` | Form login demonstrasi |
| `dashboard.html` | Beranda pasien |
| `hasil.html` | Daftar hasil pemeriksaan |
| `detail-pemeriksaan.html` | Rincian hasil laboratorium |
| `jadwal.html` | Kalender dan jadwal pemeriksaan |
| `profil.html` | Informasi profil pasien |
| `css/` | Stylesheet antarmuka |
| `js/script.js` | Interaksi dasar antarmuka |
| `images/` | Aset gambar |

## Status dan batasan

**Status: prototipe front-end / dalam pengembangan.**

Proyek belum menyediakan backend, database, autentikasi yang aman, integrasi sistem rumah sakit, atau pengelolaan rekam medis yang sesungguhnya. Beberapa tautan, tombol, dan perilaku JavaScript juga masih memerlukan perbaikan sebelum prototipe dapat digunakan sebagai demo yang konsisten.

**SILRS Mobile tidak ditujukan untuk penggunaan klinis.** Seluruh nilai laboratorium dan informasi pasien dalam prototipe harus diperlakukan sebagai data demonstrasi, bukan informasi medis atau hasil pemeriksaan nyata.

## Pengembangan berikutnya

Prioritas pengembangan mencakup perbaikan navigasi dan path aset, pemisahan kode JavaScript berdasarkan halaman, penggantian data statis dengan data simulasi yang terstruktur, peningkatan aksesibilitas, serta pengujian alur pengguna. Integrasi backend dan autentikasi dapat dipertimbangkan setelah prototipe antarmuka stabil.

---

Dikembangkan sebagai eksplorasi desain antarmuka layanan informasi laboratorium berbasis web.
