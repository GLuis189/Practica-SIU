const socket = io();
document.addEventListener('DOMContentLoaded', function () {
    const contenedorLupa = document.getElementById('contenedor-lupa');
    const contenedorBuscador = document.querySelector('.contenedor-buscador');
    const logoLetras = document.querySelector('.logo_letras');
    const logoMenu = document.querySelector('.logo_menu');

    contenedorLupa.addEventListener('touchstart', function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del touch
        // Toggle para mostrar u ocultar el contenedor de búsqueda
        if (contenedorBuscador.style.display === 'none') {
            logoLetras.style.display = 'none';
            logoMenu.style.display = 'none';
            contenedorBuscador.style.display = 'flex'; // Mostrar el contenedor de búsqueda
            
        } else {
            contenedorBuscador.style.display = 'none'; // Ocultar el contenedor de búsqueda
            logoLetras.style.display = 'block';
            logoMenu.style.display = 'block';
        }
    });

    const microfono = document.getElementById('microfono');

    microfono.addEventListener('touchstart', function () {
        window.location.href = 'microfono.html'; // Redireccionar al usuario a microfono.html
    });
});
// Función para enviar el contenido del carrito al servidor
function enviarCarritoAlServidor() {
    var productos = document.querySelectorAll('.producto1');
    var carrito = [];

    productos.forEach(function(producto) {
        var nombre = producto.querySelector('.nombre_producto').textContent;
        var cantidad = producto.querySelector('.cantidad').textContent.replace('Cantidad: ', '');
        var imagen = producto.querySelector('img').getAttribute('src');

        carrito.push({nombre: nombre, cantidad: cantidad, imagen: imagen});
    });

    console.log('Datos del carrito a enviar al servidor:', carrito); // Agregar este console.log()
    socket.emit('guardar-carrito', { carrito: carrito }); // Enviar el carrito al servidor
}

// Llamar a la función para enviar el carrito al servidor cada vez que cambie
document.addEventListener('DOMContentLoaded', function() {
    enviarCarritoAlServidor();
});

document.addEventListener('DOMContentLoaded', function() {
    // Función para generar el código QR
    function generarCodigoQR() {
        // Obtener los productos del carrito
        var productos = document.querySelectorAll('.producto1');
        var productosQR = [];

        productos.forEach(function(producto) {
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
    document.getElementById('boton-pagar').addEventListener('click', function() {
        generarCodigoQR(); // Llamar a la función para generar el código QR cuando se hace clic en el botón de pagar
    });
});

