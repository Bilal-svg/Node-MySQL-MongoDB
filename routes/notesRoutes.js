const express = require("express");
const {
  getNotes,
  createNote,
  getNote,
} = require("../controllers/notesController.js");

const router = express.Router();

// router
//   .route("/")
//   .get(async (req, res) => {
//     const notes = await getNotes();
//     res.send(notes);
//   })
//   .post(async (req, res) => {
//     const { title, contents } = req.body;
//     const note = await createNote(title, contents);
//     res.status(201).send(note);
//   });
// router.route("/:id").get(async (req, res) => {
//   const id = req.params.id;
//   const note = await getNote(id);
//   res.send(note);
// });

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote);

module.exports = router;
