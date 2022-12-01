/* Spotify */

const getPlaying = () => {
    fetch('http://localhost:1608/')
        .then(response => response.json())
        .then((data) => {
            // usePlaying(data);
            setInterval(usePlaying(data), 1000);
        })
        .then(usePlaying)
        .catch(error => console.log(`Error while fetching spotify informations ${error}`));
}

setInterval(getPlaying, 1000);

const usePlaying = (data) => {
    if (!data) return;

    const content = document.querySelector('.currentPlayingContent');
    if (data.status === 'playing') {
        content.style.opacity = 1;
        content.classList.add('show');
        content.classList.remove('hide');
    } else {
        content.style.opacity = 0;
        content.classList.add('hide');
        content.classList.remove('show');
    }

    const currentThumbnail = document.getElementById('currentPlayingImage');
    if (currentThumbnail.src !== data.cover_path) {
        currentThumbnail.src = data.cover_path;
        currentThumbnail.classList.add('currentPlayingImageChanged');
    } else {
        currentThumbnail.classList.remove('currentPlayingImageChanged');
    }

    const currentPlayingTrack = document.getElementById('currentPlayingTrack');
    const currentPlayingArtist = document.getElementById('currentPlayingArtist');
    const spotifyicon = document.querySelector('.SpotifyIcon');

    let track = data.title;
    let artists = data.artists;
    if (currentPlayingArtist.innerHTML !== artists) {
        currentPlayingArtist.classList.add('currentPlayingArtistChanged');
    } else {
        currentPlayingArtist.classList.remove('currentPlayingArtistChanged');
    }

    if (currentPlayingTrack.innerHTML !== track) {
        // spotifyicon.classList.add('SpotifyIconChanged');
        currentPlayingTrack.classList.add('currentPlayingTrackChanged');
    } else {
        // spotifyicon.classList.remove('SpotifyIconChanged');
        currentPlayingTrack.classList.remove('currentPlayingTrackChanged');
    }

    currentPlayingTrack.innerHTML = track;
    currentPlayingArtist.innerHTML = artists;
}
