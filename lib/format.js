export function rupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

export const STATUS_LABEL = {
  menunggu_bayar: "Menunggu pembayaran",
  menunggu_konfirmasi: "Menunggu konfirmasi",
  lunas: "Lunas",
  ditolak: "Ditolak",
};
