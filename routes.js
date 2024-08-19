const express = require("express");
const app = express();
const notesRouter = require("./routes/notesRoutes");

const router = express.Router();

router.use("/notes", notesRouter);

module.exports = router;
