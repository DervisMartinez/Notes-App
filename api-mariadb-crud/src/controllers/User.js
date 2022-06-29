const connection = require("../database")
const bcrypt = require("bcrypt")

async function register(req, res) {
  const { first_name, last_name, email, password } = req.body; // recibiendo los datos
  // verificando que lleguen los datos
  if (!first_name || !last_name || !email || !password) {
    return res.status(403).send({ error: "Llene el formulario." })
  }
  // verificando si hay un usuario repetido
  const queryMatch = `SELECT EMAIL FROM USERS WHERE EMAIL="${email}"`
  connection.query(queryMatch, async (error, match) => {
    if (error) return res.status(500).send({
      error
    })
    // verificando que no hayan coincidencias
    if (match.length > 0) return res.status(403).send({
      error: "Estas Credenciales estan en uso."
    })
    // encriptando contraseña para guardarla en la base de datos
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    // verificando que se haya generado correctamente el hash
    if (!hash) {
      return res.status(500).send({
        error: "hash invalido."
      })
    }
    // guardando los datos
    const registerValues = `NULL, "${first_name}", "${last_name}", "${email}", "${hash}"`
    const queryRegister = `INSERT INTO USERS VALUES (${registerValues})`

    connection.query(queryRegister, (error) => {
      if (error) return res.status(500).send({
        error
      })

      return res.status(200).send({
        ...req.body,
        password: undefined
      })
    })
  })
}

async function login(req, res) {
  const { email, password } = req.body // recibiendo los datos
  // verificando que exista el usuario
  const matchQuery = `SELECT * FROM USERS WHERE EMAIL="${email}"`;
  await connection.query(matchQuery, async (error, results) => {
    console.log(results)
    if (error) return res.status(500).send({
      error
    })
    // si no existe se devuelve un error
    if (!results[0]) return res.status(500).send({
      error: "Estas Credenciales no estan registradas",
      email,
      password
    })
    // verificando que la contraseña sea correcta
    const comparePass = await bcrypt.compare(password, results[0].PASSWORD)
    if (!comparePass) return res.status(500).send({
      error: "Estas Credenciales no estan registradas o no son correctas"
    })
    // guardando las credenciales en la cookie
    const user = results[0]
    req.session.user = { ...user, password: undefined }
    // si todo dale bien retornamos los datos del usuario sin la password
    return res.status(200).send({
      ...req.body,
      password: undefined
    })
  })
}

function logout(req, res) {
  // para cerrar la session tenemos que establecer la cookie en nula
  req.session.user = null

  return res.status(200).send({
    message: "Se ha cerrado la sesion."
  })
}

module.exports = {
  register,
  login,
  logout
}