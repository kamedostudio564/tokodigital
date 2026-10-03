import Link from "next/link";
import { rupiah } from "@/lib/format";
import ProductCover from "@/components/ProductCover";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/produk/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-indigo-200"
    >
      <ProductCover product={product} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold leading-snug text-slate-900">{product.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{product.format}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-slate-900">{rupiah(product.price)}</span>
          <span className="text-sm font-medium text-indigo-600 group-hover:underline">Lihat detail →</span>
        </div>
      </div>
    </Link>
  );
}
