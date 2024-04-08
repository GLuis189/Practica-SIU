document.getElementById('boton-log').addEventListener('click', async function() {
    let contrasena = document.getElementById('contrasena').value;
    if (contrasena === '2222') {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
            const video = document.getElementById("video");
            video.srcObject = stream;
            video.onloadedmetadata = function() {
                document.getElementById('menu_dependiente').style.display = 'none';
                document.getElementById('video').style.display = 'block';
                document.getElementById('boton-escanear').style.display = 'block'; // Mostrar el botón de escaneo
                iniciarEscaneoQR();
            };
        } catch (error) {
            console.error("Error al acceder a la cámara:", error);
            alert('No se pudo acceder a la cámara. Asegúrate de permitir el acceso y vuelve a intentarlo.');
        }
    }else {
        alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
        window.location.href = "../index.html";
    }
});

// Función para iniciar el escaneo del código QR
document.getElementById('boton-escanear').addEventListener('click', function() {
    iniciarEscaneoQR();
});

async function openCamera() {
    const video = document.getElementById("video");

    try {
        const stream = await navigator.mediaDevices?.getUserMedia({ video: { facingMode: { exact: "environment" } } });
        if (stream) {
            video.srcObject = stream;
            await new Promise(resolve => video.onloadedmetadata = resolve); // Esperar a que la cámara esté completamente cargada
        } else {
            console.error("No se pudo obtener acceso a la cámara.");
        }
    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
    }
}

function iniciarEscaneoQR() {
    const video = document.getElementById("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const escanearQR = () => {
        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;

        context.drawImage(video, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            mostrarInfoCarrito(code.data);
        } else {
            console.log("No se detectó ningún código QR.");
        }

        requestAnimationFrame(escanearQR); // Continuar escaneando en tiempo real
    };

    escanearQR();
}
/*
function mostrarInfoCarrito(data) {
    // Aquí puedes cargar la información del carrito en la página actual para verificar que se esté leyendo correctamente
    const carritoInfoHTML = `<h2>Información del carrito:</h2>
                              <p>${data}</p>`;
    document.body.innerHTML = carritoInfoHTML;
}*/

function mostrarInfoCarrito(data) {
    // Guardar la información del carrito en el local storage para recuperarla en carrito_dependiente.js
    localStorage.setItem('carrito', JSON.stringify(data));

    // Redirigir a carrito_dependiente.html
    window.location.href = 'carrito_dependiente.html';
}


