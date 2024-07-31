// DOM Elements
const nowPlaying = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");

const playPauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");

const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");

// Track Management
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Audio Element
const currTrack = new Audio();

// Track List
const trackList = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
  },
];

// Random Background Color
const randomBgColor = () => {
  const getRandomColorValue = () => Math.floor(Math.random() * 256) + 64;
  
  const red = getRandomColorValue();
  const green = getRandomColorValue();
  const blue = getRandomColorValue();
  
  document.body.style.background = `rgb(${red}, ${green}, ${blue})`;
};

// Load Track
const loadTrack = (index) => {
  clearInterval(updateTimer);
  resetValues();
  
  currTrack.src = trackList[index].path;
  currTrack.load();

  trackArt.style.backgroundImage = `url(${trackList[index].image})`;
  trackName.textContent = trackList[index].name;
  trackArtist.textContent = trackList[index].artist;
  nowPlaying.textContent = `PLAYING ${index + 1} OF ${trackList.length}`;

  updateTimer = setInterval(seekUpdate, 1000);
  currTrack.addEventListener("ended", nextTrack);
  randomBgColor();
};

// Reset Values
const resetValues = () => {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
};

// Play/Pause Track
const playPauseTrack = () => {
  isPlaying ? pauseTrack() : playTrack();
};

// Play Track
const playTrack = () => {
  currTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
};

// Pause Track
const pauseTrack = () => {
  currTrack.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
};

// Next Track
const nextTrack = () => {
  trackIndex = (trackIndex < trackList.length - 1) ? trackIndex + 1 : 0;
  loadTrack(trackIndex);
  playTrack();
};

// Previous Track
const prevTrack = () => {
  trackIndex = (trackIndex > 0) ? trackIndex - 1 : trackList.length - 1;
  loadTrack(trackIndex);
  playTrack();
};

// Seek to Position
const seekTo = () => {
  const seekTo = currTrack.duration * (seekSlider.value / 100);
  currTrack.currentTime = seekTo;
};

// Set Volume
const setVolume = () => {
  currTrack.volume = volumeSlider.value / 100;
};

// Update Seek Slider and Time
const seekUpdate = () => {
  if (!isNaN(currTrack.duration)) {
    const seekPosition = (currTrack.currentTime / currTrack.duration) * 100;
    seekSlider.value = seekPosition;

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    currTime.textContent = formatTime(currTrack.currentTime);
    totalDuration.textContent = formatTime(currTrack.duration);
  }
};

// Initialize
loadTrack(trackIndex);

// Event Listeners
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
seekSlider.addEventListener("input", seekTo);
volumeSlider.addEventListener("input", setVolume);
