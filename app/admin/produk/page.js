import AdminTabs from "@/components/AdminTabs";
import Container from "@/components/Container";
import { products } from "@/lib/data";
import { rupiah } from "@/lib/format";

const input =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
const file =
  "mt-1.5 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium";

export default function AdminProduk() {
  return (
    <Container>
      <AdminTabs aktif="produk" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Produk</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.type} · {p.format}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{rupiah(p.price)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {p.is_active ? "Tampil" : "Disembunyikan"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button type="button" className="mr-3 font-medium text-indigo-600 hover:underline">Ubah</button>
                    <button type="button" className="text-slate-500 hover:underline">
                      {p.is_active ? "Sembunyikan" : "Tampilkan"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Tambah produk</h2>
          <label className="block text-sm font-medium text-slate-700">Judul<input className={input} /></label>
          <label className="block text-sm font-medium text-slate-700">Deskripsi<textarea rows={3} className={input} /></label>
          <label className="block text-sm font-medium text-slate-700">Harga (Rp)<input type="number" className={input} /></label>
          <label className="block text-sm font-medium text-slate-700">Gambar sampul<input type="file" accept="image/*" className={file} /></label>
          <label className="block text-sm font-medium text-slate-700">File produk<input type="file" className={file} /></label>
          <button type="button" className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
            Simpan produk
          </button>
        </form>
      </div>
    </Container>
  );
}
