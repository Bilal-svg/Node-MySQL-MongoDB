const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
