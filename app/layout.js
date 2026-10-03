import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "TokoDigital — Produk Digital Siap Unduh",
  description: "Ebook, template, preset, dan produk digital lainnya. Bayar lewat transfer, unduh setelah dikonfirmasi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6">
            <p className="font-semibold text-slate-700">TokoDigital</p>
            <p>© 2026 TokoDigital. Semua hak dilindungi.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
