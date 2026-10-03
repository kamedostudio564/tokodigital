import AdminTabs from "@/components/AdminTabs";
import Container from "@/components/Container";
import StatusBadge from "@/components/StatusBadge";
import { orders, getProduct } from "@/lib/data";
import { rupiah } from "@/lib/format";

export default function AdminPesanan() {
  return (
    <Container className="max-w-4xl">
      <AdminTabs aktif="pesanan" />
      <ul className="space-y-4">
        {orders.map((o) => {
          const p = getProduct(o.product_id);
          return (
            <li key={o.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-slate-500">
                    {o.buyer} · {rupiah(p.price)} · {o.created_at}
                  </p>
                </div>
                <StatusBadge status={o.status} />
              </div>
              {o.status === "menunggu_konfirmasi" && (
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500 ring-1 ring-slate-200">
                    Bukti bayar
                  </div>
                  <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                    Konfirmasi
                  </button>
                  <input
                    placeholder="Catatan jika ditolak"
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                  <button type="button" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50">
                    Tolak
                  </button>
                </div>
              )}
              {o.status === "ditolak" && o.admin_note && (
                <p className="mt-3 text-sm text-slate-500">Catatan: {o.admin_note}</p>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
