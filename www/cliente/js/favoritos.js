const socket = io();
document.addEventListener('DOMContentLoaded', function () {
    const contenedorLupa = document.getElementById('contenedor-lupa');
    const Lupa = document.getElementById('lupa-barra');
    const contenedorBuscador = document.querySelector('.contenedor-buscador');
    const logoLetras = document.querySelector('.logo_letras');
    const logoMenu = document.querySelector('.contenedor-menu');
    let totalRecuperado = localStorage.getItem('total');

    if (totalRecuperado !== null) {
        document.querySelector('.total').nextElementSibling.textContent = parseFloat(totalRecuperado).toFixed(2) + '€';
    } else {
        console.log('No se encontró ningún total en el localStorage.');
    }
    const productoString = localStorage.getItem('favoritos');

    if (productoString) {
        // Convertir la cadena JSON de vuelta a un objeto JavaScript
        const productos = JSON.parse(productoString);
        console.log("holaaa", productos);
        const contenedorProductos = document.getElementById('contenedor_productos');
        contenedorProductos.innerHTML = '';
        if (productos != null){
            // Iterar sobre el array de productos y mostrar cada uno
            productos.forEach(producto => {
            mostrarProductoEnHTML(producto);
            });
        }
    }

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
// En lugar de simplemente agregar y quitar la clase "visible", ahora vamos a usar JavaScript para cambiar esa clase
var nav = document.querySelector("#nav1");
var abrir = document.querySelector("#abrir");
var cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

function mostrarProductoHtml(producto) {
    const contenedorProductos = document.getElementById('contenedor_productos');

    // Crear elementos HTML para representar el producto
    const divLinea = document.createElement('div');
    divLinea.classList.add('linea');
    contenedorProductos.appendChild(divLinea);

    const divProducto = document.createElement('div');
    divProducto.id = `producto${producto.id}`;
    divProducto.classList.add('producto');
    contenedorProductos.appendChild(divProducto);

    const imgProducto = document.createElement('img');
    imgProducto.src = producto.imagenUrl;
    imgProducto.alt = producto.nombre;
    divProducto.appendChild(imgProducto);

    const divInfoProducto = document.createElement('div');
    divInfoProducto.classList.add('info-producto');
    divProducto.appendChild(divInfoProducto);

    const spanNombreProducto = document.createElement('span');
    spanNombreProducto.classList.add('nombre_producto');
    spanNombreProducto.textContent = producto.nombre;
    divInfoProducto.appendChild(spanNombreProducto);

    const imgFavorito = document.createElement('img');
    imgFavorito.classList.add('favorito');
    imgFavorito.src = "../../imgs/corazon (1) 1.png";
    imgFavorito.alt = "favorito";
    divInfoProducto.appendChild(imgFavorito);
}

document.addEventListener('DOMContentLoaded', function() {
    
    const contenedorProductos = document.querySelector('.contenedor_productos');

    let xInicial; 
    let contenedorProducto; 

    
    let eliminandoProducto = false;

    
    let desplazamientoActual = 0;

    
    contenedorProductos.addEventListener('touchstart', function(event) {
        
        if (eliminandoProducto) return;

        
        xInicial = event.touches[0].clientX;

        
        contenedorProducto = event.target.closest('.producto1');

        
        desplazamientoActual = 0;
    });

    
    contenedorProductos.addEventListener('touchmove', function(event) {
        
        if (eliminandoProducto || !contenedorProducto) return;

        
        const desplazamiento = event.touches[0].clientX - xInicial;

       
        desplazamientoActual = desplazamiento;

        
        contenedorProducto.style.transition = 'none'; 
        contenedorProducto.style.transform = `translateX(${desplazamiento}px)`;
    });


    contenedorProductos.addEventListener('touchend', function(event) {

        if (eliminandoProducto || !contenedorProducto) return;

        
        if (desplazamientoActual < -50) {

            if (confirm("¿Seguro que deseas eliminar este producto?")) {
                eliminandoProducto = true;
                contenedorProducto.style.transition = 'transform 0.3s ease'; 
                contenedorProducto.style.transform = 'translateX(-100%)';
                contenedorProducto.addEventListener('transitionend', function() {                   
                    contenedorProducto.remove();          
                    eliminandoProducto = false;
                }, { once: true }); 
            } else {

                contenedorProducto.style.transition = 'transform 0.3s ease';
                contenedorProducto.style.transform = 'translateX(0)';
            }
        } else {
            
            contenedorProducto.style.transition = 'transform 0.3s ease'; 
            contenedorProducto.style.transform = 'translateX(0)';
        }
    });
});