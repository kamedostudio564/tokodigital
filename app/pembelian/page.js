import Link from "next/link";
import { orders, getProduct } from "@/lib/data";
import { rupiah } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import Container from "@/components/Container";
import ProductCover from "@/components/ProductCover";

export default function Pembelian() {
  // Data contoh: pesanan milik "budi@contoh.com"
  const milikSaya = orders.filter((o) => o.buyer === "budi@contoh.com");
  return (
    <Container className="max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Pembelian Saya</h1>
      <p className="mt-1 text-sm text-slate-500">Semua pesanan Anda dan status pembayarannya.</p>
      <ul className="mt-6 space-y-4">
        {milikSaya.map((o) => {
          const p = getProduct(o.product_id);
          return (
            <li key={o.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <ProductCover product={p} className="hidden h-24 w-24 shrink-0 rounded-xl sm:flex" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-slate-500">{rupiah(p.price)} · {o.created_at}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
                {o.status === "ditolak" && (
                  <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    Catatan admin: {o.admin_note}
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  {o.status === "lunas" && (
                    <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                      Unduh produk
                    </button>
                  )}
                  {(o.status === "menunggu_bayar" || o.status === "ditolak") && (
                    <Link href={`/bayar/${o.id}`} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                      {o.status === "ditolak" ? "Upload ulang bukti" : "Bayar sekarang"}
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
