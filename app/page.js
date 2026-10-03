import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import { products } from "@/lib/data";

const LANGKAH = [
  { no: "1", judul: "Pilih produk", teks: "Lihat katalog dan pilih produk yang Anda butuhkan." },
  { no: "2", judul: "Transfer & upload bukti", teks: "Bayar lewat transfer bank, lalu unggah bukti pembayarannya." },
  { no: "3", judul: "Unduh produk", teks: "Setelah dikonfirmasi, produk langsung bisa diunduh di akun Anda." },
];

export default function Beranda() {
  const aktif = products.filter((p) => p.is_active);
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-indigo-50 to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
            Produk digital siap unduh
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Ebook, template, dan preset untuk mempercepat kerja Anda
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Pilih, bayar lewat transfer, dan unduh setelah dikonfirmasi. Tanpa ribet kirim file lewat chat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#katalog"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Lihat produk
            </a>
            <Link
              href="/daftar"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
            >
              Buat akun
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div id="katalog" className="scroll-mt-20">
          <h2 className="text-2xl font-bold tracking-tight">Katalog produk</h2>
          <p className="mt-1 text-slate-500">{aktif.length} produk tersedia</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aktif.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </Container>

      <section className="border-t border-slate-200 bg-white">
        <Container>
          <h2 className="text-2xl font-bold tracking-tight">Cara membeli</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {LANGKAH.map((l) => (
              <div key={l.no} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {l.no}
                </span>
                <h3 className="mt-4 font-semibold">{l.judul}</h3>
                <p className="mt-1 text-sm text-slate-600">{l.teks}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
