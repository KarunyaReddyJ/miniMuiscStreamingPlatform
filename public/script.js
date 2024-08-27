// script.js
document.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('songList');
    const player = document.getElementById('player');
    const searchBar = document.getElementById('search-bar');
    const cover = document.getElementById('cover');
    const artist = document.getElementById('artist');
    const likes = document.getElementById('likes');
    const downloads = document.getElementById('downloads');

   
    fetchSongs();
   

    function fetchSongs(query = '') {
        fetch(`/api/songs?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(songs => {
                displaySongs(songs);
                console.log(songs);
            })
            .catch(error => {
                console.error('Error fetching song list:', error);
            });
    }

    function playSong(songId) {
        fetch(`/api/songs/${songId}/details`)
            .then(response => response.json())
            .then(song => {
                    cover.src = song.image;
                
                artist.innerHTML = `Artist: ${song.artist}`
                artist.addEventListener('click',()=>{
                    fetchSongs(song.artist)
                })
                likes.innerText = `Likes: ${song.likes}`;
                downloads.innerText = `Downloads: ${song.downloads}`;
                player.src = `/api/songs/${songId}/stream`;
                player.play().catch(error => {
                    console.error('Error playing song:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching song details:', error);
            });
    }

    function displaySongs(songs) {
        songList.innerHTML = '';
        songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.dataset.songId = song.id;
            li.addEventListener('click', () => {
                playSong(song.id);
            });
            songList.appendChild(li);
        });
    }

    searchBar.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        fetchSongs(searchQuery);
    });
});
