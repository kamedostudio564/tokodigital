import Link from "next/link";

export default function AdminTabs({ aktif }) {
  const tab = (href, label, key) => (
    <Link
      href={href}
      className={`rounded-lg px-4 py-2 text-sm font-medium ${
        aktif === key ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Panel Admin</h1>
        <p className="text-sm text-slate-500">Kelola produk dan konfirmasi pesanan.</p>
      </div>
      <div className="flex gap-1 rounded-xl bg-slate-200/60 p-1">
        {tab("/admin/produk", "Produk", "produk")}
        {tab("/admin/pesanan", "Pesanan", "pesanan")}
      </div>
    </div>
  );
}
