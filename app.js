const express = require("express");
const cors = require("cors");
const madlibRoutes = require("./routes/madlib");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/madlib", madlibRoutes);
app.use("/auth", adminRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

module.exports = app;
