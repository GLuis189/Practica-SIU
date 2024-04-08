document.addEventListener('DOMContentLoaded', function() {
    // Recuperar la información del carrito del local storage
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const productosContainer = document.getElementById('productosContainer');

    // Construir la estructura HTML para cada producto
    carrito.forEach(producto => {
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
});

