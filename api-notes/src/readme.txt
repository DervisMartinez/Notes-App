La API esta hecha con Nodejs, Express y MariaDB (MySQL open source)

Las rutas de los usuarios son:

http://localhost:5000/users/login  # tipo de peticion POST
http://localhost:5000/users/register # tipo de peticion POST

tienes una ruta de prueba: 
http://localhost:5000/users/ # tipo de peticion GET

Las rutas de Notas son:

http://localhost:5000/notes/ # tipo de peticion GET (aqui obtienes todas las notas del usuario logueado)
http://localhost:5000/notes/new-note # tipo de peticion POST (aqui guardas nuevas notas)
http://localhost:5000/notes/delete-note/:noteid # tipo de peticion DELETE (aqui eliminas notas del usuario logueado)
http://localhost:5000/notes/edit-note/:noteid # tipo de peticion PUT (aqui editas las notas del usuario logueado)

las rutas que tienen /:noteid 
son las que requieren que le pases el ID de la nota por parametros

eso se hace colocando la ruta base y luego el parametros
ejemplo:

http://localhost:5000/notes/edit-note/1

Recuerda que las peticiones POST son las que reciben
datos por el cuerpo de la peticion 
investiga como mandar datos con fetch
o axios

para correr el servidor de nodejs abres la terminal
y te ubicas en el directorio del proyecto luego
ejecuta npm run dev

PERO antes de hacer esto tienes que ejecutar antes el 
servidor de la base de datos primero (esto lo haces XAMPP)

ya teniendo ambos servidores corriendo puedes ir al navegador
y poner en la barra de direcciones la ruta de prueba que te deje
arriba. 
(te lo dejo para evitarte la flojera "http://localhost:5000/users/")

cuando realices el login el servidor te retornara un token de autenticacion
el cual debes mandar en todas las peticiones de las rutas protegidas
(las rutas protegidas son las relacionadas con las notas)

ese token lo tienes que guardar en el navegador
(usa localStorage para esto.)

Cualquier duda no dudes en INVESTIGAR PRIMERO ANTES DE PREGUNTARME
:>

el proyecto no viene con la carpeta node_modules asi que ejecuta
npm i, y luego ejecuta npm run dev
