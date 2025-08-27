<?php
session_start();

$USER = "admin";
$PASS = "12345"; // cámbialo

if (isset($_POST['user']) && isset($_POST['pass'])) {
    if ($_POST['user'] === $USER && $_POST['pass'] === $PASS) {
        $_SESSION['logged'] = true;
    } else {
        echo "<p style='color:red'>Usuario o contraseña incorrectos</p>";
    }
}

if (!isset($_SESSION['logged'])) {
?>
    <form method="post">
        <h2>Login Admin</h2>
        <input type="text" name="user" placeholder="Usuario" required><br><br>
        <input type="password" name="pass" placeholder="Contraseña" required><br><br>
        <button type="submit">Entrar</button>
    </form>
<?php
    exit;
}
?>
