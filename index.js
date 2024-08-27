const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const songs = require('./songs')


app.use(express.static(path.join(__dirname, 'public')));

app.use('/songs', express.static(path.join(__dirname, 'songs')));

app.get('/api/songs', (req, res) => {
    const searchQuery=req.query.q?.toLowerCase()
    if(!searchQuery) return res.json(songs)
    const filteredSongs=songs.filter(song=>{
     return  ( song.movie.toLowerCase().includes(searchQuery) || song.title.toLowerCase().includes(searchQuery) || song.artist.toLowerCase().includes(searchQuery))
    })
    res.json(filteredSongs);
});


app.get('/api/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id, 10);
    const song = songs.find(s => s.id === songId);
    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ error: 'Song not found' });
    }
});
app.get('/api/songs/:id/details', (req, res) => {
    const songId = parseInt(req.params.id, 10);
    const song = songs.find(s => s.id === songId);
    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ error: 'Song not found' });
    }
});
app.get('/api/songs/:id/stream', (req, res) => {
    const songId = parseInt(req.params.id, 10);
    const song = songs.find(s => s.id === songId);
    if (song) {
        const filePath = path.join(__dirname, 'songs', song.filename);
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'Song not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
