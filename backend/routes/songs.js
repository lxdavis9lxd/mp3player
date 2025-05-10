const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// @route   GET api/songs
// @desc    Get all songs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().sort({ uploadedAt: -1 });
    res.json(songs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/songs
// @desc    Add a new song
// @access  Public // Should be private in a real app
router.post('/', async (req, res) => {
  const { title, artist, album, genre, filePath, duration, coverArt } = req.body;

  try {
    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      filePath,
      duration,
      coverArt
    });

    const song = await newSong.save();
    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/songs/:id
// @desc    Get song by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ msg: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Song not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
