$(document).ready(function () {
  $(".btn1").on("click", function () {
    playAudio100();
  });

  $(".btn2").on("click", function () {
    playAudio();
  });
});
function playAudio100() {
  const audio = new Audio("/drump.mp3");
  audio.volume = 1;
  audio.play();
}
function playAudio() {
  const audio = new Audio("/drump.mp3");
  audio.volume = 0.2;
  audio.play();
}
