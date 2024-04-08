document.addEventListener('DOMContentLoaded', function() {
    // Recuperar la información del carrito del local storage
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
        document.getElementById('productosContainer').innerText = carrito;
        console.log('Información del carrito:', carrito);
        console.log('Tipo de dato:', typeof carrito);
        carrito = JSON.parse(carrito);
        console.log('Tipo de dato después de parsear:', typeof carrito);
    }
    }
);
