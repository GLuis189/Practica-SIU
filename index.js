const express = require('express');
const fs = require('fs');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let carrito = []; // Inicializar el carrito vacío

// Middleware para el análisis del cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Cargar el almacén desde el archivo JSON
let almacen = [];

fs.readFile('almacen.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al cargar el almacén:', err);
        return;
    }
    almacen = JSON.parse(data);
    console.log('Almacén cargado correctamente:', almacen);
});

// Manejar la conexión del cliente
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');


    socket.on('producto-anadir', (product) => {
        console.log(typeof product);
        const producto = almacen.find(item => item.nombre === product);

        if (producto) {
            // Si se encontró el producto, enviar toda su información de vuelta al cliente
            //socket.emit('producto-encontrado', producto);
            console.log('Producto enviado al cliente:', producto);
            socket.emit('producto-micro-encontrado', producto);
        } else {
            // Si no se encuentra el producto, enviar un mensaje de error al cliente
            //socket.emit('producto-no-encontrado', `No se encontró ningún producto con el ID: ${id}`);
            console.log('Producto no encontrado para el ID:', product);
        }
    });
    socket.on('producto-plano', (product) => {
        console.log(typeof product);
        const producto = almacen.find(item => item.nombre === product);

        if (producto) {
            // Si se encontró el producto, enviar toda su información de vuelta al cliente
            //socket.emit('producto-encontrado', producto);
            console.log('Producto enviado al cliente:', producto);
            socket.emit('producto-plano-encontrado', producto);
        } else {
            // Si no se encuentra el producto, enviar un mensaje de error al cliente
            //socket.emit('producto-no-encontrado', `No se encontró ningún producto con el ID: ${id}`);
            console.log('Producto no encontrado para el ID:', product);
        }
    });

    
    socket.on('guardar-carrito', (nuevoCarrito) => {
        carrito = nuevoCarrito;
        console.log('Carrito actualizado:', carrito);
        nuevoCarrito.cantidad = 1;
    
        // Guardar el contenido del carrito en el archivo tasks.json
        fs.writeFile('tasks.json', JSON.stringify(carrito), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Carrito guardado en tasks.json');
    
            // Leer el contenido del archivo tasks.json y enviarlo a través del socket
            fs.readFile('tasks.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
    
                // Parsear el contenido del archivo JSON
                const carrito = JSON.parse(data);
                console.log("Enviandooo");
                // Enviar el contenido del carrito a través del socket
                socket.emit('producto-carrito', carrito);
            });
        });
    });
    
  socket.on('nfcWritten', function (message) {
    console.log(message);
});


socket.on('nfcRead', function(data) {
    console.log('Datos leídos de la tarjeta NFC:', data);
});

socket.on('nfcError', function (error) {
    console.error(error);
});

});
    
app.use(express.static('www'));
server.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'));
