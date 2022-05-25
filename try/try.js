$(document).ready(function () {
  let volume = $("input").val() / 100;
  //console.log(volume);
  $(".volume").change(function (e) {
    e.preventDefault();
    volume = $("input").val() / 100;
    //console.log(volume);
  });
  $(".btn1").on("click", function () {
    playAudio(volume);
  });

  function playAudio(volume) {
    const audio = new Audio(
      "https://github.com/newstarellie/Pomodoro-Timer-/blob/main/drump.mp3?raw=true"
    );
    audio.volume = volume;
    audio.play();
  }
});
