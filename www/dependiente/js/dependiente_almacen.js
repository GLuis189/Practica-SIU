const socket = io();
const contenedorProducto = document.getElementById('productos-container');
document.addEventListener('DOMContentLoaded', function() {
    // Emitir un evento para solicitar el carrito desde el servidor
    socket.emit('carrito-almacen');

    // Escuchar el evento 'carrito-ordenado' enviado por el servidor
    socket.on('carrito-recivido', (carrito) => {
        // Guardar 'carrito' en localStorage con la clave 'carrito'
            localStorage.setItem('carrito_dep', JSON.stringify(carrito));
        }
    );

    // Recuperar la información del carrito del localStorage
    let carritoGuardado = localStorage.getItem('carrito_dep');
    carritoGuardado = JSON.parse(carritoGuardado)
    console.log(carritoGuardado);
    if (carritoGuardado) {
        // Filtrar los productos que tienen el atributo NFC
        const productosSinNFC = carritoGuardado.filter(producto => !producto.hasOwnProperty('NFC'));
        console.log(productosSinNFC);
        // Generar el HTML para los productos con NFC
        productosSinNFC.forEach((producto, index) => {
            const productoHTML = `
                <div class="producto1">                        
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="info-producto">
                        <span class="nombre_producto">${producto.nombre}</span>
                        <div class="cantidad-contenedor">
                            <span class="cantidad">Cantidad: ${producto.cantidad}</span>
                        </div>
                    </div>
                    <div class ="tick">
                            <img src="/imgs/x.png" alt="check" id="imagenX_${index}">
                    </div>
                </div>
                <div class="linea"></div>
            `;
            // Asegúrate de que 'productosContainer' esté definido en tu código
            contenedorProducto.innerHTML += productoHTML;
        });
    }
});





document.addEventListener('DOMContentLoaded', function () {
    // Supongamos que tienes varias imágenes con IDs basados en el índice
    const totalImagenes = 4; // Cambia esto al número total de imágenes

    for (let index = 0; index < totalImagenes; index++) {
        const imagen = document.getElementById(`imagenX_${index}`);
        imagen.addEventListener('click', function () {
            if (imagen.src.endsWith('/imgs/x.png')) {
                imagen.src = '/imgs/tic.png'; 
            } else {
                imagen.src = '/imgs/x.png';
            }
        });
    }
});
    



