import { notFound } from "next/navigation";
import { getOrder, getProduct, REKENING } from "@/lib/data";
import { rupiah } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge";
import Container from "@/components/Container";

export default async function Bayar({ params }) {
  const { orderId } = await params;
  const order = getOrder(orderId);
  if (!order) notFound();
  const product = getProduct(order.product_id);

  return (
    <Container className="max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Selesaikan pembayaran</h1>
      <p className="mt-1 text-sm text-slate-500">Transfer sesuai nominal, lalu unggah bukti pembayaran.</p>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pesanan</p>
            <p className="mt-1 font-semibold">{product.title}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="mt-5 rounded-xl bg-indigo-50 p-4 text-center">
          <p className="text-sm text-indigo-700">Total yang harus ditransfer</p>
          <p className="mt-1 text-3xl font-bold text-indigo-700">{rupiah(product.price)}</p>
        </div>

        <dl className="mt-5 divide-y divide-slate-100 text-sm">
          <div className="flex justify-between py-2.5"><dt className="text-slate-500">Bank</dt><dd className="font-medium">{REKENING.bank}</dd></div>
          <div className="flex justify-between py-2.5"><dt className="text-slate-500">No. rekening</dt><dd className="font-mono font-medium">{REKENING.nomor}</dd></div>
          <div className="flex justify-between py-2.5"><dt className="text-slate-500">Atas nama</dt><dd className="font-medium">{REKENING.atasNama}</dd></div>
        </dl>
      </div>

      <form className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="font-semibold">Upload bukti bayar</h2>
        <p className="mt-1 text-sm text-slate-500">Format JPG atau PNG, maksimal 2 MB.</p>
        <input
          type="file"
          accept="image/png,image/jpeg"
          className="mt-4 block w-full rounded-lg border border-dashed border-slate-300 p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium"
        />
        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Kirim bukti bayar
        </button>
      </form>
    </Container>
  );
}
