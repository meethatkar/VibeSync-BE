const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "song title is required"],
    unique: [true, "song details is already stored in database"],
  },
  artist: {
    type: String,
    required: [true, "song title is required"],
  },
  plays: {
    type: String,
    default: 0,
  },
  songDuration: {
    type: String,
    required: [true, "song title is required"],
  },
  releasedOn: {
    type: String,
  },
  songUrl: {
    type: String,
    required: [true, "song title is required"],
  },
  posterUrl: {
    type: String,
    required: [true, "song title is required"],
  },
  mood: {
    type: String,
    default: "neutral",
    enums: {
      values: [
        "happy",
        "sad",
        "angry",
        "surprised",
        "neutral",
        "fearful",
        "disgusted",
      ],
      message: "only predefined moods are allowed",
    },
  },
});

const songModel = mongoose.model("song-clones", songSchema);

module.exports = songModel;
