const express = require("express")
const { newNote, getNotes, deleteNote, editNote } = require("../controllers/Notes")
const authMiddleware = require("../middlewares/auth")
const router = express.Router()

router.get("/", authMiddleware, getNotes)

router.post("/new-note", authMiddleware, newNote)

router.delete("/delete-note/:noteid", authMiddleware, deleteNote)

router.put("/edit-note/:noteid", authMiddleware, editNote)

module.exports = router

