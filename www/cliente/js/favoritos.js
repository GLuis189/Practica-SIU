const socket = io();

// Buscador
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
    const productoString = localStorage.getItem('favCarrito');

    if (productoString) {
        // Convertir la cadena JSON de vuelta a un objeto JavaScript
        const productos = JSON.parse(productoString);
        console.log("holaaa", productos);
        const contenedorProductos = document.getElementById('contenedor_productos');
        contenedorProductos.innerHTML = '';
        if (productos != null){
            // Iterar sobre el array de productos y mostrar cada uno
            productos.forEach(producto => {
            mostrarProductoHTML(producto);
            });
        }
    }
    contenedorLupa.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // Mostrar/ocultar el buscador
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
        // Mostrar/ocultar el buscador
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

    // Al hacer click sobre el microfono te redirige a esa página para poder buscar el producto por voz
    microfono.addEventListener('touchstart', function () {
        window.location.href = '../html/microfono.html'; 
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

function reordenarContenedores(lista, contenedorMovido, direccionMovimiento) {
    const contenedorProductos = document.getElementById('contenedor_productos');
    const nombreProductoMovido = contenedorMovido.querySelector('.nombre_producto').textContent;
    const indexMovido = lista.indexOf(nombreProductoMovido);
    let indexTarget = indexMovido + direccionMovimiento;
    if (indexTarget < 0) {
        indexTarget = 0;
    }
    if (indexTarget >= lista.length) {
        indexTarget = lista.length - 1;
    }
    console.log(indexTarget);
    console.log(indexMovido);
    lista.splice(indexMovido, 1);
    lista.splice(indexTarget, 0, nombreProductoMovido);
    console.log("Lista de nombres reordenada:", lista);
    socket.emit('lista-nombres-fav', lista);
    socket.on('carrito-ordenado-fav', (carrito) => {
        console.log('Carrito actualizado recibido:', carrito);
        contenedorProductos.innerHTML = '';
        // Iterar sobre el array de productos y mostrar cada uno
        console.log(typeof (carrito));
        const carritoString = JSON.stringify(carrito);

        // Guardar 'carritoString' en localStorage con la clave 'producto'
        localStorage.setItem('favCarrito', carritoString);

        if (typeof carrito === 'object' && carrito !== null) {
            // Recorrer el objeto 'carrito' utilizando un bucle for...in
            total = 0;
            for (const key in carrito) {
                if (carrito.hasOwnProperty(key)) {
                    const producto = carrito[key];
                    // Mostrar el producto en la consola
                    console.log('Nombre del producto:', producto.nombre);
                    console.log('Cantidad:', producto.cantidad);
                    mostrarProductoHTML(producto);
                }

            }

        } else {
            console.log('El carrito recibido no es un objeto válido.');
            eliminandoProducto = false;
        }
    });
}

function mostrarProductoHTML(producto) {
    console.log("productoooo", producto);
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
    imgProducto.src = producto.imagen;
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

document.addEventListener('DOMContentLoaded', function () {

    const contenedorProductos = document.getElementById('contenedor_productos');
    let xInicial;
    let contenedorProducto;
    let eliminandoProducto = false;
    let desplazamientoActual = 0;
    let touchStartY;
    let touchStartTime;
    let currentTouchMoveY;
    let touchMoveStarted = false;
    const contenedores = contenedorProductos.querySelectorAll('.producto');
    let lista = [];
    contenedores.forEach(contenedor => {
        // Obtener el nombre del producto del contenedor actual
        const nombreProducto = contenedor.querySelector('.nombre_producto').textContent;
        lista.push(nombreProducto);
        console.log('Nombre del producto:', nombreProducto);
    });
    contenedorProductos.addEventListener('touchstart', function (event) {
        if (eliminandoProducto) return;
        xInicial = event.touches[0].clientX;
        contenedorProducto = event.target.closest('.producto');
        desplazamientoActual = 0;
        touchStartY = event.touches[0].clientY;
        touchStartTime = new Date().getTime();
        currentTouchMoveY = touchStartY;
        touchMoveStarted = false;
    });
    contenedorProductos.addEventListener('touchmove', function (event) {
        if (eliminandoProducto || !contenedorProducto) return;
        const desplazamiento = event.touches[0].clientX - xInicial;
        desplazamientoActual = desplazamiento;
        contenedorProducto.style.transition = 'none';
        contenedorProducto.style.transform = `translateX(${desplazamiento}px)`;
        currentTouchMoveY = event.touches[0].clientY;
        touchMoveStarted = true;
    });
    contenedorProductos.addEventListener('touchend', function (event) {
        const touchEndTime = new Date().getTime();
        const touchDuration = touchEndTime - touchStartTime;
        const touchDistance = currentTouchMoveY - touchStartY;
        if (eliminandoProducto || !contenedorProducto) return;
        const nombreProducto = contenedorProducto.querySelector('.nombre_producto').textContent;
        if (touchDuration >= 3000 && touchMoveStarted) {
            console.log("Mantenido pulsado durante 3 segundos");
            const contenedorMovido = event.target.closest('.producto');
            console.log(contenedorMovido);
            const alturaContenedor = contenedorMovido.offsetHeight;
            const direccionMovimiento = Math.round(touchDistance / alturaContenedor);
            reordenarContenedores(lista, contenedorMovido, direccionMovimiento);
        }
        if (desplazamientoActual < -50) {
            if (confirm("¿Seguro que deseas eliminar este producto?")) {
                eliminandoProducto = true;
                contenedorProducto.style.transition = 'transform 0.3s ease';
                const nombreProducto = contenedorProducto.querySelector('.nombre_producto').textContent;
                contenedorProducto.style.transform = 'translateX(-100%)';
                contenedorProducto.addEventListener('transitionend', function () {
                    contenedorProducto.remove();
                    eliminandoProducto = false;

                }, { once: true });
                socket.emit('fav-carritoeliminar', nombreProducto);
                socket.on('fav-eliminado', (carrito) => {
                    // Aquí puedes manejar el carrito actualizado recibido desde el servidor
                    console.log('Carrito actualizado recibido:', carrito);
                    contenedorProductos.innerHTML = '';
                    // Iterar sobre el array de productos y mostrar cada uno
                    console.log(typeof (carrito));
                    const carritoString = JSON.stringify(carrito);

                    // Guardar 'carritoString' en localStorage con la clave 'producto'
                    localStorage.setItem('favCarrito', carritoString);

                    if (typeof carrito === 'object' && carrito !== null) {
                        // Recorrer el objeto 'carrito' utilizando un bucle for...in
                        total=0;
                        for (const key in carrito) {
                            if (carrito.hasOwnProperty(key)) {
                                const producto = carrito[key];
                                // Mostrar el producto en la consola
                                console.log('Nombre del producto:', producto.nombre);
                                console.log('Cantidad:', producto.cantidad);

                                // Mostrar el producto en la interfaz de usuario
                                mostrarProductoHTML(producto);
                                eliminandoProducto = false;
                            }

                        }
                        // Actualiza el contenido de la etiqueta span con la clase "total"
                        document.querySelector('.total').nextElementSibling.textContent = total.toFixed(2) + '€';
                        localStorage.setItem('total', total);
                    } else {
                        console.log('El carrito recibido no es un objeto válido.');
                        eliminandoProducto = false;
                    }
                });
            } else {
                contenedorProducto.style.transition = 'transform 0.3s ease';
                contenedorProducto.style.transform = 'translateX(0)';
                eliminandoProducto = false;
            }
        } else {
            contenedorProducto.style.transition = 'transform 0.3s ease';
            contenedorProducto.style.transform = 'translateX(0)';
            eliminandoProducto = false;
        }
    });
});