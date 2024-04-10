const socket = io();

addEventListener("load", function(){
    const mensajeDiv = document.getElementById('mensaje');
    const productoEncontrado = JSON.parse(localStorage.getItem('productoEncontrado'));
    if (productoEncontrado) {
        console.log('Tipo de producto encontrado:', typeof productoEncontrado);
        console.log('Producto encontrado en producto.html:', productoEncontrado);
        mostrarProductoEnHTML(productoEncontrado);
    } 
    // Eliminar la información del producto del almacenamiento local después de usarla
    localStorage.removeItem('productoEncontrado');
});

addEventListener("load", function(){
    const nfc = localStorage.getItem("nfc");
    enviarIDAlServidor(nfc);
    localStorage.removeItem("nfc");
})

function enviarIDAlServidor(id) {
    console.log('ID producto:', id); 
    socket.emit('id', id); 
}
socket.on('producto-micro-producto-encontrado', function(producto) {
    console.log('Producto encontrado:', producto);
    mostrarProductoEnHTML(producto);
});
// Escuchar evento 'producto-encontrado' del servidor
socket.on('producto-encontrado', function(producto) {
    console.log('Producto encontrado:', producto);
    mostrarProductoEnHTML(producto);
});

// Escuchar evento 'producto-no-encontrado' del servidor(ERROR)
socket.on('producto-no-encontrado', function(mensaje) {
    console.log('Producto no encontrado:', mensaje);
    mostrarMensajeErrorEnHTML(mensaje);
});

function generarEstrellas(valoracion) {
    let estrellasHTML = '';
    // Generar estrellas según la valoración
    for (let i = 0; i < valoracion; i++) {
        estrellasHTML += '<img class="estrella" src="../../imgs/estrella.png" alt="Estrella">';
    }
    // Generar estrellas blancas para completar hasta llegar a 5
    for (let i = valoracion; i < 5; i++) {
        estrellasHTML += '<img class="estrella" src="../../imgs/estrella_blanca.png" alt="Estrella blanca">';
    }
    return estrellasHTML;
}


function mostrarProductoEnHTML(producto) {
    console.log('Producto', producto)
    const contenedorProducto = document.getElementById('tarjeta');
    console.log(typeof producto.tipo);
    console.log(producto.tipo);
    if (producto.tipo == "ropa") {
        const estrellasHTML = generarEstrellas(producto.valoracion); // Generar las estrellas
        const productoHTML = `
            <div class="producto">  
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="contenedor-acept-no">
                    <h3>Cancelar</h3>
                    <div class="flechas">
                        <img src="../../imgs/flecha_izq.png">
                        <img src="../../imgs/flecha_dcha.png">
                    </div>
                    <h3>Agregar al carrito</h3>
                </div>
            </div>
            <div class="info-producto">
                <span class="cantidad">Cantidad: ${producto.tallas}</span>
                <span class="stock">Stock: ${producto.stock}</span>
                <span class="precio">Precio: ${producto.precio}</span>
                <span class="precio">Puntuación:</span>
                <div class="valoracion">${estrellasHTML}</div> 
            </div>
        `;
        contenedorProducto.innerHTML = productoHTML;
    }
    if (producto.tipo=="hogar" || producto.tipo=="electronica"){
        const estrellasHTML = generarEstrellas(producto.valoracion); // Generar las estrellas
        const productoHTML = `
            <div class="producto">  
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="contenedor-acept-no">
                    <h3>Cancelar</h3>
                    <div class="flechas">
                        <img src="../../imgs/flecha_izq.png">
                        <img src="../../imgs/flecha_dcha.png">
                    </div>
                    <h3>Agregar al carrito</h3>
                </div>
            </div>
            <div class="info-producto">
                <span class="stock">Stock: ${producto.stock}</span>
                <span class="precio">Precio: ${producto.precio}</span>
                <span class="precio">Puntuación:</span>
                <div class="valoracion">${estrellasHTML}</div> 
            </div>
        `;
        contenedorProducto.innerHTML = productoHTML;
    }
}


// Esta es una función de ejemplo para mostrar el mensaje de error en el HTML
function mostrarMensajeErrorEnHTML(mensaje) {
    console.log('Error al enviar el producto.')
}

document.addEventListener('DOMContentLoaded', function () {
    const contenedorLupa = document.getElementById('contenedor-lupa');
    const Lupa = document.getElementById('lupa-barra');
    const contenedorBuscador = document.querySelector('.contenedor-buscador');
    const logoLetras = document.querySelector('.logo_letras');
    const logoMenu = document.querySelector('.logo_menu');

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
            contenedorLupa.style.display = 'block';
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