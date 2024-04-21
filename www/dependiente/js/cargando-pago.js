const socket = io();

const pago = document.getElementById('cargando-pago');
const listo = document.getElementById('pago-listo');

total = localStorage.getItem('total');
document.querySelector('.total').nextElementSibling.textContent = total + '€';
localStorage.setItem('total', total);

pago.addEventListener('touchstart', () => {
    pago.style.display = 'none';
    listo.style.display = 'block';
    socket.emit('pago', 'pago');
});
