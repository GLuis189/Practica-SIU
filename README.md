# Practica
Siguiendo las expecificaciones establecidas en el diseño la estructura de nuestra aplicación es la siguiente:
-Cliente (Móvil): Se trata del funcionamiento general, donde el usuario puede hacer su compra.
-Dependiente(Móvil/Ordenador): En este encontramos el proceso de pago y preparado de pedido.

# Cliente
Tras seleccionar cliente tenemos las 4 siguientes opciones:
#Para regresar a la página principal de cliente pulsar el icono de Corte Inglés.

-Mapa:En este podemos ver nuestra posición en la tienda con la localización de los diferentes productos, para ello hemos añadido un buscador manual y uno  de voz al tocar el icono de microfono. 
Productos disponibles:
*Calcetines de colores
*Camisa hombre
*Consola
*Velas

-Carrito: Carrito del cliente en el cual este podrá añadir los productos, este puede eliminarlos, ordenarlos u añadirlos a favoritos. (Puede ver la ficha de cada uno ellos si lo desea)

-Escanear NFC: Para escanear un producto el usuario tocará la pantalla y cuando esta pasa a verde ya podrá escanear un producto (NFC), se le mostrará la ficha del producto y lo podrá añadir a su carrito.

-Favoritos: Para añadir un producto podemos agitar el movil en la ficha del mismo y nos permitirá añadirlo a esta lista, del mismo modo podemos ordenar y eliminar los productos de favoritos como queramos.

#Para proceder con el pedido el cliente pulsará el botón de Qr en el foote, en el mismo se muestra también el total del precio del pedido. Cuando el pedido haya sido tramitado se podrá proceder con el pago.

# Dependiente
Este está separado por dos tipos el dependiente que procede con el pago en caja y aquel que prepara los productos restantes del pedido en el almacén. Ya que se trata de áreas de  la aplicación restringidas para los empleados tienen su acceso restringido con contraseña.

-Dependiente en caja: (Móvil/Contraseña:2222): El dependiente tras escanear el Qr del pedido del cliente y el carrito del mismo se muestra por pantalla  y se puede proceder con el pago.

-Dependiente en almacen (Ordenador/Contraseña: 333): Tiene una lista con los productos a preparar del cliente, este los irá seleccionando cuando los vaya preparando. Del mismo modo tiene como ayuda un mapa dondé podrá ver la localización de los productos en el almacén (buscador manual y por voz).