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

    socket.on('id', (id) => {
        const idNumero = parseInt(id);

        const producto = almacen.find(item => item.id === idNumero);

        if (producto) {
            // Si se encontró el producto, enviar toda su información de vuelta al cliente
            socket.emit('producto-encontrado', producto);
            console.log('Producto enviado al cliente:', producto);
        } else {
            // Si no se encuentra el producto, enviar un mensaje de error al cliente
            socket.emit('producto-no-encontrado', `No se encontró ningún producto con el ID: ${id}`);
            console.log('Producto no encontrado para el ID:', id);
        }
    });

    
    // Recibir el contenido del carrito desde el cliente y actualizarlo en el servidor
    socket.on('guardar-carrito', (nuevoCarrito) => {
        carrito = nuevoCarrito.carrito;
        console.log('Carrito actualizado:', carrito);
         // Guardar el contenido del carrito en el archivo tasks.json
         fs.writeFile('tasks.json', JSON.stringify(carrito), (err) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Carrito guardado en tasks.json');
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
