La API esta hecha con Node.js y Express
la base de datos utilizada es MariaDB (la version open source de MySQL)
sin ORM

los Endpoints de los usuarios son 

http://localhost:3001/employees/register // peticion de tipo post
http://localhost:3001/employees/login // peticion de tipo post
http://localhost:3001/employees/logout // peticion de tipo post


los Endpoints de las notas son:

http://localhost:3001/notes/ // peticion de tipo get
http://localhost:3001/notes/new-note // peticion de tipo post
http://localhost:3001/notes/delete-note/:noteid // peticion de tipo post
http://localhost:3001/note/edit-note/:noteid // peticion de tipo post


la rutas delete-note y edit-note reciben un parametro obligatorio
este parametro es el ID de las notas, el cual es necesario para
ubicar las notas en la base de datos y realizar operaciones
con ellas.

Para correr el servidor local es necesario tener instalas una dependencias
las cuales son:

XAMPP: este es un conjunto de tecnologias empaquetadas en un programa
las que usaremos son la base de datos MariaDB o MySQL y el servidor
APACHE

Para Correr la base de datos tienes que abrir el programa XAMPP
y ubicar el boton start que esta al lado derecho de la etiqueta 
MySQL tarda menos de 2 minutos en arrancar el servicio
si quieres o ves necesario saber el puerto de la base de datos
el puerto es localhost:3306 

Para correr el servidor local del back-end necesitas node y npm
(que ya lo tienes por que lo instalamos la otra vez)
ubica la carpeta donde esta el package.json con la terminal y ejecuta 
el comando " npm run dev " (sin las comillas flaqui) y si encendiste el
servicio de la base de datos anteriormente no deberia haber ningún 
inconveniente. PSDATA: te pase el proyecto sin la carpeta node_modules
por que no tengo casi internet entonces ejecuta primero npm i para que 
se instalen las dependencias y luego npm run dev para arrancar el servidor

(opcional)
el servidor APACHE nos servira para ver los registros en la base de datos
esto es opcional pero si quieres ver estos datos necesitaras dicho servidor
el cual corre en la siguiente direccion: http://localhost:80 ahí 
veras un boton que dice phpMyAdmin ese es el programa con el que podras 
ver la Base de datos

si phpMyAdmin te pide usuario y contraseña solo pon en usuario "root"
(sin las comillas flaqui) y el campo password dejalo vacio y dale enter
o al boton que dira algo como acceder login o cualquier otra cosa.

si hay algo que no tienes claro llamame o busca en google (no sea vago mijo)
recuerda que puedes ver el codigo del servidor local de Node.js para entender 
como funciona por dentro todo
