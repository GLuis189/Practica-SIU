const socket = io();
let marcadorProducto=0;
let marcadorProductoEncontrado;
let posicionInicial = null; // Almacena la posición inicial del usuario
let ultimaLatitud = null; // Almacena la última latitud conocida
let ultimaLongitud = null; // Almacena la última longitud conocida
const factorPxPorMetro = 5; // Factor de conversión de metros a píxeles
let nav = document.querySelector("#nav1");
let abrir = document.querySelector("#abrir");
let cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})
socket.on('producto-plano-encontrado', function(producto) {
    console.log('Producto encontrado:', producto);

    localStorage.setItem('productoEncontrado', JSON.stringify(producto));

    window.location.href = 'producto.html';
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
        window.location.href = 'microfono.html'; // Redireccionar al usuario a microfono.html
    });
});

window.onload = function()  {
    const productoEnPlano = localStorage.getItem('productoEnPlano');

    // Obtener todos los elementos img que representan marcadores de productos
    const marcadoresProductos = document.querySelectorAll('[id^="producto"]');

    // Iterar sobre cada marcador de producto
    marcadoresProductos.forEach(function(marcador) {
        // Obtener el nombre del producto del atributo alt
        const nombreProducto = marcador.getAttribute('alt');

        // Verificar si el nombre del producto coincide con el nombre del producto almacenado en localStorage
        if (nombreProducto === productoEnPlano) {
            // Mostrar el marcador correspondiente
            marcador.style.display = 'block';
            marcadorProductoEncontrado = marcador.id;
            console.log(`Ancho del plano: ${marcadorProductoEncontrado}`);
            // Eliminar el producto del localStorage después de mostrar el marcador
            localStorage.removeItem('productoEnPlano');
            marcadorProducto = 1;

            // Salir del bucle forEach una vez que se encuentra el marcador correspondiente
            return;
        }
    });
    const plano = document.getElementById("plano");
    const usuario = document.getElementById("usuario");
    const posicion = document.getElementById("posicion");

    if (plano.clientWidth !== 0 && plano.clientHeight !== 0 && usuario.clientWidth !== 0 &&usuario.clientHeight !== 0 ) {
        console.log("Ambas imágenes ya están cargadas");

        // Obtener los anchos de las imágenes
        const anchoPlano = plano.clientWidth;
        const anchoUsuario = usuario.clientWidth;

        // Obtener las alturas de las imágenes
        const altoPlano = plano.clientHeight;
        const altoUsuario = usuario.clientHeight;

        // Mostrar la información de ancho y alto en el div de posición
        posicion.innerText = `Ancho del plano: ${anchoPlano}, Ancho del usuario: ${anchoUsuario}, Alto del plano: ${altoPlano}, Alto del usuario: ${altoUsuario}`;

        // Mostrar la ubicación inicial
        mostrarUbicacionInicial(anchoPlano, anchoUsuario);
        setInterval(function() {
            obtenerGeolocalizacion(function(position) {
                // Pasar anchoPlano y altoPlano como parámetros adicionales
                actualizarPosicionConstante(position, anchoPlano, anchoUsuario, altoPlano, altoUsuario);
            });
        }, 1000); 
    }
};

function obtenerGeolocalizacion(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, function (error) {
            console.error("Error al obtener la ubicación:", error);
        });
    } else {
        alert("Geolocalización no es compatible en este navegador.");
    }
}


function actualizarPosicionConstante(position, anchoPlano, anchoUsuario, altoPlano, altoUsuario) {
    console.log("Actualizar");
    let latitud;
    let longitud;
    if (ultimaLongitud) {
        latitud = ultimaLatitud;
        longitud = ultimaLongitud;
    } else {
        latitud = position.coords.latitude;
        longitud = position.coords.longitud;
    }

    // Simular movimiento. 
    //latitud += 10;
    longitud -= 10;

    // Restricción para la latitud dentro del rango válido
    latitud = Math.min(180, Math.max(-180, latitud));
    longitud = Math.min(180, Math.max(-180, longitud));
    calcularPosicion(longitud,latitud,altoPlano, anchoPlano);

    function calcularPosicion(longitud,latitud, altoContenedor,anchoContenedor) {
        // Calcular la posición vertical del marcador
        const porcentajeV = (latitud + 90) / 180 * 100;
        // Calcular la nueva posición del marcador en el eje x
        const porcentajeH = (longitud + 180) / 360 * 100;
        let posicionUsuarioH = (porcentajeH / 100) * anchoContenedor;
        console.log("Posición horizontal del marcador:", posicionUsuarioH);
        const porcentajeHorizontal = (longitud + 180) / 360 * 100;
        let posicionUsuarioHorizontal = (porcentajeHorizontal / 100) * anchoContenedor;

        // Comprobar si el marcador está dentro de los límites de la imagen
        if (posicionUsuarioHorizontal < 0) {
            posicionUsuarioHorizontal = 0; // Si está fuera del límite izquierdo, fijar en el borde izquierdo
        } else if (posicionUsuarioHorizontal > anchoContenedor - 25) {
            posicionUsuarioHorizontal = anchoContenedor - 25; // Si está fuera del límite derecho, fijar en el borde derecho
        }
        let posicionUsuarioVertical = ((porcentajeV / 100) * altoContenedor)-230;
        // Verificar que la posición vertical esté dentro del rango del contenedor
        if (posicionUsuarioVertical < 0 || posicionUsuarioVertical > altoContenedor) {
            console.log("La posición vertical del marcador está fuera del rango del contenedor de la imagen.");
            return; // Detener la ejecución si la posición está fuera del rango
        }
        // Actualizar la posición del marcador en la imagen
        const usuario = document.getElementById("usuario");
        usuario.style.bottom = `${posicionUsuarioVertical}px`;
        usuario.style.left = `${posicionUsuarioHorizontal}px`;
        // Actualizar las últimas coordenadas conocidas
        ultimaLatitud = latitud;
        ultimaLongitud = longitud;
        // Mostrar la posición actualizada en el HTML
        const posicionDiv = document.getElementById("posicion");
        posicionDiv.innerText = `Latitud: ${latitud}`;

        console.log(`Latitud: ${latitud}`);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los marcadores de productos
    const productos = document.querySelectorAll('[id^="producto"]');

    // Función para mostrar el popup durante 5 segundos
    function mostrarPopup(nombreProducto, left, top) {
        const popup = document.getElementById('popup');
        const nombreProductoSpan = document.getElementById('nombreProducto');
        nombreProductoSpan.textContent = nombreProducto;
        popup.style.left = `${left}px`;
        popup.style.top = `${top - popup.offsetHeight}px`;
        popup.style.display = 'block';

        setTimeout(function() {
            popup.style.display = 'none';
        }, 5000);
    }

    // Agregar eventos de touchstart, touchend y touchhold a cada marcador de producto
    productos.forEach(function(producto) {
        let startTime; // Variable para almacenar el tiempo de inicio del toque

        producto.addEventListener('touchstart', function(event) {
            event.stopPropagation(); // Evitar que el toque se propague al contenedor padre
            event.preventDefault(); // Evitar el menú contextual predeterminado
            const nombreProducto = this.alt; // Obtener el nombre del producto del atributo alt

            const rect = this.getBoundingClientRect();
            const left = rect.left + window.scrollX;
            const top = rect.top + window.scrollY;

            // Mostrar el popup durante 5 segundos
            mostrarPopup(nombreProducto, left, top);

            // Guardar el tiempo de inicio del toque
            startTime = new Date().getTime();

        });

        // Cancelar el temporizador si se levanta el dedo antes de 5 segundos
        producto.addEventListener('touchend', function() {
            const endTime = new Date().getTime();
            const touchDuration = endTime - startTime;

            // Si la duración del toque es mayor a 5 segundos, redirigir a producto.html
            if (touchDuration >= 5000) {
                console.log("Se mantuvo pulsado durante más de 5 segundos.");
                const nombreProducto = producto.alt;
                socket.emit('producto-plano', nombreProducto);
            }
        });
    });
});

function mostrarUbicacionInicial(anchoPlano, anchoUsuario) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Geolocalización obtenida');
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            ultimaLatitud = latitud;
            ultimaLongitud = longitud;

            if (!posicionInicial) {
                // Si es la primera vez, almacenamos la posición inicial
                posicionInicial = (anchoPlano - anchoUsuario) / 2; // Centramos el marcador horizontalmente
            }
            
            const usuario = document.getElementById("usuario");
            if (!usuario) {
                console.log('Elemento "usuario" no encontrado');
                return;
            }
            usuario.style.left = `${posicionInicial}px`;
            usuario.style.bottom = "0"; 
            usuario.style.transform = "translateX(-50%)";
            usuario.style.position = "absolute"; 

            // Mostrar la posición en el HTML
            const posicionDiv = document.getElementById("posicion");
            if (!posicionDiv) {
                console.log('Elemento "posicion" no encontrado');
                return;
            }
            posicionDiv.innerText = `Latitud: ${latitud}, Longitud: ${longitud}`;
            if (marcadorProducto === 0) {
                for (let i = 1; i <= 4; i++) {
                    const idProducto = `producto${i}`;
                    const producto = document.getElementById(idProducto);
                    
                    if (!producto) {
                        console.log(`Elemento "${idProducto}" no encontrado`);
                        continue; // Saltar a la siguiente iteración si el elemento no se encuentra
                    }
                    if ("producto1"===idProducto){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial - 40}px`; 
                        producto.style.bottom = "340px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; }
                    if ("producto2"===idProducto){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial }px`; 
                        producto.style.bottom = "140px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; }
                    if ("producto3"===idProducto){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial - 130}px`; 
                        producto.style.bottom = "110px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; }
                    if ("producto4"===idProducto){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial + 110}px`; 
                        producto.style.bottom = "220px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; 
                    }
                }
            }  
            console.log(`Ancho del plano: ${marcadorProducto}`);  
            if (marcadorProducto===1){
                for (let i = 1; i <= 4; i++) {
                    const idProducto = `producto${i}`;
                    const producto = document.getElementById(idProducto);
                    
                    if (!producto) {
                        console.log(`Elemento "${idProducto}" no encontrado`);
                        continue; // Saltar a la siguiente iteración si el elemento no se encuentra
                    }
                    console.log(`Ancho del plano: ${marcadorProductoEncontrado}`);
                    if (marcadorProductoEncontrado==="producto1"){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial - 40}px`; 
                        producto.style.bottom = "340px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; }
                    if (marcadorProductoEncontrado==="producto2"){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial }px`; 
                        producto.style.bottom = "140px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; }
                    if (marcadorProductoEncontrado==="producto3"){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial - 130}px`; 
                        producto.style.bottom = "110px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; }
                    if (marcadorProductoEncontrado==="producto4"){
                        // Establecer los estilos del producto
                        producto.style.left = `${posicionInicial + 110}px`; 
                        producto.style.bottom = "220px";
                        producto.style.position = "absolute";
                        producto.style.display = 'block';
                        producto.style.width = "50px"; }
            }  
        }       
        }, function (error) {
            console.error("Error al obtener la ubicación:", error);
        });
    } else {
        alert("Geolocalización no es compatible en este navegador.");
    }
}
         