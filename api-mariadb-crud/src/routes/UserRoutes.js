const express = require("express")
const { register, login, logout } = require("../controllers/User")
const authMiddleware = require("../middlewares/auth")
const router = express.Router()

router.get("/", authMiddleware, function (req, res) {
  res.send({ message: "Hello World" })
})

router.post("/register", register)

router.post("/login", login)

router.post("/logout", authMiddleware, logout)

module.exports = router