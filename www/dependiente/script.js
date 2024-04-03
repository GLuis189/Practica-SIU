document.getElementById('boton-log').addEventListener('click', function() {
    var contrasena = document.getElementById('contrasena').value;
    if (contrasena === '2222') {
        window.location.href = "home.html";
    } else {
        alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
        window.location.href = "../index.html";
    }
});
