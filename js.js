const song = document.getElementById("song");

const playBtn = document.querySelector(".play-inner");

const nextBtn = document.querySelector(".play-forward");

const backBtn = document.querySelector(".play-back");

const durationTime = document.querySelector(".duration");

const remainingTime = document.querySelector(".remaining");

const rangeBar = document.querySelector(".range");

const musicName = document.querySelector(".music-name");

const musicImg = document.querySelector(".Img img");

const musicThumb = document.querySelector(".Img");

const playRepeat = document.querySelector(".play-replay");


let isRepeat = false; 


let isPlaying = true;


let indexSong = 0;

// const musics = ["Timduocnhaukhothenao.mp3", "Tatnuocdaudinh.mp3", "Diudangemden.mp3", "Ngaykhongcoem.mp3"];

const musics = [
  {
    id: 1,
    title: 'Tìm được nhau khó thế nào',
    file: "Timduocnhaukhothenao.mp3",
    image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2020/10/5/842112/Anh-Tu-1-01.jpg"
  },

  {
    id: 2,
    title: 'Tát nước đầu đình',
    file: "Tatnuocdaudinh.mp3",
    image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/5/b/5b0e1e9f8bc5a40c9062cc20ef85929d_1441510933.jpg"
  },

  {
    id: 3,
    title: 'Dịu dàng em đến',
    file: "Diudangemden.mp3",
    image: "https://thegioidienanh.vn/stores/news_dataimages/thanhtan/082021/30/10/in_article/2720_01A.jpg?rt=20210830102911"
  },

  {
    id: 4,
    title: 'Ngày không có em',
    file: "Ngaykhongcoem.mp3",
    image: "https://i.ytimg.com/vi/LvHVGXn0fWU/maxresdefault.jpg"
  },

  {
    id: 5,
    title: 'Muộn rồi mà sao còn',
    file: "Muonroimasaocon.mp3",
    image: "https://upload.wikimedia.org/wikipedia/vi/9/93/S%C6%A1n_T%C3%B9ng_M-TP_-_Mu%E1%BB%99n_r%E1%BB%93i_m%C3%A0_sao_c%C3%B2n.png"
  },

  {
    id: 6,
    title: 'Có hẹn với thanh xuân',
    file: "Cohenvoithanhxuan.mp3",
    image: "https://media.yeah1.com/resize/1200x640/files/uploads/49/2021/07/23/60fa3063358eb.jpg"
  },

  {
    id: 7,
    title: 'Khi cô đơn em nhớ ai',
    file: "Khicodonemnhoai.mp3",
    image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/8/f/a/b8fa84127c1c180b94345d5e273bcaae.jpg"
  }
]

playRepeat.addEventListener("click", function() {
  if(isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  }

  else {
    isRepeat = true;
    playRepeat.style.color = "red";
  }
})  

nextBtn.addEventListener("click", function () {
  changeSong(1);
});

backBtn.addEventListener("click", function () {
  changeSong(-1);
});

song.addEventListener("ended", nextSong)

function nextSong() {
  if(isRepeat){
    isPlaying = true;
    playPause();
  }

  else {
    changeSong(1);
  }
}

function changeSong(dir) {
  if (dir == 1) {
    indexSong++;
    if (indexSong > musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  }

  else if (dir == -1) {
    indexSong--;
    if (indexSong <= 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }

  Init(indexSong);

  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}

playBtn.addEventListener("click", playPause);

function playPause() {
  if (isPlaying) {
    musicThumb.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause"></ion-icon>`;
    isPlaying = false;
  }

  else {
    musicThumb.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play-outline" ></ion-icon>`;
    isPlaying = true;
  }
}

function displayTimer() {
  const { duration, currentTime } = song;

  rangeBar.max = duration;

  rangeBar.value = currentTime;

  remainingTime.textContent = formatTimer(currentTime);

  if (!duration) {
    durationTime.textContent = "00:00";
  }

  else {
    durationTime.textContent = formatTimer(duration);
  }
}

function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

}
displayTimer();

setInterval(displayTimer, 1000);

rangeBar.addEventListener("change", changeBar)

function changeBar() {
  song.currentTime = rangeBar.value;
}

function Init(indexSong) {
  displayTimer();
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImg.setAttribute("src", musics[indexSong].image); 
  musicName.textContent = musics[indexSong].title;

}
displayTimer();
Init(indexSong);



