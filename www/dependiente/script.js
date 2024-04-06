document.getElementById('boton-log').addEventListener('click', function() {
    let contrasena = document.getElementById('contrasena').value;
    if (contrasena === '2222') {
        openCamera();
        document.getElementById('menu_dependiente').style.display = 'none';
        document.getElementById('video').style.display = 'block';
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
