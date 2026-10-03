# PRD — TokoDigital (nama sementara, bisa diganti)

## 1. Ringkasan
TokoDigital adalah website untuk menjual produk digital (misalnya ebook, template, preset) langsung dari pemiliknya. Pembeli melihat katalog, membeli lewat transfer manual, lalu mengunduh produk setelah pembayaran dikonfirmasi. Pemilik toko mengelola produk dan pesanan lewat halaman admin.

## 2. Target User
- **Siapa:** Pembeli produk digital (umum) dan satu pemilik toko (Anda) sebagai admin.
- **Jenis user:** Admin (pemilik toko) + Pembeli (user biasa).

## 3. Masalah yang Diselesaikan
Selama ini jualan produk digital lewat chat itu repot: harus kirim file satu per satu, cek bukti transfer di banyak chat, dan susah melacak siapa sudah bayar. Aplikasi ini merapikan semuanya di satu tempat: katalog, pesanan, bukti bayar, dan pengiriman file otomatis setelah dikonfirmasi.

## 4. Fitur MVP (maksimal 5)
| No | Fitur | Penjelasan singkat |
|----|-------|--------------------|
| 1 | Katalog & detail produk | Pembeli melihat daftar produk (gambar, judul, harga) dan halaman detail. Tanpa login. |
| 2 | Daftar & login | Pembeli daftar/login dengan email + password. |
| 3 | Beli dengan transfer manual | Pembeli klik "Beli", melihat nomor rekening dan nominal, transfer, lalu upload bukti bayar. |
| 4 | Pembelian Saya + unduh | Pembeli melihat status pesanan. Setelah dikonfirmasi admin, tombol "Unduh" muncul. |
| 5 | Panel admin | Admin menambah/mengubah/menyembunyikan produk (termasuk upload file produk) dan mengonfirmasi atau menolak pesanan setelah cek bukti bayar. |

## 5. Fitur Nanti (bukan untuk versi pertama)
- Pembayaran otomatis (Midtrans/Xendit/QRIS) — butuh backend, jadi ditunda agar versi pertama cepat jadi.
- Keranjang untuk beli banyak produk sekaligus.
- Kode diskon/voucher.
- Email notifikasi otomatis.
- Kategori, pencarian, dan ulasan produk.
- Laporan penjualan dan grafik.

> Supaya versi pertama cepat jadi dan minim error, fitur di atas disimpan dulu. Setelah MVP jalan, bisa ditambah satu per satu.

## 6. Alur User
**Pembeli**
1. Membuka beranda → melihat katalog produk.
2. Klik produk → membaca detail dan harga.
3. Klik "Beli" → diminta login/daftar kalau belum.
4. Pesanan dibuat dengan status "Menunggu pembayaran" → halaman menampilkan nomor rekening dan nominal.
5. Pembeli transfer, lalu upload bukti bayar → status "Menunggu konfirmasi".
6. Setelah admin konfirmasi → status "Lunas", tombol "Unduh" muncul di halaman Pembelian Saya.
7. Jika ditolak → status "Ditolak" beserta catatan, pembeli bisa upload ulang.

**Admin**
1. Login → buka `/admin`.
2. Tambah produk (judul, deskripsi, harga, gambar sampul, file produk).
3. Buka daftar pesanan → lihat bukti bayar → klik "Konfirmasi" atau "Tolak".

## 7. Daftar Halaman
| Halaman | URL | Isi | Perlu login? |
|---------|-----|-----|--------------|
| Beranda / Katalog | `/` | Daftar produk aktif | Tidak |
| Detail Produk | `/produk/[id]` | Gambar, deskripsi, harga, tombol Beli | Tidak (Beli perlu login) |
| Login | `/login` | Form email + password | Tidak |
| Daftar | `/daftar` | Form pendaftaran | Tidak |
| Pembayaran | `/bayar/[orderId]` | Info rekening, nominal, upload bukti bayar | Ya |
| Pembelian Saya | `/pembelian` | Daftar pesanan, status, tombol Unduh | Ya |
| Admin: Produk | `/admin/produk` | Daftar + tambah/ubah produk | Ya (admin) |
| Admin: Pesanan | `/admin/pesanan` | Daftar pesanan, bukti bayar, konfirmasi/tolak | Ya (admin) |

## 8. Struktur Database (Supabase / PostgreSQL)

### Tabel `admins`
Daftar user yang menjadi admin. Diisi manual sekali lewat Supabase (untuk akun Anda).
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid | primary key, default `gen_random_uuid()` |
| user_id | uuid | unik, referensi `auth.users` |
| created_at | timestamptz | default `now()` |

### Tabel `products`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid | primary key, default `gen_random_uuid()` |
| title | text | judul produk |
| description | text | deskripsi |
| price | integer | harga dalam Rupiah |
| cover_path | text | path gambar sampul di bucket `product-covers` |
| file_path | text | path file produk di bucket `product-files` |
| is_active | boolean | default `true`; `false` = disembunyikan dari katalog |
| created_at | timestamptz | default `now()` |

### Tabel `orders`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid | primary key, default `gen_random_uuid()` |
| user_id | uuid | pembeli, referensi `auth.users` |
| product_id | uuid | referensi `products` |
| status | text | `menunggu_bayar`, `menunggu_konfirmasi`, `lunas`, `ditolak`; default `menunggu_bayar` |
| proof_path | text | path bukti bayar di bucket `payment-proofs` (boleh kosong) |
| admin_note | text | catatan admin saat menolak (boleh kosong) |
| created_at | timestamptz | default `now()` |

### Storage (penyimpanan file)
| Bucket | Isi | Publik? |
|--------|-----|---------|
| `product-covers` | gambar sampul | Ya (boleh dilihat siapa saja) |
| `product-files` | file produk yang dijual | **Tidak** (privat) |
| `payment-proofs` | bukti bayar | **Tidak** (privat) |

## 9. Aturan Keamanan (RLS)
- **`admins`:** User hanya bisa melihat barisnya sendiri (untuk cek apakah dia admin). Tidak ada yang bisa menambah/mengubah/menghapus lewat aplikasi; admin baru ditambah manual lewat dashboard Supabase.
- **`products`:** Semua orang bisa melihat produk yang `is_active = true`. Admin bisa melihat semua, menambah, mengubah, dan menghapus produk.
- **`orders`:** Pembeli hanya bisa melihat pesanannya sendiri dan membuat pesanan baru untuk dirinya dengan status `menunggu_bayar`. Pembeli boleh mengisi `proof_path` pada pesanannya sendiri selama status `menunggu_bayar` atau `ditolak`, tetapi tidak boleh mengubah `status`. Hanya admin yang bisa melihat semua pesanan dan mengubah status.
- **Storage `product-covers`:** Semua orang bisa melihat; hanya admin yang bisa upload/hapus.
- **Storage `product-files`:** Hanya admin yang bisa upload/hapus. File hanya bisa diunduh admin, atau pembeli yang punya pesanan `lunas` untuk produk tersebut.
- **Storage `payment-proofs`:** Pembeli hanya bisa upload dan melihat file di folder miliknya sendiri (`<user_id>/...`). Admin bisa melihat semua.

> RLS wajib aktif di semua tabel. Frontend hanya memakai `anon key`. Jangan pernah menaruh `service_role key` di kode.

> Catatan teknis untuk Claude Code: pembatasan "pembeli tidak boleh ubah `status`" dibuat dengan trigger database atau `column-level privileges`, bukan hanya di tampilan. File produk diunduh lewat signed URL berumur pendek (misal 60 detik), bukan link publik.

## 10. Stack
- Next.js (frontend saja) + Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)
- GitHub → Vercel

## 11. Rencana Build Bertahap

### Tahap 1 — Kerangka & tampilan dengan data contoh
- **Tujuan:** Semua halaman sudah terlihat, belum ada database.
- **Dikerjakan:** Setup Next.js + Tailwind. Buat semua halaman di bagian 7 dengan data contoh (produk palsu). Tampilan simpel, bersih, rapi di HP.
- **Cara cek berhasil:** Jalankan `npm run dev`, buka `localhost:3000`. Bisa klik dari katalog → detail produk → halaman pembayaran → Pembelian Saya → admin, semua tampil dengan data contoh.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 1 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

### Tahap 2 — Database, Storage & RLS di Supabase
- **Tujuan:** Database dan penyimpanan file siap dan aman.
- **Dikerjakan:** Buat project Supabase. Buat tabel `admins`, `products`, `orders` dan tiga bucket storage lengkap dengan RLS sesuai bagian 9 (Claude Code menulis SQL-nya, Anda menjalankannya di SQL Editor Supabase). Hubungkan aplikasi ke Supabase lewat `.env.local` (hanya `anon key`).
- **Cara cek berhasil:** Di dashboard Supabase, tiga tabel dan tiga bucket muncul, RLS tertulis "enabled" di semua tabel. Aplikasi jalan tanpa error koneksi.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 2 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

### Tahap 3 — Daftar & login
- **Tujuan:** Pembeli dan admin bisa masuk.
- **Dikerjakan:** Halaman `/daftar` dan `/login` dengan Supabase Auth. Tombol keluar. Halaman yang butuh login diarahkan ke `/login`. Deteksi admin lewat tabel `admins`. Setelah itu Anda daftar akun sendiri, lalu tambahkan akun itu ke tabel `admins` lewat dashboard Supabase.
- **Cara cek berhasil:** Bisa daftar, keluar, dan login lagi. Buka `/pembelian` saat belum login → diarahkan ke login. Akun admin bisa membuka `/admin/produk`, akun biasa tidak.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 3 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

### Tahap 4 — Admin kelola produk & katalog dari database
- **Tujuan:** Produk asli tampil di katalog.
- **Dikerjakan:** Halaman `/admin/produk`: tambah, ubah, sembunyikan produk, upload gambar sampul dan file produk. Beranda dan detail produk membaca data dari Supabase.
- **Cara cek berhasil:** Tambah satu produk di admin → langsung muncul di beranda. Sembunyikan → hilang dari beranda. File produk tidak bisa dibuka lewat link langsung.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 4 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

### Tahap 5 — Beli & upload bukti bayar
- **Tujuan:** Pembeli bisa membuat pesanan dan mengirim bukti bayar.
- **Dikerjakan:** Tombol "Beli" membuat pesanan. Halaman `/bayar/[orderId]` menampilkan nomor rekening dan nominal, serta upload bukti bayar (jpg/png, maksimal 2 MB). Status berubah ke `menunggu_konfirmasi`.
- **Cara cek berhasil:** Login sebagai pembeli, klik Beli, upload bukti. Di dashboard Supabase, pesanan muncul dengan status `menunggu_konfirmasi`. Pembeli lain tidak bisa membuka bukti bayar ini.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 5 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

### Tahap 6 — Admin konfirmasi pesanan
- **Tujuan:** Admin bisa memproses pesanan.
- **Dikerjakan:** Halaman `/admin/pesanan`: daftar pesanan, lihat bukti bayar, tombol Konfirmasi dan Tolak (dengan catatan).
- **Cara cek berhasil:** Konfirmasi pesanan dari Tahap 5 → status menjadi `lunas`. Pesanan lain ditolak dengan catatan → statusnya `ditolak`.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 6 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

### Tahap 7 — Pembelian Saya & unduh produk
- **Tujuan:** Pembeli menerima produknya.
- **Dikerjakan:** Halaman `/pembelian` menampilkan pesanan beserta status. Pesanan `lunas` punya tombol "Unduh" (signed URL berumur pendek). Pesanan `ditolak` menampilkan catatan dan bisa upload ulang bukti.
- **Cara cek berhasil:** Pembeli dengan pesanan lunas bisa mengunduh file. Pembeli dengan pesanan belum lunas tidak melihat tombol Unduh dan tidak bisa mengunduh walau menebak alamat file.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 7 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

### Tahap 8 — Rapikan & deploy
- **Tujuan:** Aplikasi online dan bisa dipakai pembeli.
- **Dikerjakan:** Rapikan tampilan, pesan error, dan tampilan kosong. Cek di HP. Push ke GitHub, deploy ke Vercel, hubungkan integrasi Supabase di Vercel agar environment variables terisi otomatis. Cek ulang RLS dan pastikan tidak ada `service_role key` di kode.
- **Cara cek berhasil:** Buka alamat Vercel dari HP. Lakukan satu pembelian percobaan dari awal sampai file terunduh.
- **Perintah untuk Claude Code:** `Baca PRD.md lalu kerjakan Tahap 8 saja. Setelah selesai, jelaskan cara saya mengeceknya.`

## 12. Asumsi
Pertanyaan sebelumnya belum dijawab, jadi PRD ini memakai pilihan paling sederhana. Beri tahu saya kalau ada yang ingin diubah:
- Produk berupa **file** (PDF, ZIP, dll.) yang diunggah ke penyimpanan Supabase. Satu produk = satu file. (Kalau produk Anda kursus video atau link Google Drive, bagian ini perlu disesuaikan.)
- Pembayaran lewat **transfer manual** + upload bukti, dikonfirmasi admin secara manual.
- Satu pesanan = satu produk (belum ada keranjang).
- Pembeli **wajib login** sebelum membeli.
- Hanya **satu admin** (Anda). Akun admin ditambahkan manual lewat dashboard Supabase.
- Nomor rekening toko ditulis di file konfigurasi aplikasi (bukan rahasia, boleh tampil ke pembeli).
- Nama aplikasi "TokoDigital" hanya sementara. Belum ada referensi tampilan, jadi desain dibuat bersih dan minimalis.
- Harga hanya dalam Rupiah, tanpa pajak atau ongkos lain.
- Karena tidak ada backend, nominal transfer yang dilihat admin diambil dari harga produk saat ini. Admin tetap perlu mencocokkan jumlah di mutasi rekening sebelum konfirmasi.
