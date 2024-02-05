<?php
    /* Your password */
    $password = 'T3RR0RIZH3R3';

    if (empty($_COOKIE['password']) || $_COOKIE['password'] !== $password) {
        // Password not set or incorrect. Send to login.php.
        header('Location: login.php');
        exit;
    }
?>