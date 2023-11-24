<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kalkulator</title>
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    body {
      height: 100vh;
      display: grid;
      place-content: center;
      text-align: right;
    }

    input,
    select,
    button {
      border: 1px solid #ddd;
      outline: none;
      background: transparent;
      color: #222;
      padding: 12px 24px;
      font-size: 1.5rem;
    }

    button {
      border: none;
      background: lawngreen;
      color: #fff;
    }

    .result {
      margin: 24px 0;
      font-size: 3rem;
      font-weight: 600;
    }
  </style>
</head>

<body>
  <form>
    <input type="number" name="x" placeholder="X">
    <select name="operator">
      <option>Pilih Operator</option>
      <option>Tambah</option>
      <option>Kurang</option>
      <option>Bagi</option>
      <option>Kali</option>
    </select>
    <input type="number" name="y" placeholder="Y">
    <button name="submit" value="submit">=</button>
  </form>

  <?php

  if (isset($_GET['submit'])) {
    $x = $_GET['x'];
    $y = $_GET['y'];
    $operator = $_GET['operator'];

    switch ($operator) {
      case 'Tambah':
        $result = $x + $y;
        break;
      case 'Kurang':
        $result = $x - $y;
        break;
      case 'Bagi':
        $result = $x / $y;
        break;
      case 'Kali':
        $result = $x * $y;
        break;
    }
  }
  ?>

  <h1 class="result"> = <?php echo $result; ?> </h1>
</body>

</html>