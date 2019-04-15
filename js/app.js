// Audio Player
class MusicPlayer {
  constructor() {
    this.playList = [];
    this.currentAudio = document.getElementById("audio-track");
    this.currentTrack = 1;
  }
}

let mp = new MusicPlayer();

mp.playList = [
  {
    id: 1,
    title: "Dunnock in Second",
    artist: "John Smith",
    url: "audios/audio1.mp3"
  },
  {
    id: 2,
    title: "Believe in yourself",
    artist: "John Doe",
    url: "audios/audio2.mp3"
  },
  {
    id: 3,
    title: "Never Let you go",
    artist: "David Smith",
    url: "audios/audio3.mp3"
  },
  {
    id: 4,
    title: "Dunnock in Second",
    artist: "John Smith",
    url: "audios/audio1.mp3"
  },
  {
    id: 5,
    title: "Believe in yourself",
    artist: "John Doe",
    url: "audios/audio2.mp3"
  },
  {
    id: 6,
    title: "Never Let you go",
    artist: "David Smith",
    url: "audios/audio3.mp3"
  },
  {
    id: 7,
    title: "Dunnock in Second",
    artist: "John Smith",
    url: "audios/audio1.mp3"
  },
  {
    id: 8,
    title: "Believe in yourself",
    artist: "John Doe",
    url: "audios/audio2.mp3"
  },
  {
    id: 9,
    title: "Never Let you go",
    artist: "David Smith",
    url: "audios/audio3.mp3"
  },
  {
    id: 10,
    title: "Dunnock in Second",
    artist: "John Smith",
    url: "audios/audio1.mp3"
  },
  {
    id: 11,
    title: "Believe in yourself",
    artist: "John Doe",
    url: "audios/audio2.mp3"
  },
  {
    id: 12,
    title: "Never Let you go",
    artist: "David Smith",
    url: "audios/audio3.mp3"
  }
];
generatePlayList();
// playCurrentTrack(mp.currentTrack);
function generatePlayList() {
  let audioPlayList = document.getElementById("audio-playlist");
  mp.playList.forEach((music, index) => {
    let tr = `<tr data-music-url=${music.id}>
        <td>${index + 1}</td>
        <td>${music.title}</td>
        <td>${music.artist}</td>
        <td>3.32</td>
      </tr>`;
    audioPlayList.innerHTML += tr;
  });
}

let tableRows = document.querySelectorAll(".audio-playlist tr");
tableRows.forEach(element => {
  element.addEventListener("click", function(event) {
    let audioTrack = event.target.parentElement.getAttribute("data-music-url");
    event.target.parentElement.classList.toggle("playing-track");
    mp.currentTrack = parseInt(audioTrack) - 1;
    playCurrentTrack(mp.currentTrack);
  });
});

function playCurrentTrack(currentTrack) {
  let currentAudio = mp.playList.filter(
    m => m.id === mp.playList[currentTrack].id
  );
  mp.currentTrack = currentTrack;
  document.getElementById("currentTrackTitle").innerHTML =
    currentAudio[0].title;
  document.getElementById("currentTrackArtist").innerHTML =
    currentAudio[0].artist;
  mp.currentAudio.setAttribute("src", currentAudio[0].url);
  mp.currentAudio.volume = 0.1;
  mp.currentAudio.play();
}

document
  .getElementById("audio-play")
  .addEventListener("click", function(event) {
    mp.currentAudio.play();
  });
document
  .getElementById("audio-pause")
  .addEventListener("click", function(event) {
    mp.currentAudio.pause();
  });
document
  .getElementById("audio-next")
  .addEventListener("click", function(event) {
    if (mp.currentTrack === mp.playList.length - 1) mp.currentTrack = 1;
    else mp.currentTrack++;
    playCurrentTrack(mp.currentTrack);
  });
document
  .getElementById("audio-prev")
  .addEventListener("click", function(event) {
    if (mp.currentTrack === 1) mp.currentTrack = mp.playList.length - 1;
    else mp.currentTrack--;
    playCurrentTrack(mp.currentTrack);
  });
document
  .getElementById("audio-volume")
  .addEventListener("click", function(event) {
    if (mp.currentAudio.volume !== 1) {
      mp.currentAudio.volume = (mp.currentAudio.volume + 0.1).toFixed(1);
    } else {
      mp.currentAudio.volume = 1;
    }
  });

mp.currentAudio.addEventListener("ended", function(event) {
  if (mp.currentTrack === mp.playList.length - 1) mp.currentTrack = 1;
  else mp.currentTrack++;
  playCurrentTrack(mp.currentTrack);
});
