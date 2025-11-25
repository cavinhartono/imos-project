const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let total = 0;
let lanjut = true;

function tanyaMenu() {
  console.log("\nMENU MAKANAN: ");
  console.log("1. Ayam Geprek - Rp15.000");
  console.log("2. Nasi Goreng - Rp12.000");
  console.log("3. Kopi - Rp5.000");

  rl.question("Pilih menu (1/2/3): ", (pilihan) => {
    let harga = 0;

    switch (pilihan) {
      case "1":
        harga = 15000;
        break;
      case "2":
        harga = 12000;
        break;
      case "3":
        harga = 5000;
        break;
      default:
        console.log("Pilihan tidak tersedia!");
        return tanyaMenu(); // ulang kembali
    }

    rl.question("Jumlah: ", (jumlahInput) => {
      let jumlah = Number(jumlahInput);
      total += harga * jumlah;

      rl.question("Beli lagi? (y/n): ", (jawaban) => {
        if (jawaban.toLowerCase() === "n") {
          lanjut = false;
          hitungTotal();
        } else {
          tanyaMenu();
        }
      });
    });
  });
}

function hitungTotal() {
  if (total > 50000) {
    const diskon = 0.1;
    total = total - (total * 0.1);
  }

  console.log("\n=== STRUK PEMBAYARAN ===");
  console.log(
    "Total Pembayaran: Rp.",
    new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(total)
  );
  rl.close();
}

// Mulai program
tanyaMenu();
