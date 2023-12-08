<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <section class="container">
    <div class="blur">
      <!-- Go to Login -->
      <div class="box">
        <h1 class="headline">Sudah punya akun?</h1>
        <button class="btn-primary" id="isRegister">Masuk</button>
      </div>
      <!-- Go to Register -->
      <div class="box">
        <h1 class="headline">Tidak punya akun?</h1>
        <button class="btn-primary" id="isRegister">Buat</button>
      </div>
    </div>
    <div class="auth">
      <!-- Login Page -->
      <div class="container-form">
        <form action="./homepage.php" method="POST" class="form">
          <h1 class="title">Masuk Akun</h1>
          <input type="text" name="username" placeholder="Username">
          <input type="password" name="password" placeholder="Password">
          <button type="submit" class="btn-primary" name="submit">Lanjut</button>
        </form>
      </div>
      <!-- Register Page -->
      <div class="container-form">
        <form action="./homepage.php" method="POST" class="form">
          <h1 class="title">Buat Akun</h1>
          <input type="text" name="username" placeholder="Username">
          <input type="text" name="name" placeholder="Nama Lengkap">
          <select name="location">
            <option>Lokasi</option>
            <option value="Bandung">Bandung</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Bali">Bali</option>
          </select>
          <div class="selection">
            <input type="radio" name="gender" id="male" value="man">
            <label for="male">
              Pria
            </label>
            <input type="radio" name="gender" id="female" value="woman">
            <label for="female">
              Wanita
            </label>
          </div>
          <input type="password" name="password" placeholder="Password">
          <button type="submit" class="btn-primary" name="submit">Lanjut</button>
        </form>
      </div>
    </div>
  </section>
  <script>
    document.querySelectorAll("#isRegister").forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelector("body").classList.toggle("active");
        document.querySelector(".auth").classList.toggle("active");
      });
    })
  </script>
</body>

</html>