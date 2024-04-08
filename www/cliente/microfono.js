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
