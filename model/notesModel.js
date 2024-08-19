const mongoose = require("mongoose");
const shortid = require("shortid");

const notesSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  title: { type: String, required: true },
  contents: { type: String, required: true },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
