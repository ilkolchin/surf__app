(function () {

  let video;
  let durationControl;
  let soundControl;
  let intervalId;

  const playBtn = $('.video__player-img');
  const soundBtn = $('.sound');
  const playerPlayBtn = $('.duration__img');

  video = $('#player');

  video.on('loadeddata', () => {
    console.log('VIDEO LOADED');

    video.on('click', playStop);

    $('.play').on('click', playStop);

    durationControl = $('#durationLevel');
    durationControl[0].min = 0;
    durationControl[0].value = 0;
    durationControl[0].max = video[0].duration;
    durationControl.on('input', setVideoTime);

    $('#mic').on('click', soundOf);

    const soundControl = $('#miclevel');
    soundControl[0].min = 0;
    soundControl[0].value = 10;
    soundControl[0].max = soundControl[0].max;
    soundControl.on('input', changeSoundVolume);
    

  })

  function playStop() {

    playBtn.toggleClass('video__player-img--active');

    if (video[0].paused) {

      video[0].play();
      playerPlayBtn.addClass('active');
      intervalId = setInterval(updateTime, 1000 / 60);

    } else {
      video[0].pause();
      playerPlayBtn.removeClass('active');
      clearInterval(intervalId);

    }
  }

  function setVideoTime() {
    video[0].currentTime = durationControl[0].value;
    updateTime();
  }

  function updateTime() {
    durationControl[0].value = video[0].currentTime;
    const step = video[0].duration / 100;
    const percent = video[0].currentTime / step;

    durationControl.css('background', `linear-gradient(90deg, #FEDB3F 0%, #FEDB3F ${percent}%, #626262 ${percent}%)`);
  }

  function soundOf() {
    if (video[0].volume === 0) {

      video[0].volume = 1;
      soundBtn.removeClass('active');

    } else {

      video[0].volume = 0;
      soundBtn.addClass('active');

    }
  }

  function changeSoundVolume() {
    video[0].volume = soundControl.value / 10;

    if (video[0].volume === 0) {

      soundBtn.addClass('active');

    } else {

      soundBtn.removeClass('active');

    }
  }

})()