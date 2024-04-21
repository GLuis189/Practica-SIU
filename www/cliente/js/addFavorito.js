const socket = io();

document.addEventListener('DOMContentLoaded', function () {
    console.log("llamando a función");

    // Obtener los productos del local storage
    let producto_info = JSON.parse(localStorage.getItem('favoritos'));
    console.log(producto_info);

    mostrarHtml(producto_info);
});

// Función para mostrar los productos en el HTML
function mostrarHtml(producto) {
    const contenedorProductos = document.getElementById('producto');
    const botonsi = document.getElementById('boton-si');

    // Crear elementos HTML para representar el producto
    const h2Producto = document.createElement('h2');
    h2Producto.textContent = "Producto";
    contenedorProductos.appendChild(h2Producto);

    const divContenedorImg = document.createElement('div');
    divContenedorImg.id = "contenedor-img";
    contenedorProductos.appendChild(divContenedorImg);

    const imgProducto = document.createElement('img');
    imgProducto.classList.add('producto-img');
    imgProducto.src = producto.imagen;
    imgProducto.alt = "";
    divContenedorImg.appendChild(imgProducto);

    const imgCorazon = document.createElement('img');
    imgCorazon.classList.add('corazon-img');
    imgCorazon.src = "../../imgs/corazon (1) 1.png";
    imgCorazon.alt = "Corazon";
    divContenedorImg.appendChild(imgCorazon);

    const h3Pregunta = document.createElement('h3');
    h3Pregunta.classList.add('pregunta');
    h3Pregunta.textContent = "¿Quieres añadir este producto a favoritos?";
    contenedorProductos.appendChild(h3Pregunta);
    botonsi.addEventListener('touchstart', function() {
        console.log('¡Se hizo clic en el botón "Si"!');
        socket.emit('favoritos-anadir-producto', producto);
        socket.on('favoritos-carrito', function (producto) {
            console.log('Producto encontrado favvv:', producto);
            console.log(typeof producto );
            const productoString = JSON.stringify(producto);

            localStorage.setItem('favCarrito', productoString);
            window.location.href = 'favoritos.html'; 
        });
    });
}

// Buscador
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

    // Al hacer click sobre el microfono te redirige a esa página para poder buscar el producto por voz
    microfono.addEventListener('touchstart', function () {
        window.location.href = '../html/microfono.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para generar el código QR
    function generarCodigoQR() {
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

        let qrCodeContainer = document.getElementById('qrCodeContainer');

        // Eliminar cualquier código QR anterior
        qrCodeContainer.innerHTML = '';

        // Insertar el código QR en el contenedor
        let qrImg = document.createElement('img');
        qrImg.src = qr.createDataURL(10); 
        qrCodeContainer.appendChild(qrImg);
    }

    document.getElementById('boton-pagar').addEventListener('touchstart', function (event) {
        event.preventDefault();
        generarCodigoQR(); 
    });
});

// Mostrar y ocultar el menu hamburguesa
var nav = document.querySelector("#nav1");
var abrir = document.querySelector("#abrir");
var cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});





