const connection = require("../database")

function newNote(req, res) {
  const { title, description } = req.body
  const userId = req.user.USER_ID
  console.log(userId)
  const createNoteValues = `NULL, "${title}", "${description}", ${userId}`
  const createNoteQuery = `INSERT INTO NOTES VALUES (${createNoteValues})`

  if (!title || !description) return res.status(500).send({
    error: "no puedes crear una nota vacia o incompleta."
  })

  if (!userId) return res.status(500).send({
    error: "No has iniciado sesion."
  })

  connection.query(createNoteQuery, (error, results) => {
    if (error) return res.status(500).send({
      error
    })
    console.log(results)
    return res.status(200).send({
      NOTE_ID: results.insertId,
      title,
      description,
    })
  })
}

function getNotes(req, res) {
  const userId = req.user.USER_ID

  if (!userId) return req.status(500).send({
    error: "no has iniciado sesion"
  })

  const getNoteQuery = `SELECT * FROM NOTES WHERE USER_ID=${userId}`
  connection.query(getNoteQuery, (error, results) => {
    if (error) return res.status(500).send({
      error
    })

    return res.status(200).send({
      results
    })
  })
}

function editNote(req, res) {
  const noteId = req.params.noteid
  const userId = req.user.USER_ID
  const { title, description } = req.body

  if (!noteId) return res.status(404).send({
    error: "noteId invalido."
  })

  if (!title || !description) return res.status(500).send({
    error: "llene los campos"
  })

  const editNoteValues = `TITLE="${title}", DESCRIPTION="${description}"`
  const editNoteQuery = `UPDATE NOTES SET ${editNoteValues} WHERE NOTE_ID=${noteId} AND USER_ID=${userId}`

  connection.query(editNoteQuery, (error, results) => {
    if (error) return res.status(500).send({
      error
    })

    return res.status(200).send({
      message: "La nota ha sido actualizada.",
      results
    })
  })
}

function deleteNote(req, res) {
  const userId = req.user.USER_ID
  const noteId = req.params.noteid
  if (!noteId) return res.status(404).send({
    error: "noteId invalido."
  })

  const deleteNoteQuery = `DELETE FROM NOTES WHERE NOTE_ID=${noteId} AND USER_ID=${userId} `
  connection.query(deleteNoteQuery, (error, results) => {
    if (error) return res.status(500).send({
      error
    })

    return res.status(200).send({
      message: "La nota ha sido eliminada.",
      results
    })
  })
}

module.exports = {
  newNote,
  getNotes,
  deleteNote,
  editNote
}