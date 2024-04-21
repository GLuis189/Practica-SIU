const socket = io();
let numero_prod = 0;
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
            numero_prod = numero_prod + 1;
            console.log('numero-prod', numero_prod);
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

let tics;
document.addEventListener('DOMContentLoaded', function () {
    // Supongamos que tienes varias imágenes con IDs basados en el índice
    const totalImagenes = numero_prod; // Cambia esto al número total de imágenes

    for (let index = 0; index < totalImagenes; index++) {
        const imagen = document.getElementById(`imagenX_${index}`);
        imagen.addEventListener('click', function () {
            if (imagen.src.endsWith('/imgs/x.png')) {
                imagen.src = '/imgs/tic.png';
                if (tics){
                    tics = tics + 1;
                }else{
                    tics = 1;
                }
                console.log('tics', tics);
                if (numero_prod === tics) {
                    console.log('mas tics', tics);
                    socket.emit('listo', 'listo');
                    localStorage.removeItem('carrito_dep');
                    window.location.href = '../html/pedido_procesado_almacen.html';
                }
            } else {
                imagen.src = '/imgs/x.png';
                if (tics <= 1){
                    tics = 0;
                }else{
                    tics = tics - 1;
                }
                console.log('tics', tics);
            }
        });
    }
});





