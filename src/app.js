const express = require("express");
const cookies = require("cookie-parser");
const cors = require("cors");

// route import
const authRoute = require("./routes/auth.route");
const songRoute = require("./routes/song.route");

const app = express();

app.use(express.json());
app.use(cookies());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// route use
app.use("/api/auth", authRoute);
app.use("/api/song", songRoute);

module.exports = app;
