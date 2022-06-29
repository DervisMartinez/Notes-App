// Imports
const express = require("express")
const session = require("express-session")
const morgan = require("morgan")
const cors = require("cors")
const MySQLStore = require("express-mysql-session")
require("./database")

// Initializations
const app = express() //iniciando express
const employeeRoutes = require("./routes/UserRoutes") // rutas de usuario
const noteRoutes = require("./routes/NoteRoutes") // rutas de las notas
const options = { // opciones de de las cookies
  host: "localhost",// donde esta alojada la base de datos
  port: 3306, // puerto del servidor de la base de datos
  user: "root", // usuario de la base de datos
  password: "", // contraseña de la base de datos
  database: "PRACTICE_1", // nombre de la base de datos
  clearExpired: true, // aqui se indica que las sesiones que hayan expirado sean eliminadas
  expiration: 86400000 // la sesiones expiran despues de pasar 24 horas (el valor esta en milisegundos)
}
const sessionStore = new MySQLStore(options) // creando el store de las sesiones

// Settings
app.set('port', process.env.PORT || 3001) // puerto del servidor local

// Middlewares (son funciones que se ejecutan antes de ejecutar una ruta)
app.use(express.urlencoded({ extended: false })) // todo lo que mandes por forms sera recibido en urlencoded
app.use(express.json()) // los datos son recibidos en JSON
app.use(morgan("dev")) // esta es una dependencia para ver el status de las peticiones
app.use(cors()) // estas son las cabeceras de las peticiones que son enviadas y recibidas en el servidor
//  las cors se pueden configurar si tienes algun problema no dudes en investigar (alta rima pá)

app.use( // aqui establecemos la sesion anteriormente configurada con su cookie
  session({
    key: "cookie_user",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
)

// Routes (aqui establecemos las rutas y le puse un prefijo para indicar lo que gestionan los endpoints)
app.use("/users", employeeRoutes)
app.use("/notes", noteRoutes)

// aqui tienes una ruta de prueba para ver si el servidor funciona
// pon en la barra de direcciones http://localhost:3001 y veras este mensaje por pantalla
app.get("/", (req, res) => {
  res.status(200).send("Hello World")
})

// Starting the server aqui se ejecuta el servidor local
app.listen(app.get('port'), () => {
  console.log(`Server On Port ${app.get('port')}`)
})

module.exports = app