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
    socket.on('id', (product) => {
        console.log(typeof product);
        const producto = almacen.find(item => item.id == product);

        if (producto) {
            // Si se encontró el producto, enviar toda su información de vuelta al cliente
            //socket.emit('producto-encontrado', producto);
            console.log('Producto enviado al cliente:', producto);
            socket.emit('producto-encontrado', producto);
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
    socket.on('eliminar-carrito', (nombreProducto) => {
        // Leer el contenido actual del archivo tasks.json
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            let carritoExistente = [];
            if (data) {
                carritoExistente = JSON.parse(data);
            }
    
            // Buscar el producto en el carrito por su nombre
            const productoIndex = carritoExistente.findIndex(producto => producto.nombre === nombreProducto);
            if (productoIndex !== -1) {
                // Si la cantidad del producto es mayor que 1, restar 1 a la cantidad
                if (carritoExistente[productoIndex].cantidad > 1) {
                    carritoExistente[productoIndex].cantidad--;
                } else {
                    // Si la cantidad del producto es igual a 1, eliminar el producto del carrito
                    carritoExistente.splice(productoIndex, 1);
                }
            }
    
            console.log('Carrito actualizado:', carritoExistente);
    
            // Guardar el contenido del carrito actualizado en el archivo tasks.json
            fs.writeFile('tasks.json', JSON.stringify(carritoExistente), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            fs.readFile('tasks.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Parsear el contenido del archivo JSON
                const carrito = JSON.parse(data);
                const carritoArray = Array.isArray(carrito) ? carrito : [carrito];

                console.log("Enviandooo");
                // Emitir el carrito como un array a través del socket
                socket.emit('producto-eliminado', carritoArray);
                });
            });
        });
    });
    

    socket.on('guardar-carrito', (nuevoCarrito) => {
        // Leer el contenido actual del archivo tasks.json
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            let carritoExistente = [];
            if (data) {
                carritoExistente = JSON.parse(data);
            }
            // Verificar si el carrito existente está vacío
            if (carritoExistente.length === 0) {
                nuevoCarrito.cantidad = 1;
                // Si el carrito está vacío, crear una lista con el nuevo producto
                carritoExistente = [nuevoCarrito];
            } else {
                // Buscar si existe un producto con el mismo título en el carrito
                const productoExistenteIndex = carritoExistente.findIndex(producto => producto.nombre === nuevoCarrito.nombre);
                if (productoExistenteIndex !== -1) {
                    // Si ya existe un producto con el mismo título, aumentar su cantidad en 1
                    carritoExistente[productoExistenteIndex].cantidad++;
                } else {
                    // Si no existe un producto con el mismo título, agregar el nuevo producto al carrito
                    nuevoCarrito.cantidad = 1;
                    carritoExistente.push(nuevoCarrito);
                }
            } 
            console.log('Carrito actualizado:', carritoExistente);
            // Guardar el contenido del carrito actualizado en el archivo tasks.json
            fs.writeFile('tasks.json', JSON.stringify(carritoExistente), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
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
