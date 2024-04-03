

const cliente = document.getElementById('cliente');
const empleado = document.getElementById('empleado');


cliente.addEventListener('click', () => {
    // abrir el html de cliente
    window.open('cliente/home.html');
    console.log('Cliente');
});
empleado.addEventListener('click', () => {
    console.log('Empleado');
});