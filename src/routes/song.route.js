const songController = require("../controllers/song.controller");
const { Router } = require("express");
const songMiddleware = require("../middleware/upload.middleware");
const verifyUser = require("../middleware/auth.middleware");

const songRouter = Router();

songRouter.post(
  "/",
  verifyUser,
  songMiddleware.single("song"),
  songController.uploadSong,
);

// Allow seamless playback for both authenticated users and guest portfolio reviews
songRouter.get("/", songController.getSongByMood);

module.exports = songRouter;

