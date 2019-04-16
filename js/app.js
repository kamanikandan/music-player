// Audio Player
class MusicPlayer {
  constructor() {
    this.playList = [];
    this.currentAudio = document.getElementById("audio-track");
    this.currentTrack = 1;
    this.playLoop = false;
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
    title: "Never Let you go",
    artist: "David Smith",
    url: "audios/audio3.mp3"
  },
  {
    id: 11,
    title: "Believe in yourself",
    artist: "John Doe",
    url: "audios/audio2.mp3"
  },
  {
    id: 12,
    title: "Dunnock in Second",
    artist: "John Smith",
    url: "audios/audio1.mp3"
  }
];
generatePlayList();
//Creating PlayList from Object
function generatePlayList() {
  let audioPlayList = document.getElementById("audio-playlist");
  mp.playList.forEach((music, index) => {
    let tr = `<tr class="" id=audio${music.id} data-music-url=${music.id}>
        <td>${index + 1}</td>
        <td>${music.title}</td>
        <td>${music.artist}</td>
        <td>3.32</td>
      </tr>`;
    audioPlayList.innerHTML += tr;
  });
}

//Binding click event for all tracks
let tableRows = document.querySelectorAll(".audio-playlist tr");
tableRows.forEach(element => {
  element.addEventListener("click", function(event) {
    tableRows.forEach(el => {
      el.classList.remove("playing-track");
    });
    event.currentTarget.classList.add("playing-track");
    let audioTrack =
      event.target.parentElement.getAttribute("data-music-url") ||
      event.target.getAttribute("data-music-url");
    mp.currentTrack = parseInt(audioTrack);
    playCurrentTrack(mp.currentTrack);
    document.getElementById("audio-play").style.display = "none";
    document.getElementById("audio-pause").style.display = "inline-block";
  });
});

//Play the current selected Audio
function playCurrentTrack(currentTrack) {
  let currentAudio = mp.playList[currentTrack - 1];
  mp.currentTrack = currentTrack;
  document.getElementById("currentTrackTitle").innerHTML = currentAudio.title;
  document.getElementById("currentTrackArtist").innerHTML = currentAudio.artist;
  mp.currentAudio.setAttribute("src", currentAudio.url);
  mp.currentAudio.play();
}

// Controls whether to loop or not
let audioLoop = 1;
document
  .getElementById("audio-loop")
  .addEventListener("click", function(event) {
    if (audioLoop === 1) {
      mp.playLoop = true;
      audioLoop = 2;
    } else mp.audioLoop = false;
  });

// Control to Play an Audio
document
  .getElementById("audio-play")
  .addEventListener("click", function(event) {
    document.getElementById("audio-play").style.display = "none";
    document.getElementById("audio-pause").style.display = "inline-block";
    playCurrentTrack(mp.currentTrack);
  });

// Control to Pause an Audio
document
  .getElementById("audio-pause")
  .addEventListener("click", function(event) {
    document.getElementById("audio-pause").style.display = "none";
    document.getElementById("audio-play").style.display = "inline-block";
    mp.currentAudio.pause();
  });

//Play Next Audio
document
  .getElementById("audio-next")
  .addEventListener("click", function(event) {
    if (mp.currentTrack === mp.playList.length - 1) mp.currentTrack = 1;
    else mp.currentTrack++;
    playCurrentTrack(mp.currentTrack);
  });

//Play Previous Audio
document
  .getElementById("audio-prev")
  .addEventListener("click", function(event) {
    if (mp.currentTrack === 1) mp.currentTrack = mp.playList.length - 1;
    else mp.currentTrack--;
    playCurrentTrack(mp.currentTrack);
  });

// Increase Volume
document
  .getElementById("audio-volume")
  .addEventListener("click", function(event) {
    if (mp.currentAudio.volume !== 1) {
      mp.currentAudio.volume = (mp.currentAudio.volume + 0.1).toFixed(1);
    } else {
      mp.currentAudio.volume = 1;
    }
  });

//Play Next Audio if Ended
mp.currentAudio.addEventListener("ended", function(event) {
  if (mp.currentTrack === mp.playList.length && mp.playLoop) {
    mp.currentTrack = 1;
  } else mp.currentTrack++;
  if (mp.currentTrack !== mp.playList.length) {
    let nextAudio = document.getElementById("audio" + mp.currentTrack);
    nextAudio.click();
  }
});
