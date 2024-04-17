const socket = io();

document.addEventListener('DOMContentLoaded', function () {
    console.log("llamando a función");
    comprobarCarrito();
});
document.addEventListener('DOMContentLoaded', function () {
    const contenedorLupa = document.getElementById('contenedor-lupa');
    const Lupa = document.getElementById('lupa-barra');
    const contenedorBuscador = document.querySelector('.contenedor-buscador');
    const logoLetras = document.querySelector('.logo_letras');
    const logoMenu = document.querySelector('.contenedor-menu');

    contenedorLupa.addEventListener('touchstart', function (event) {
        event.preventDefault();
        if (contenedorBuscador.style.display === 'none') {
            logoLetras.style.display = 'none';
            logoMenu.style.display = 'none';
            contenedorLupa.style.display = 'none';
            contenedorBuscador.style.display = 'flex';
        } else {
            contenedorBuscador.style.display = 'none';
            logoLetras.style.display = 'block';
            logoMenu.style.display = 'block';
            contenedorLupa.style.display = 'block';
        }
    });
    Lupa.addEventListener('touchstart', function (event) {
        event.preventDefault();
        if (Lupa.style.display === 'block') {
            logoLetras.style.display = 'block';
            logoMenu.style.display = 'block';
            contenedorLupa.style.display = '';
            contenedorBuscador.style.display = 'none';
        } else {
            Lupa.style.display = 'block';
            logoLetras.style.display = 'none';
            logoMenu.style.display = 'none';
            contenedorLupa.style.display = 'none';
        }
    });

    const microfono = document.getElementById('microfono');

    microfono.addEventListener('touchstart', function () {
        window.location.href = '../html/microfono.html'; // Redireccionar al usuario a microfono.html
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Función para generar el código QR
    function generarCodigoQR() {
        // Obtener los productos del carrito
        var productos = document.querySelectorAll('.producto');
        var productosQR = [];

        productos.forEach(function (producto) {
            var nombre = producto.querySelector('.nombre_producto').textContent;
            var cantidad = producto.querySelector('.cantidad').textContent.replace('Cantidad: ', '');
            var imagen = producto.querySelector('img').getAttribute('src');

            productosQR.push({ nombre: nombre, cantidad: cantidad, imagen: imagen });
        });

        // Convertir los productos a formato de texto
        let textoProductos = JSON.stringify(productosQR);

        // Generar el código QR
        let qr = qrcode(0, 'L');
        qr.addData(textoProductos);
        qr.make();
        let qrSection = document.getElementById('qr');
        let carritoSection = document.getElementById('carrito');
        qrSection.style.display = 'block';
        carritoSection.style.display = 'none';
        // Obtener el elemento contenedor del código QR
        let qrCodeContainer = document.getElementById('qrCodeContainer');

        // Eliminar cualquier código QR anterior
        qrCodeContainer.innerHTML = '';

        // Insertar el código QR en el contenedor
        let qrImg = document.createElement('img');
        qrImg.src = qr.createDataURL(10); // Cambia el tamaño del código QR según lo necesites
        qrCodeContainer.appendChild(qrImg);
    }

    // Escuchar el evento clic del botón de pagar
    document.getElementById('boton-pagar').addEventListener('touchstart', function (event) {
        event.preventDefault();
        generarCodigoQR(); // Llamar a la función para generar el código QR cuando se hace clic en el botón de pagar
    });
});

// En lugar de simplemente agregar y quitar la clase "visible", ahora vamos a usar JavaScript para cambiar esa clase
var nav = document.querySelector("#nav1");
var abrir = document.querySelector("#abrir");
var cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});





