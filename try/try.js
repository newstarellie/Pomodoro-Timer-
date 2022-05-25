let muted = false;
$(document).ready(function () {
  $(".muteButton").toggle(
    function () {
      muted = true;
      $(".muteButton").text("已靜音");
      $("body").css("background-color", "green");
    },
    function () {
      muted = false;
      $("body").css("background-color", "red");
      $(".muteButton").text("靜音");
    }
  );
  $("button").on("click", function () {
    if (!muted) {
      finishedAlarm("123");
    }
  });

  function finishedAlarm(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = ["zh-TW"]; //英文
    msg.volume = 100; // 聲音的音量
    msg.rate = 0.7; //語速，數值，預設值是1，範圍是0.1到10
    msg.pitch = 1.5; // 表示說話的音高，數值，範圍從0（最小）到2（最大）。預設值為1
    speechSynthesis.speak(msg);
  }
});
