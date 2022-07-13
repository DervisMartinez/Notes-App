// Imports
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
require("./database")

// Initializations
const app = express() //iniciando express
const userRoutes = require("./routes/UserRoutes")
const noteRoutes = require("./routes/NoteRoutes")

// Settings
app.set('port', process.env.PORT || 5000)

// Middlewares 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/users", userRoutes)
app.use("/notes", noteRoutes)

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello World</h1>")
})

// Starting the server 
app.listen(app.get('port'), () => {
  console.log(`Server On Port ${app.get('port')}`)
})

module.exports = app