const connection = require("../database")

function authMiddleware(req, res, next) {
  const user = req.session.user

  if (!user) return res.status(500).send({
    error: "no has iniciado sesion."
  })

  const queryMatch = `SELECT * FROM USERS WHERE USER_ID="${user.USER_ID}"`
  connection.query(queryMatch, (error, results) => {
    if (error) return res.status(500).send({
      error
    })
    console.log(results)
    if (!results[0]) {
      return res.status(404).send({
        error: "El usuario no pudo ser encontrado."
      })
    }

    if (user.USER_ID !== results[0].USER_ID || user.EMAIL !== results[0].EMAIL) {
      return res.status(500).send({
        error: "credenciales invalidas."
      })
    }

    next()
  })
}

module.exports = authMiddleware