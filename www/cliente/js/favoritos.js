const socket = io();
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