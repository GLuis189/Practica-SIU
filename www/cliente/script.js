
const botonInicioSesion = document.getElementById('boton-inicio-sesion-menu');
const botonRegistro = document.getElementById('boton-registro');
const botonHome = document.getElementById('boton-log');
const botonHome2 = document.getElementById('boton-home');
const seccionMenuCliente = document.getElementById('menu_cliente');
const seccionInicioSesion = document.getElementById('inicio_sesion');
const seccionRegistro = document.getElementById('registro');
const seccionHome = document.getElementById('home');

botonInicioSesion.addEventListener('click', function() {
    seccionMenuCliente.style.display = 'none';
    seccionInicioSesion.style.display = 'block';
    seccionRegistro.style.display = 'none';
    seccionHome.style.display = 'none';
});

botonRegistro.addEventListener('click', function() {
    seccionRegistro.style.display = 'block';
    seccionInicioSesion.style.display = 'none';
    seccionMenuCliente.style.display = 'none';
    seccionHome.style.display = 'none';
});

botonHome.addEventListener('click', function() {
    seccionRegistro.style.display = 'none';
    seccionInicioSesion.style.display = 'none';
    seccionMenuCliente.style.display = 'none';
    seccionHome.style.display = 'block';
});

document.getElementById('boton-home').addEventListener('click', function() {
    var checkbox = document.getElementById('check');
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var usuario = document.getElementById('usuario').value;
    var contraseña = document.getElementById('contraseña').value;
    
    if (!checkbox.checked) {
        alert('Debes aceptar las condiciones de uso para poder registrarte.');
    } else if (!nombre || !email || !usuario || !contraseña) {
        alert('Todos los campos deben estar llenos para poder registrarte.');
    } else {
        seccionRegistro.style.display = 'none';
        seccionInicioSesion.style.display = 'none';
        seccionMenuCliente.style.display = 'none';
        seccionHome.style.display = 'block';
    }
});


