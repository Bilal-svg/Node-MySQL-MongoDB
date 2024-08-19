const provider = require("../providers/notesProvider.js");

const createNote = async (req, res) => {
  try {
    const note = await provider.queryCreateNote(req.body);
    res.status(500).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};
const getNotes = async (req, res) => {
  try {
    const notes = await provider.queryGetNotes();
    res.status(500).json(notes);
  } catch (error) {
    console.log(res);
    return res.status(500).json({ msg: "Error retrieving Notes", error });
  }
};
const getNote = async (req, res) => {
  try {
    // const id = req.params.id;
    const note = await provider.queryGetNote(req.params.id);
    res.status(500).json(note);
  } catch (error) {
    return res.status(500).json({ msg: "Error retrieving Note by id", error });
  }
};

module.exports = { getNotes, createNote, getNote };
