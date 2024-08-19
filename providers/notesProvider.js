const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
const Note = require("../model/notesModel");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

let provider;

if (process.env.DB_TYPE === "mongodb") {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

  provider = {
    queryCreateNote: async (noteData) => {
      const note = new Note(noteData);
      return note.save();
    },
    queryGetNotes: async () => {
      return await Note.find({});
    },
    queryGetNote: async (noteId) => {
      //   console.log(noteId);
      return await Note.findById(noteId);
    },
  };
} else if (process.env.DB_TYPE === "mysql") {
  provider = {
    queryCreateNote: async (body) => {
      const { title, contents } = body;
      const [result] = await pool.query(
        "INSERT INTO notes (title, contents) VALUES (?, ?)",
        [title, contents]
      );
      return result;
    },
    queryGetNotes: async () => {
      const [rows] = await pool.query("SELECT * FROM notes");
      return rows;
    },

    queryGetNote: async (noteId) => {
      const [rows] = await pool.query("SELECT * FROM notes WHERE id=?", [
        noteId,
      ]);
      return rows;
    },
  };
} else {
  throw new Error("Unsupported DATABASE_TYPE");
}

module.exports = provider;
