import Link from "next/link";

const input =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function AuthForm({ judul, subjudul, tombol, alihTeks, alihLink, alihLabel }) {
  return (
    <div className="mx-auto max-w-md py-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold tracking-tight">{judul}</h1>
        <p className="mt-1 text-sm text-slate-500">{subjudul}</p>
        <form className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input type="email" placeholder="nama@email.com" className={input} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input type="password" placeholder="Minimal 6 karakter" className={input} />
          </label>
          <button
            type="button"
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            {tombol}
          </button>
        </form>
      </div>
      <p className="mt-5 text-center text-sm text-slate-600">
        {alihTeks}{" "}
        <Link href={alihLink} className="font-medium text-indigo-600 hover:underline">
          {alihLabel}
        </Link>
      </p>
    </div>
  );
}
