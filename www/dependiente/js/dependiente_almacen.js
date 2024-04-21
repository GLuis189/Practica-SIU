const socket = io();

document.addEventListener('DOMContentLoaded', function() {
    // Supongo que ya tienes configurado el objeto 'socket'

    // Emitir un evento para solicitar el carrito desde el servidor
    socket.emit('carrito-almacen');

    // Escuchar el evento 'carrito-ordenado' enviado por el servidor
    socket.on('carrito-ordenado', (carrito) => {
        // Guardar 'carrito' en localStorage con la clave 'carrito'
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    );

    // Recuperar la información del carrito del localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        // Filtrar los productos que tienen el atributo NFC
        const productosConNFC = carritoGuardado.filter(producto => producto.hasOwnProperty('NFC'));

        // Generar el HTML para los productos con NFC
        productosConNFC.forEach(producto => {
            const productoHTML = `
                <div class="producto1">                        
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="info-producto">
                        <span class="nombre_producto">${producto.nombre}</span>
                        <div class="cantidad-contenedor">
                            <span class="cantidad">Cantidad: ${producto.cantidad}</span>
                        </div>
                    </div>
                </div>
                <div class="linea"></div>
            `;
            // Asegúrate de que 'productosContainer' esté definido en tu código
            productosContainer.innerHTML += productoHTML;
        });
    }
});

    



