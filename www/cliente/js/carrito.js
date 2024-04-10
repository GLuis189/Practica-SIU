const socket = io();
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
        let qrSection =  document.getElementById('qr');
        let carritoSection =  document.getElementById('carrito');
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
    document.getElementById('boton-pagar').addEventListener('click', function() {
        generarCodigoQR(); // Llamar a la función para generar el código QR cuando se hace clic en el botón de pagar
    });
});

var nav = document.querySelector("#nav1");
var abrir = document.querySelector("#abrir");
var cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

document.addEventListener('DOMContentLoaded', function() {
    // Obtiene una referencia al contenedor de productos
    const contenedorProductos = document.querySelector('.contenedor_productos');

    let xInicial; // Variable para almacenar la posición inicial del toque

    // Variable para almacenar si se está eliminando el producto
    let eliminandoProducto = false;

    // Variable para almacenar el desplazamiento actual del producto
    let desplazamientoActual = 0;

    // Agrega un evento de escucha para el inicio del toque en el contenedor de productos
    contenedorProductos.addEventListener('touchstart', function(event) {
        // Si ya se está eliminando un producto, no hacer nada
        if (eliminandoProducto) return;

        // Obtén la posición inicial del toque
        xInicial = event.touches[0].clientX;

        // Almacenar el desplazamiento actual del producto
        desplazamientoActual = 0;
    });

    // Agrega un evento de escucha para el movimiento del toque en el contenedor de productos
    contenedorProductos.addEventListener('touchmove', function(event) {
        // Si ya se está eliminando un producto, no hacer nada
        if (eliminandoProducto) return;

        // Calcular el desplazamiento actual
        const desplazamiento = event.touches[0].clientX - xInicial;

        // Actualizar el desplazamiento actual del producto
        desplazamientoActual = desplazamiento;

        // Aplicar transformación para el deslizamiento parcial
        event.target.style.transform = `translateX(${desplazamiento}px)`;
    });

    // Agrega un evento de escucha para el final del toque en el contenedor de productos
    contenedorProductos.addEventListener('touchend', function(event) {
        // Si ya se está eliminando un producto, no hacer nada
        if (eliminandoProducto) return;

        // Si el desplazamiento actual es suficiente para considerarse un deslizamiento hacia la izquierda
        if (desplazamientoActual < -50) {
            // Encuentra el contenedor del producto correspondiente al deslizamiento
            const producto = event.target.closest('.producto1');

            if (producto) {
                // Preguntar al usuario si quiere eliminar el producto
                if (confirm("¿Seguro que deseas eliminar este producto?")) {
                    // Marcar que se está eliminando el producto
                    eliminandoProducto = true;

                    // Aplicar las clases CSS para la animación de deslizamiento
                    producto.style.transition = 'transform 0.3s ease';
                    producto.style.transform = 'translateX(-100%)';

                    // Esperar a que termine la animación antes de eliminar el producto
                    setTimeout(function() {
                        // Eliminar el producto del DOM después de la animación
                        producto.remove();
                        // Restablecer la eliminación del producto y el estilo de transformación
                        eliminandoProducto = false;
                        producto.style.transition = '';
                    }, 300); // Tiempo de la animación en milisegundos
                } else {
                    // Si el usuario cancela, volver al estado inicial
                    event.target.style.transform = 'translateX(0)';
                }
            }
        } else {
            // Si el desplazamiento no fue suficiente, volver al estado inicial
            event.target.style.transform = 'translateX(0)';
        }
    });
});



