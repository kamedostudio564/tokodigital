// Data contoh untuk Tahap 1. Akan diganti data dari Supabase di Tahap 4-7.

export const REKENING = {
  bank: "BCA",
  nomor: "1234567890",
  atasNama: "Nama Pemilik Toko",
};

export const products = [
  {
    id: "1",
    title: "Ebook Panduan Memulai Bisnis Online",
    description:
      "Panduan langkah demi langkah untuk memulai jualan online dari nol. Berisi 80 halaman, checklist, dan contoh kasus nyata.",
    price: 49000,
    type: "Ebook",
    format: "PDF · 80 halaman",
    highlights: ["Panduan dari nol sampai jualan pertama", "Checklist yang bisa langsung dipakai", "Contoh kasus nyata"],
    color: "from-sky-500 to-indigo-600",
    is_active: true,
  },
  {
    id: "2",
    title: "Template Notion Perencana Konten",
    description:
      "Template Notion siap pakai untuk merencanakan konten media sosial selama sebulan penuh. Tinggal duplikat dan isi.",
    price: 35000,
    type: "Template",
    format: "Notion · tinggal duplikat",
    highlights: ["Kalender konten 30 hari", "Papan ide dan status posting", "Mudah diubah sesuai kebutuhan"],
    color: "from-amber-400 to-orange-500",
    is_active: true,
  },
  {
    id: "3",
    title: "Preset Lightroom Warna Hangat",
    description:
      "10 preset Lightroom dengan nuansa hangat untuk foto produk dan lifestyle. Cocok untuk HP maupun komputer.",
    price: 59000,
    type: "Preset",
    format: "Lightroom · 10 preset",
    highlights: ["Cocok untuk foto produk dan lifestyle", "Bisa dipakai di HP dan komputer", "Sekali klik, hasil langsung rapi"],
    color: "from-rose-400 to-fuchsia-600",
    is_active: true,
  },
  {
    id: "4",
    title: "Template Invoice Excel",
    description:
      "Template invoice rapi dengan rumus otomatis. Tinggal isi nama barang dan jumlah.",
    price: 25000,
    type: "Template",
    format: "Excel · rumus otomatis",
    highlights: ["Total dan pajak terhitung otomatis", "Siap cetak atau simpan PDF"],
    color: "from-emerald-400 to-teal-600",
    is_active: false,
  },
];

export const orders = [
  {
    id: "ord-001",
    product_id: "1",
    buyer: "budi@contoh.com",
    status: "lunas",
    admin_note: "",
    created_at: "2026-09-28",
  },
  {
    id: "ord-002",
    product_id: "2",
    buyer: "sari@contoh.com",
    status: "menunggu_konfirmasi",
    admin_note: "",
    created_at: "2026-10-01",
  },
  {
    id: "ord-003",
    product_id: "3",
    buyer: "budi@contoh.com",
    status: "ditolak",
    admin_note: "Nominal transfer kurang. Mohon upload ulang bukti yang benar.",
    created_at: "2026-10-01",
  },
  {
    id: "ord-004",
    product_id: "1",
    buyer: "dewi@contoh.com",
    status: "menunggu_bayar",
    admin_note: "",
    created_at: "2026-10-02",
  },
];

export function getProduct(id) {
  return products.find((p) => p.id === id);
}

export function getOrder(id) {
  return orders.find((o) => o.id === id);
}
