const socket = io();

const pago = document.getElementById('cargando-pago');
const listo = document.getElementById('pago-listo');

pago.addEventListener('touchstart', () => {
    pago.style.display = 'none';
    listo.style.display = 'block';
    socket.emit('pago', 'pago');
});
