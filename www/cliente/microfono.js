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
            contenedorLupa.style.display = 'block';
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
document.addEventListener('DOMContentLoaded', function() {
    const micIcon = document.getElementById('contenedor-microfono');
    const statusMessage = document.getElementById('status-message');
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; 

    const keywords = {
        'calcetines': '../imgs/calcetines.jpg',
        // Agregar más palabras clave y sus imágenes aquí
    };

    micIcon.addEventListener('touchstart', () => {
        statusMessage.innerText = 'Escuchando...'; // Actualizar el mensaje de estado
        recognition.start();
    });

    recognition.onresult = function(event) {
        statusMessage.innerText = ''; 
        const speechResult = event.results[0][0].transcript.trim().toLowerCase();
        if (keywords.hasOwnProperty(speechResult)) {
            const imgSrc = keywords[speechResult];
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.classList.add('resultado-imagen');
            document.body.appendChild(imgElement);
        } else {
            alert('Palabra clave no reconocida.');
        }
    };

    recognition.onend = function() {
        statusMessage.innerText = ''; 
        recognition.stop();
    };

    recognition.onerror = function(event) {
        console.error('Error en el reconocimiento de voz:', event.error);
    };
});
