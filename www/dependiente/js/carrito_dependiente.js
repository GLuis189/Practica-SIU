const productosContainer = document.getElementById('productosContainer');
let total = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar la información del carrito del local storage
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
        // document.getElementById('productosContainer').innerText = carrito;
        console.log('Información del carrito:', carrito);
        console.log('Tipo de dato:', typeof carrito);
        carrito = JSON.parse(carrito);
        carrito.forEach(producto => {
            console.log('producto-precio', producto.precio)
            total = producto.total;
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
    document.querySelector('.total').nextElementSibling.textContent = total.toFixed(2) + '€';
    localStorage.setItem('total', total);

    const microfono = document.getElementById('microfono');

    microfono.addEventListener('touchstart', function () {
        window.location.href = '../../cliente/html/microfono.html'; // Redireccionar al usuario a microfono.html
    });
});

