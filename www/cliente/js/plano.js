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
        window.location.href = 'microfono.html'; // Redireccionar al usuario a microfono.html
    });
});

let nav = document.querySelector("#nav1");
let abrir = document.querySelector("#abrir");
let cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})
let posicionInicial = null; // Almacena la posición inicial del usuario
let ultimaLatitud = null; // Almacena la última latitud conocida
let ultimaLongitud = null; // Almacena la última longitud conocida
const factorPxPorMetro = 5; // Factor de conversión de metros a píxeles

document.addEventListener('DOMContentLoaded', function () {
    const plano = document.getElementById("plano");
    plano.onload = function() {
        // Cuando la imagen del plano se cargue completamente
        const anchoPlano = plano.clientWidth;
        
        const usuario = document.getElementById("usuario");
        usuario.onload = function() {
            // Cuando la imagen del usuario se cargue completamente
            const anchoUsuario = usuario.clientWidth;
            mostrarUbicacionInicial(anchoPlano, anchoUsuario);
        };
    };
});

function mostrarUbicacionInicial(anchoPlano, anchoUsuario) {
    obtenerGeolocalizacion(function(position) {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        ultimaLatitud = latitud;
        ultimaLongitud = longitud;

        if (!posicionInicial) {
            // Si es la primera vez, almacenamos la posición inicial
            posicionInicial = (anchoPlano - anchoUsuario) / 2; // Centramos el marcador horizontalmente
        }
        
        const usuario = document.getElementById("usuario");
        usuario.style.left = `${posicionInicial}px`; // Colocamos el marcador en la posición inicial
        usuario.style.bottom = "0"; // Colocamos el marcador debajo de la imagen
        usuario.style.transform = "translateX(-50%)"; // Centramos el marcador horizontalmente
        usuario.style.position = "absolute"; // Ajustamos la posición del marcador
    });

    // Obtener la geolocalización del usuario y actualizar continuamente la posición
    obtenerGeolocalizacion(actualizarPosicionUsuario);
}

function obtenerGeolocalizacion(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, function (error) {
            console.error("Error al obtener la ubicación:", error);
        });
    } else {
        alert("Geolocalización no es compatible en este navegador.");
    }
}

function actualizarPosicionUsuario(position) {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;

    if (ultimaLatitud && ultimaLongitud) {
        // Calcular la distancia en metros entre la ubicación actual y la anterior
        const distancia = calcularDistancia(ultimaLatitud, ultimaLongitud, latitud, longitud);
        
        // Convertir la distancia a píxeles
        const distanciaEnPx = distancia * factorPxPorMetro;
        
        // Actualizar la posición del marcador en la imagen
        const usuario = document.getElementById("usuario");
        const anchoContenedor = document.querySelector(".contenedor-img").clientWidth;
        const porcentajeHorizontal = (longitud + 180) / 360 * 100;
        const posicionUsuario = (porcentajeHorizontal / 100) * anchoContenedor;
        const nuevaPosicionUsuario = posicionUsuario + distanciaEnPx;
        usuario.style.left = `${nuevaPosicionUsuario}px`;
    }

    // Actualizar las últimas coordenadas conocidas
    ultimaLatitud = latitud;
    ultimaLongitud = longitud;
}

// Función para calcular la distancia entre dos puntos geográficos en metros
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371e3; // Radio de la Tierra en metros
    const phi1 = lat1 * Math.PI / 180; // Latitud en radianes
    const phi2 = lat2 * Math.PI / 180; // Latitud en radianes
    const deltaPhi = (lat2 - lat1) * Math.PI / 180; // Diferencia de latitud en radianes
    const deltaLambda = (lon2 - lon1) * Math.PI / 180; // Diferencia de longitud en radianes

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c; // Distancia en metros

    return distancia;
}
