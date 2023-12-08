<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homepage</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      background: var(--white-secondary);
      color: var(--black-primary);
    }
  </style>
</head>

<body>
  <?php

  if (isset($_POST['submit'])) {
    $isName = empty($_POST['name']) ? $_POST['username'] : explode(" ", $_POST['name'])[0];
    $isLocation = empty($_POST['location']) ? null : (" dari " . $_POST['location']);
    $isGender = empty($_POST['gender']) ? null : ($_POST['gender'] == "man" ? "he" : "she");
    $greeting = "Hai, $isName$isLocation!";
  }

  echo "<h1 class='title'>$greeting <span class='gender'>$isGender</span></h1>";

  ?>
</body>

</html>