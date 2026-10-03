import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
            </svg>
          </span>
          TokoDigital
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-slate-600 sm:gap-2">
          <Link href="/" className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-900">Katalog</Link>
          <Link href="/pembelian" className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-900">
            Pembelian<span className="hidden sm:inline"> Saya</span>
          </Link>
          <Link href="/admin/produk" className="hidden rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-900 sm:block">Admin</Link>
          <Link
            href="/login"
            className="ml-1 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700"
          >
            Masuk
          </Link>
        </nav>
      </div>
    </header>
  );
}
