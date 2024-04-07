document.getElementById('boton-log').addEventListener('click', async function() {
    let contrasena = document.getElementById('contrasena').value;
    if (contrasena === '2222') {
        await openCamera();
        document.getElementById('menu_dependiente').style.display = 'none';
        document.getElementById('video').style.display = 'block';
        iniciarEscaneoQR();
    } else {
        alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
        window.location.href = "../index.html";
    }
});

async function openCamera() {
    const video = document.getElementById("video");

    try {
        const stream = await navigator.mediaDevices?.getUserMedia({ video: true });
        if (stream) {
            video.srcObject = stream;
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

    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    const escanearQR = () => {
        context.drawImage(video, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            mostrarInfoCarrito(code.data);
        } else {
            requestAnimationFrame(escanearQR); // Continuar escaneando en tiempo real
        }
    };

    escanearQR();
}

function mostrarInfoCarrito(data) {
    // Aquí puedes cargar la información del carrito en el HTML carrito_cliente.html
    // Puedes hacerlo mediante redirección o mediante AJAX para cargar dinámicamente el contenido
    window.location.href = "carrito_cliente.html?data=" + encodeURIComponent(data);
}
