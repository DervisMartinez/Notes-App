const connection = require("../database")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function register(req, res) {
  // recibiendo datos
  const { google_id, first_name, last_name, email, password } = req.body;
   let userPassword = "";
  let googleId = "";
  // verificando que lleguen los datos
  if (!first_name || !last_name || !email) {
    return res.status(403).send({ error: "Llene el formulario." })
  }

  if (!google_id && !password) {
    return res.status(403).send({
      error: "Se necesita la contraseña para proteger sus datos"
    })
  }

  if (!password) userPassword = ""

  if (password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    if (!hash) {
      return res.status(500).send({
        error: "hash invalido."
      })
    }
    userPassword = hash
  }

  if (!google_id) googleId = ''

  if (google_id) googleId = google_id

  // verificando si hay un usuario repetido
  const queryMatch = `SELECT EMAIL FROM USERS WHERE EMAIL="${email}"`
  connection.query(queryMatch, async (error, match) => {
    if (error) return res.status(500).send({
      error
    })

    if (match.length > 0) return res.status(403).send({
      error: "Estas Credenciales estan en uso."
    })

    // guardando los datos
    const registerValues = `NULL, "${googleId}", "${first_name}", "${last_name}", "${email}", "${userPassword}"`
    const queryRegister = `INSERT INTO USERS VALUES (${registerValues})`

    connection.query(queryRegister, (error) => {
      if (error) return res.status(500).send({
        error
      })

      return res.status(200).send({
        first_name,
        last_name,
        email
      })
    })
  })
}

async function login(req, res) {
  const { google_id, email, password } = req.body // recibiendo los datos

  if (!email) return res.status(500).send({
    error: "se necesita el email"
  })

  if (!password && !google_id) {
    return res.status(500).send({
      error: "se necesita la contraseña para proteger tus datos"
    })
  }

  // verificando que exista el usuario
  const matchQuery = `SELECT * FROM USERS WHERE EMAIL="${email}"`;
  await connection.query(matchQuery, async (error, results) => {
    if (error) return res.status(500).send({
      error
    })

    if (!results[0]) return res.status(500).send({
      error: "Estas Credenciales no estan registradas",
      email,
      password
    })


    if (results[0].GOOGLE_ID && results[0].GOOGLE_ID !== google_id) {
      return res.status(404).send({
        error: "Las Credenciales no coinciden"
      })
    }

    // verificando que la contraseña sea correcta
    if (password) await bcrypt.compare(password, results[0].PASSWORD, (error, check) => {
      if (error) return res.status(500).send({
        error
      })

      if (!check) return res.status(500).send({
        check
      })
    })

    const user = results[0]
    const payload = {
      userId: user.USER_ID,
    }

    const token = jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 3600 * 24 * 7 }
    )

    return res.status(200).send({
      token
    })
  })
}

module.exports = {
  register,
  login,
}