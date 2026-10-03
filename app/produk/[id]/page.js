import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/data";
import { rupiah } from "@/lib/format";
import Container from "@/components/Container";
import ProductCover from "@/components/ProductCover";

export default async function DetailProduk({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <Container>
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">Katalog</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ProductCover product={product} className="aspect-[16/10] rounded-2xl" />
          <h2 className="mt-8 text-lg font-semibold">Tentang produk ini</h2>
          <p className="mt-2 leading-relaxed text-slate-600">{product.description}</p>
          <h2 className="mt-8 text-lg font-semibold">Yang Anda dapatkan</h2>
          <ul className="mt-3 space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-slate-700">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5 9-10" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-24">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">{product.type}</span>
            <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight">{product.title}</h1>
            <p className="mt-1 text-sm text-slate-500">{product.format}</p>
            <p className="mt-5 text-3xl font-bold">{rupiah(product.price)}</p>
            <Link
              href="/bayar/ord-004"
              className="mt-5 block rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Beli sekarang
            </Link>
            <p className="mt-2 text-center text-xs text-slate-500">Anda perlu masuk dulu sebelum membeli.</p>
            <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-600">
              <li>✓ Bayar lewat transfer bank</li>
              <li>✓ Unduh setelah pembayaran dikonfirmasi</li>
              <li>✓ Tersimpan di halaman Pembelian Saya</li>
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
