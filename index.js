$(document).ready(function () {
  let setTime_Second;
  let setText = "";
  let setDataNum = "";
  //倒數剩餘時間
  let countLeftTime;
  //所有的累積時間
  let AllAccumulateTime_second = 0;
  let a = localStorage.getItem("AllAccumulateTime_second");
  if (a) {
    AllAccumulateTime_second = parseInt(a);
  } else {
    localStorage.setItem("AllAccumulateTime_second", 0);
  }
  //localStorage.setItem("AllAccumulateTime_second", 0);
  //console.log(typeof AllAccumulateTime_second, AllAccumulateTime_second);

  //累積時間 換算成小時、分鐘、秒
  let accumulateHours = 0;
  let accumulateMinutes = 0;
  let accumulateSecondes = 0;
  //計時器
  let timer;
  //一開始只有"開始計時"可以點擊
  window.onload = function () {
    $(".pause").attr("disabled", "disabled");
    $(".continue").attr("disabled", "disabled");
    $(".stop").attr("disabled", "disabled");
    //console.log(typeof AllAccumulateTime_second, AllAccumulateTime_second);
    accumulateTimeCount(AllAccumulateTime_second);
  };
  $(".button-list").on("click", ".start", function (e) {
    setTime_Second =
      60 * $(this).parent().parent().parent().find(".time-set").val();
    setText = $(this).parent().parent().parent().find(".text-set").val();
    setDataNum = $(this).parent().parent().parent().attr("data-num");

    countDown(setTime_Second, setText);

    $(this).attr("disabled", "disabled");
    /**只有這組的按鈕會改變 */
    $(this).parent().siblings().find(".pause").removeAttr("disabled");
    $(this).parent().siblings().find(".stop").removeAttr("disabled");
    //其他組的開始不能點擊
    $(this)
      .parent()
      .parent()
      .parent()
      .siblings()
      .find(".start")
      .attr("disabled", "disabled");
    //點擊之後其他時鐘會便灰色
    $(this).parent().parent().parent().siblings().addClass("clock-disabled");
  });
  $(".button-list").on("click", ".pause", function (e) {
    clearInterval(timer);
    $(this).attr("disabled", "disabled");
    $(this).parent().siblings().find(".continue").removeAttr("disabled");
  });
  $(".button-list").on("click", ".continue", function (e) {
    //console.log(e.target);
    countDown(setTime_Second);
    $(this).attr("disabled", "disabled");
    $(this).parent().siblings().find(".pause").removeAttr("disabled");
  });
  $(".button-list").on("click", ".stop", function (e) {
    //console.log(e.target);
    clearInterval(timer);
    setTime_Second = 0;
    secondToTime(setTime_Second);
    $(this).attr("disabled", "disabled");
    $(this).parent().siblings().find(".start").removeAttr("disabled");
    //所有的Start都可以點擊 pause continue不可點擊
    $(".start").removeAttr("disabled");
    $(".pause").attr("disabled", "disabled");
    $(".continue").attr("disabled", "disabled");

    //所有鬧鐘顏色變回正常 可以使用
    $(this).parent().parent().parent().siblings().removeClass("clock-disabled");
  });

  //倒數計時
  function countDown(time, text) {
    timer = setInterval(
      function () {
        if (time >= 0) {
          setLocalStorage(AllAccumulateTime_second);
          secondToTime(time);
          accumulateTimeCount(AllAccumulateTime_second);
          time -= 1;
          AllAccumulateTime_second += 1;
        } else if ((time = 1)) {
          finishedAlarm(text);
        } else {
          clearInterval(timer);
        }
      },

      1000
    );
  }
  //計算倒數時間
  function secondToTime(allSecond) {
    let hour = Math.floor(allSecond / 3600);
    let minutes = Math.floor(allSecond / 60) % 60;
    let second = allSecond % 60;
    $(".countDownMinute").text(`${minutes}分鐘`);
    $(".countDownSecond").text(`${second}秒`);
  }
  //將累積的時間 機到localStorage
  function setLocalStorage(time) {
    console.log(AllAccumulateTime_second);
    localStorage.setItem("AllAccumulateTime_second", AllAccumulateTime_second);
  }
  setLocalStorage(10);
  //設定結束語
  function finishedAlarm(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = ["zh-TW"]; //英文
    msg.volume = 100; // 聲音的音量
    msg.rate = 0.7; //語速，數值，預設值是1，範圍是0.1到10
    msg.pitch = 1.5; // 表示說話的音高，數值，範圍從0（最小）到2（最大）。預設值為1
    speechSynthesis.speak(msg);
  }
  //
  function accumulateTimeCount(time) {
    accumulateHours = Math.floor(time / 3600);
    accumulateMinutes = Math.floor((time / 60) % 60);
    accumulateSecondes = time % 60;

    $(".accumulateSecondes").text(`${accumulateSecondes}秒`);
    $(".accumulateMinutes").text(`${accumulateMinutes}分鐘`);
    $(".accumulateHours").text(`${accumulateHours}小時`);
  }
});
