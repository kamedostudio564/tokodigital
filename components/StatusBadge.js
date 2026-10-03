import { STATUS_LABEL } from "@/lib/format";

const WARNA = {
  menunggu_bayar: "bg-slate-100 text-slate-700 ring-slate-200",
  menunggu_konfirmasi: "bg-amber-50 text-amber-800 ring-amber-200",
  lunas: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  ditolak: "bg-red-50 text-red-700 ring-red-200",
};

const TITIK = {
  menunggu_bayar: "bg-slate-400",
  menunggu_konfirmasi: "bg-amber-500",
  lunas: "bg-emerald-500",
  ditolak: "bg-red-500",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${WARNA[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${TITIK[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}
