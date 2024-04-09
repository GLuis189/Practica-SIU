const socket = io();
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

async function leerNFC(){
    if ('NDEFReader' in window) {
        const ndef = new NDEFReader();
        try {
            await ndef.scan();
            console.log('Escaneo iniciado exitosamente.');
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    let data = decoder.decode(record.data);
                    setTimeout(() => {
                        document.getElementsByClassName("escaneando").style.display = "none";
                        document.getElementsByClassName("escaneado").style.display = "block";

                    }, 2000);
                    localStorage.setItem("nfc", data);
                    window.location = "producto.html"
                }
            };
        } catch (error) {
            console.error('Error al iniciar el escaneo NFC', error);
            socket.emit('nfcError', 'Error al iniciar el escaneo NFC');
        }
    } else {
        console.log('La API Web NFC no está soportada en este navegador');
    }
}

leerNFC()

var nav = document.querySelector("#nav1");
var abrir = document.querySelector("#abrir");
var cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})
