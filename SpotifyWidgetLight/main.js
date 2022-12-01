/* Spotify Widget For Tuna Plugins */

const getPlaying = () => {
    fetch('http://localhost:1608/')
        .then(response => response.json())
        .then((data) => {
            usePlaying(data);
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

    let track = data.title;
    let artists = data.artists;

    if (currentPlayingArtist.innerHTML !== artists) {
        currentPlayingArtist.classList.add('currentPlayingArtistChanged');
    } else {
        currentPlayingArtist.classList.remove('currentPlayingArtistChanged');
    }

    if (currentPlayingTrack.innerHTML !== track) {
        currentPlayingTrack.classList.add('currentPlayingTrackChanged');
    } else {
        currentPlayingTrack.classList.remove('currentPlayingTrackChanged');
    }

    currentPlayingTrack.innerHTML = track;
    currentPlayingArtist.innerHTML = artists;
}
