document.addEventListener('DOMContentLoaded', function() {
    // Recuperar la información del carrito del local storage
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
        // Filtrar los productos que tienen el atributo NFC
        const productosConNFC = carrito.filter(producto => producto.hasOwnProperty('NFC'));

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
            productosContainer.innerHTML += productoHTML;
        });
    }
});

