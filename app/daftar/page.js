import AuthForm from "@/components/AuthForm";

export default function Daftar() {
  return (
    <AuthForm
      judul="Buat akun baru"
      subjudul="Cukup email dan password. Gratis, tanpa biaya langganan."
      tombol="Daftar"
      alihTeks="Sudah punya akun?"
      alihLink="/login"
      alihLabel="Masuk"
    />
  );
}
