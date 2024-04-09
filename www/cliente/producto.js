const socket = io();
addEventListener("load", function(){
    const nfc = localStorage.getItem("nfc");
    enviarIDAlServidor(nfc);
})

function enviarIDAlServidor(id) {
    console.log('ID producto:', id); 
    socket.emit('id', id); 
}

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
// Crear una variable para almacenar las imágenes de estrellas
let estrellasHTML = '';

// Bucle para agregar las imágenes de estrellas según la valoración del producto
for (let i = 0; i < producto.valoracion; i++) {
    estrellasHTML += '<img src="../imgs/estrella.png" alt="Estrella">';
}

// Calcular el número de estrellas en blanco (5 - valoración)
const estrellasBlancas = 5 - producto.valoracion;

// Agregar las imágenes de estrellas blancas
for (let i = 0; i < estrellasBlancas; i++) {
    estrellasHTML += '<img src="../imgs/estrella_blanca.png" alt="Estrella blanca">';
}

// Esta es una función de ejemplo para mostrar el producto en el HTML
function mostrarProductoEnHTML(producto) {
    console.log('Producto', producto)
    const contenedorProducto = document.getElementById('tarjeta');
    console.log(typeof producto.tipo);
    console.log( producto.tipo);
    if(producto.tipo =="ropa"){
        const productoHTML = `
                <div class="producto">  
                    <h2>${producto.nombre}</h2>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="contenedor-acept-no">
                        <h3>Cancelar</h3>
                        <div class="flechas">
                            <img src="../imgs/flecha_izq.png">
                            <img src="../imgs/flecha_dcha.png">
                        </div>
                        <h3>Agregar al carrito</h3>
                    </div>
                </div>
                <div class="info-producto">
                        <span class="cantidad">Cantidad: ${producto.tallas}</span>
                        <span class="stock">Stock: ${producto.stock}</span>
                        <span class="precio">Precio: ${producto.precio}</span>
                        <div class="valoracion">${estrellasHTML}</div> 
                </div>
            `;
        contenedorProducto .innerHTML += productoHTML;
    }
    if (producto.tipo == "electronica"){
        
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
        window.location.href = 'microfono.html'; // Redireccionar al usuario a microfono.html
    });
});