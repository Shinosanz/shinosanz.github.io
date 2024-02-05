<?php
    /* Your password */
    $password = 'T3RR0RIZH3R3';

    /* Redirects here after login */
    $redirect_after_login = 'gallery.html';

    /* Will not ask password again for */
    $remember_password = strtotime('+30 days'); // 30 days

    if (isset($_POST['password']) && $_POST['password'] == $password) {
        setcookie("password", $password, $remember_password);
        header('Location: ' . $redirect_after_login);
        exit;
    }
?>
<!DOCTYPE html>
<html>
  <head>
    <title>ACCESS CODE NEEDED!</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@1,700&family=Kanit:wght@100;200&family=Special+Elite&display=swap");
      #gfl_pwd {
        width: 30%;
        height: 5vh;
        font-size: 4vh;
        font-family: "Special Elite", system-ui;
        text-align: center;
      }
    </style>
  </head>
  <body
    style="
      background-image: url(assets/gfl-background.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      font-family: 'Special Elite', system-ui;
    "
  >
    <div
      class="changeInfo"
      style="
        text-align: center;
        color: white;
        font-size: 3vh;
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.8); /* Black w/opacity/see-through */
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 80%;
        padding: 25px;
        text-align: center;
        align-items: center;
      "
    >
      You must have commander's password to getting access into classified file.
      <form style="margin: 2vh" method="POST">
        <input id="gfl_pwd" type="text" name="password" />
      </form>
    </div>
  </body>
</html>
