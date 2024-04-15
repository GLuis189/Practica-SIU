const socket = io();

document.addEventListener('DOMContentLoaded', function () {
    console.log("llamando a función");
    comprobarCarrito();
});
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

function comprobarCarrito() {
    const productoString = localStorage.getItem('producto');

    if (productoString) {
        // Convertir la cadena JSON de vuelta a un objeto JavaScript
        const productos = JSON.parse(productoString);
        console.log("holaaa", productos);
        const contenedorProductos = document.getElementById('contenedor_productos');

        // Limpiar el contenedor antes de mostrar los nuevos productos
        contenedorProductos.innerHTML = '';
        if (productos != null){
            // Iterar sobre el array de productos y mostrar cada uno
            productos.forEach(producto => {
            mostrarProductoEnHTML(producto);
        });
        }
    } else {
        console.log('No se encontró ningún producto en el localStorage.');
    }
}

function mostrarProductoEnHTML(producto) {
    const contenedorProductos = document.getElementById('contenedor_productos');

    // Crear un nuevo elemento div para el producto
    const nuevoProducto = document.createElement('div');
    nuevoProducto.id = "producto" + producto.id;
    nuevoProducto.classList.add("producto");

    // Crear el elemento img y establecer su src y alt
    const imagenProducto = document.createElement('img');
    imagenProducto.src = producto.imagen;
    imagenProducto.alt = "Producto " + producto.id;

    // Crear el div para la información del producto
    const infoProducto = document.createElement('div');
    infoProducto.classList.add("info-producto");

    // Crear el span para el nombre del producto
    const nombreProducto = document.createElement('span');
    nombreProducto.classList.add("nombre_producto");
    nombreProducto.textContent = producto.nombre;

    // Crear el div para la cantidad del producto
    const cantidadContenedor = document.createElement('div');
    cantidadContenedor.classList.add("cantidad-contenedor");

    // Crear el span para mostrar la cantidad del producto
    const cantidadSpan = document.createElement('span');
    cantidadSpan.classList.add("cantidad");
    cantidadSpan.textContent = "Cantidad: ";

    // Crear el span para la cantidad específica del producto
    const cantidadProducto = document.createElement('span');
    cantidadProducto.id = "cantidadProducto";
    cantidadProducto.textContent = producto.cantidad;

    // Crear botones para aumentar y disminuir la cantidad
    const botonMas = document.createElement('button');
    botonMas.classList.add("boton-mas");
    botonMas.textContent = "+";

    const botonMenos = document.createElement('button');
    botonMenos.classList.add("boton-menos");
    botonMenos.textContent = "-";

    // Agregar los elementos creados al DOM
    cantidadContenedor.appendChild(cantidadSpan);
    cantidadContenedor.appendChild(cantidadProducto);
    cantidadContenedor.appendChild(botonMas);
    cantidadContenedor.appendChild(botonMenos);
    infoProducto.appendChild(nombreProducto);
    infoProducto.appendChild(cantidadContenedor);
    nuevoProducto.appendChild(imagenProducto);
    nuevoProducto.appendChild(infoProducto);
    contenedorProductos.appendChild(nuevoProducto);
    return;
}



document.addEventListener('DOMContentLoaded', function () {
    // Función para generar el código QR
    function generarCodigoQR() {
        // Obtener los productos del carrito
        var productos = document.querySelectorAll('.producto');
        var productosQR = [];

        productos.forEach(function (producto) {
            var nombre = producto.querySelector('.nombre_producto').textContent;
            var cantidad = producto.querySelector('.cantidad').textContent.replace('Cantidad: ', '');
            var imagen = producto.querySelector('img').getAttribute('src');

            productosQR.push({ nombre: nombre, cantidad: cantidad, imagen: imagen });
        });

        // Convertir los productos a formato de texto
        let textoProductos = JSON.stringify(productosQR);

        // Generar el código QR
        let qr = qrcode(0, 'L');
        qr.addData(textoProductos);
        qr.make();
        let qrSection = document.getElementById('qr');
        let carritoSection = document.getElementById('carrito');
        qrSection.style.display = 'block';
        carritoSection.style.display = 'none';
        // Obtener el elemento contenedor del código QR
        let qrCodeContainer = document.getElementById('qrCodeContainer');

        // Eliminar cualquier código QR anterior
        qrCodeContainer.innerHTML = '';

        // Insertar el código QR en el contenedor
        let qrImg = document.createElement('img');
        qrImg.src = qr.createDataURL(10); // Cambia el tamaño del código QR según lo necesites
        qrCodeContainer.appendChild(qrImg);
    }

    // Escuchar el evento clic del botón de pagar
    document.getElementById('boton-pagar').addEventListener('touch', function () {
        generarCodigoQR(); // Llamar a la función para generar el código QR cuando se hace clic en el botón de pagar
    });
});

// En lugar de simplemente agregar y quitar la clase "visible", ahora vamos a usar JavaScript para cambiar esa clase
var nav = document.querySelector("#nav1");
var abrir = document.querySelector("#abrir");
var cerrar = document.querySelector("#cerrar");

abrir.addEventListener("touch", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("touch", () => {
    nav.classList.remove("visible");
});


document.addEventListener('DOMContentLoaded', function () {

    const contenedorProductos = document.getElementById('contenedor_productos');
    let xInicial;
    let contenedorProducto;
    let eliminandoProducto = false;
    let desplazamientoActual = 0;
    const contenedores = contenedorProductos.querySelectorAll('.producto');

    contenedores.forEach(contenedor => {
        // Obtener el nombre del producto del contenedor actual
        const nombreProducto = contenedor.querySelector('.nombre_producto').textContent;
        console.log('Nombre del producto:', nombreProducto);
    });
    contenedorProductos.addEventListener('touchstart', function (event) {
        if (eliminandoProducto) return;
        xInicial = event.touches[0].clientX;
        contenedorProducto = event.target.closest('.producto');
        desplazamientoActual = 0;
    });
    contenedorProductos.addEventListener('touchmove', function (event) {
        if (eliminandoProducto || !contenedorProducto) return;
        const desplazamiento = event.touches[0].clientX - xInicial;
        desplazamientoActual = desplazamiento;
        contenedorProducto.style.transition = 'none';
        contenedorProducto.style.transform = `translateX(${desplazamiento}px)`;
    });
    contenedorProductos.addEventListener('touchend', function (event) {
        if (eliminandoProducto || !contenedorProducto) return;
        const nombreProducto = contenedorProducto.querySelector('.nombre_producto').textContent;
        if (desplazamientoActual < -50) {
            if (confirm("¿Seguro que deseas eliminar este producto?")) {
                eliminandoProducto = true;
                contenedorProducto.style.transition = 'transform 0.3s ease';
                contenedorProducto.style.transform = 'translateX(-100%)';
                contenedorProducto.addEventListener('transitionend', function () {
                    contenedorProducto.remove();
                    eliminandoProducto = false;

                }, { once: true });
                socket.emit('eliminar-carrito', nombreProducto);
                socket.on('producto-eliminado', (carrito) => {
                    // Aquí puedes manejar el carrito actualizado recibido desde el servidor
                    console.log('Carrito actualizado recibido:', carrito);
                    contenedorProductos.innerHTML = '';
                    // Iterar sobre el array de productos y mostrar cada uno
                    console.log(typeof (carrito));
                    const carritoString = JSON.stringify(carrito);

                    // Guardar 'carritoString' en localStorage con la clave 'producto'
                    localStorage.setItem('producto', carritoString);

                    if (typeof carrito === 'object' && carrito !== null) {
                        // Recorrer el objeto 'carrito' utilizando un bucle for...in
                        for (const key in carrito) {
                            if (carrito.hasOwnProperty(key)) {
                                const producto = carrito[key];
                                // Mostrar el producto en la consola
                                console.log('Nombre del producto:', producto.nombre);
                                console.log('Cantidad:', producto.cantidad);

                                // Mostrar el producto en la interfaz de usuario
                                mostrarProductoEnHTML(producto);
                                eliminandoProducto = false;
                            }

                        }
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
