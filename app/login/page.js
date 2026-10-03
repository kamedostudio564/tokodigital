import AuthForm from "@/components/AuthForm";

export default function Login() {
  return (
    <AuthForm
      judul="Selamat datang kembali"
      subjudul="Masuk untuk membeli produk dan melihat pembelian Anda."
      tombol="Masuk"
      alihTeks="Belum punya akun?"
      alihLink="/daftar"
      alihLabel="Daftar gratis"
    />
  );
}
