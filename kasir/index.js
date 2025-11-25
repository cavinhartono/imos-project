/* 
  - Audiens untuk Mahasiswa (Semester 1)
  - D
*/
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let subtotal = 0;
let lanjut = true;

const Menus = [
  {
    nama: "Ayam Geprek",
    harga: 15000,
  },
  {
    nama: "Seblak",
    harga: 10000,
  },
  {
    nama: "Kopi Hitam",
    harga: 5000,
  },
];
const Orders = [];

function tanyaMenu() {
  console.log("\nMENU MAKANAN: ");
  Menus.forEach((menu, index) =>
    console.log(`${++index}. ${menu.nama} - Rp. ${menu.harga}`)
  );

  rl.question("Pilih menu (1/2/3): ", (pilihan) => {
    let harga = 0;
    let nama = "";

    switch (pilihan) {
      case "1":
        nama = Menus[0].nama;
        harga = Menus[0].harga;
        break;
      case "2":
        nama = Menus[1].nama;
        harga = Menus[1].harga;
        break;
      case "3":
        nama = Menus[2].nama;
        harga = Menus[2].harga;
        break;
      default:
        console.log("Pilihan tidak tersedia!");
        return tanyaMenu();
    }

    rl.question("Jumlah: ", (jumlahInput) => {
      let jumlah = Number(jumlahInput);
      let totalItem = harga * jumlah;

      subtotal += totalItem;
      Orders.push({
        nama: nama,
        jumlah: jumlah,
        harga: harga,
        total: totalItem,
      });

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
  let diskon = 0;

  if (subtotal > 50000) {
    diskon = 0.1;
    subtotal -= subtotal * diskon;
  }

  console.log("\n=== STRUK PEMBAYARAN ===");
  // Tampilkan detail pesanan
  Orders.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.nama} (${item.jumlah} x Rp. ${new Intl.NumberFormat(
        "id-ID",
        { minimumFractionDigits: 0 }
      ).format(item.harga)}) = Rp. ${new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
      }).format(item.total)}`
    );
  });

  console.log("------------------------------");
  console.log(
    "Total Pembayaran: Rp.",
    new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(
      subtotal
    )
  );

  if (diskon > 0) {
    console.log("(Diskon 10% diterapkan)");
  }

  rl.close();
}

tanyaMenu();
