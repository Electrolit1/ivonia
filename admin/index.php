<?php
session_start();

// Usuario y contraseña
$USER = "Ivonia";
$PASS = "adminivonia123";

// Login
if (isset($_POST['user']) && isset($_POST['pass'])) {
    if ($_POST['user'] === $USER && $_POST['pass'] === $PASS) {
        $_SESSION['logged'] = true;
    } else {
        echo "<p style='color:red'>Usuario o contraseña incorrectos</p>";
    }
}

// Si no está logueado → mostrar formulario
if (!isset($_SESSION['logged'])) {
?>
    <form method="post" style="margin:50px; font-family:sans-serif;">
        <h2>Login Admin</h2>
        <input type="text" name="user" placeholder="Usuario" required><br><br>
        <input type="password" name="pass" placeholder="Contraseña" required><br><br>
        <button type="submit">Entrar</button>
    </form>
<?php
    exit;
}
?>

<h2>IPs de visitantes</h2>
<pre style="background:#111; color:#0f0; padding:10px;">
<?php
    if (file_exists("visitas.txt")) {
        echo htmlspecialchars(file_get_contents("visitas.txt"));
    } else {
        echo "Aún no hay visitas registradas.";
    }
?>
</pre>
