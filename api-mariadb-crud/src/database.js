const mysql = require("mysql")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
});

const userTableColumns = "USER_ID INT NOT NULL AUTO_INCREMENT,FIRST_NAME VARCHAR(50), LAST_NAME VARCHAR(120), EMAIL VARCHAR(50), PASSWORD VARCHAR(200), PRIMARY KEY (USER_ID)"
const createUserTable = `CREATE TABLE IF NOT EXISTS USERS (${userTableColumns})`

const noteTableColumns = "NOTE_ID INT NOT NULL AUTO_INCREMENT, TITLE VARCHAR(50), DESCRIPTION VARCHAR(350), USER_ID INT, PRIMARY KEY (NOTE_ID)"
const createNoteTable = `CREATE TABLE IF NOT EXISTS NOTES (${noteTableColumns})`
connection.connect(function (error) {
  if (error) throw error
  connection.query("CREATE DATABASE IF NOT EXISTS PRACTICE_1")
  connection.query("USE PRACTICE_1")
  connection.query(createUserTable)
  connection.query(createNoteTable)
})

module.exports = connection