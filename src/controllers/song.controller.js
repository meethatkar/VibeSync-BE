const songModel = require("../models/song.model");
const id3 = require("node-id3");
const imageKit = require("../service/imageKit.service");

const uploadSong = async (req, res) => {
  const songFile = req.file;
  const tags = id3.read(songFile.buffer);

  const songUrl = await imageKit.uploadFile(
    songFile.buffer,
    tags.title,
    "song",
  );
  const imageUrl = await imageKit.uploadFile(
    tags.image.imageBuffer,
    tags.title,
    "poster",
  );

  const song = await songModel.create({
    title: tags.title,
    artist: tags.artist,
    songDuration: songUrl.duration,
    releasedOn: tags.recordingDates | tags.recordingTime,
    songUrl: songUrl.url,
    posterUrl: imageUrl.url,
    mood: req.body?.mood,
    plays: req.body?.plays,
  });

  console.log("SONG: ", song);

  res.status(201).json({
    message: "song uploaded",
    song,
  });
};

const getSongByMood = async (req, res) => {
  try {
    const { mood, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch songs with pagination and consistent ordering
    const query = mood ? { mood: mood.toLowerCase() } : {};
    const songs = await songModel
      .find(query)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 }); // Order by newest first

    // Get total count for pagination metadata
    const totalSongs = await songModel.countDocuments(query);
    const totalPages = Math.ceil(totalSongs / limitNumber);

    res.status(200).json({
      message: "songs fetched successfully",
      songs,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalSongs,
        hasMore: pageNumber < totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error: error.message });
  }
};

module.exports = { uploadSong, getSongByMood };
