$(document).ready(function () {
  //提醒文字
  let breakTimeAlarm = $('input[id="break-time-alarm"]').val();
  let workTimeAlarm = $('input[id="work-time-alarm"]').val();
  let finishedTimeAlarm = $('input[id="finished-time-alarm"]').val();

  //累積時間
  let workTime = Number(localStorage.getItem("accumulateWorkTime"));

  //循環次數設定
  let cycleTimes = $('input[id="cycle-times"]').val();
  //計時器
  let timer;

  //頁面載入當下設定
  window.onload = function () {
    $(".btn-stop").attr("disabled", "disabled");
    $("body").css("background-color", "#FDFDEB");
    if (workTime) {
      countSecondToMinuteAndHour(workTime, ".showAccumulateTime");
    } else {
      workTime = 0;
      localStorage.setItem("accumulateWorkTime", 0);
    }
  };
  $("input").change(function (e) {
    e.preventDefault();
    {
      //偵測輸入數字 判斷正確輸入
      let alert1 = false;
      let a = 1;
      for (let i = 1; i < 5; i++) {
        a = $(`.clock-list div:nth-child(${i}) input`).val();
        if (a == 0) {
          alert1 = true;
        }
      }
      if (alert1 == true) {
        alert("時間設定不可為0");
        alert1 = false;
        $(".btn-start").attr("disabled", "disabled");
      } else {
        $(".btn-start").removeAttr("disabled");
      }
    }
    {
      //偵測輸入文字
      let alert2 = false;
      let b = "";
      for (let i = 1; i < 5; i++) {
        b = $(`.textSetting div:nth-child(${i}) input`).val();
        if (!b) {
          alert2 = true;
        }
      }
      if (alert2 == true) {
        alert("提醒文字必填");
        alert2 = false;
        $(".btn-start").attr("disabled", "disabled");
      } else {
        $(".btn-start").removeAttr("disabled");
      }
    }
  });

  $(".btn-start").on("click", function () {
    let accumulationTime = 0; //所有時間總和
    let accumulateArr = []; //累加時間的陣列  秒數=切換頁面狀態的時間
    let originalArr = []; //個階段鬧鐘時長  原始輸入時間的陣列

    $("input").attr("readonly", "readonly");
    $("body").css("background-color", "#FFC0BE");
    $(".btn-stop").removeAttr("disabled");
    $(this).attr("disabled", "disabled");
    //工作時間提醒
    textAlarm(workTimeAlarm);
    $(".alarmText").text("工作時間");

    //番茄鐘循環的次數
    for (let n = 0; n < cycleTimes; n++) {
      //抓取頁面輸入的值
      for (let i = 1; i < 5; i++) {
        //計算所有時間總和
        accumulationTime += Number(
          $(`fieldset div:nth-child(${i}) input`).val() * 60
        );
        //形成累加時間的陣列  秒數=切換頁面狀態的時間
        accumulateArr.push(accumulationTime);
        //形成原始輸入時間的陣列
        originalArr.push($(`fieldset div:nth-child(${i}) input`).val() * 60);
      }
    }
    count(accumulationTime, accumulateArr, originalArr);
  });

  $(".btn-stop").on("click", function () {
    clearInterval(timer);
    $(".btn-start").removeAttr("disabled");
    $(this).attr("disabled", "disabled");
    $("body").css("background-color", "#FDFDEB");
    $("input").removeAttr("readonly");
    $(".alarmText").text("點擊開始計時");
    textAlarm("停止計時");
  });

  function count(accumulationTime, accumulateArr, originalArr) {
    let nowTime = 0; //目前累積時間
    let countDown = accumulateArr[0]; //要倒數的時間

    timer = setInterval(function () {
      if (accumulationTime > 0) {
        //先載入第一個鬧鐘 因為下面的判斷式 不會算到第一個鬧鐘的時間
        if (nowTime < accumulateArr[0]) {
          $(".alarmText").text("工作時間");
          $("body").css("background-color", "#FFC0BE");
          workTime += 1;
          workTimeToLocal(workTime);
          countSecondToMinuteAndHour(workTime, ".showAccumulateTime");
        }
        //利用迴圈 +判斷式 讓鬧鐘在accumulateArr的秒數切換
        for (let i = 0; i < accumulateArr.length + 1; i++) {
          if (nowTime == accumulateArr[i]) {
            workTimeToLocal(workTime);
            countSecondToMinuteAndHour(workTime, ".showAccumulateTime");
            //設定鬧鐘的倒數計時時間
            countDown = originalArr[i + 1];

            //判斷鬧鐘類型 來改變頁面狀態
            if (i % 2 == 0) {
              //當下秒數 還是工作時間 所以要+1
              workTime += 1;
              $(".alarmText").text("休息時間");
              $("body").css("background-color", "green");
              textAlarm(workTimeAlarm);
            } else if (i % 2 == 1) {
              $(".alarmText").text("工作");
              $("body").css("background-color", "#FFC0BE");
              textAlarm(breakTimeAlarm);
            }
          }
          //基數鬧鐘時間 累積到工作時數
          if (accumulateArr[i] < nowTime && nowTime < accumulateArr[i + 1]) {
            if (i % 2 == 1) {
              workTime += 1;
              //console.log("workTime" + workTime);
              workTimeToLocal(workTime);
              countSecondToMinuteAndHour(workTime, ".showAccumulateTime");
            }
          }
        }
        countDown -= 1;
        countSecondToMinuteAndHour(countDown, ".countDownTime");
        accumulationTime -= 1;
        nowTime += 1;
      } else {
        $("body").css("background-color", "#FDFDEB");
        $(".alarmText").text("結束計時");
        textAlarm(finishedTimeAlarm);
        clearInterval(timer);
      }
    }, 1000);
  }

  //語音提示設定
  function textAlarm(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = ["zh-TW"];
    msg.volume = 100; // 聲音的音量
    msg.rate = 0.7; //語速，數值，預設值是1，範圍是0.1到10
    msg.pitch = 1.5; // 表示說話的音高，數值，範圍從0（最小）到2（最大）。預設值為1
    speechSynthesis.speak(msg);
  }
  //計算秒數變成時分秒
  function countSecondToMinuteAndHour(second, place) {
    //計算時間
    let showHour = Math.floor(second / 3600);
    let showMinutes = Math.floor(second / 60) % 60;
    let showSecond = second % 60;
    //顯示於頁面
    if (showHour < 10) {
      //加上0 防止版型跑掉
      $(`${place} p:nth-child(2)`).text(`0${showHour}時`);
    } else {
      $(`${place} p:nth-child(2)`).text(`${showHour}小時`);
    }
    if (showMinutes < 10) {
      $(`${place} p:nth-child(3)`).text(`0${showMinutes}分`);
    } else {
      $(`${place} p:nth-child(3)`).text(`${showMinutes}分`);
    }
    if (showSecond < 10) {
      $(`${place} p:nth-child(4)`).text(`0${showSecond}秒`);
    } else {
      $(`${place} p:nth-child(4)`).text(`${showSecond}秒`);
    }
  }

  function workTimeToLocal(workTime) {
    localStorage.setItem("accumulateWorkTime", workTime);
  }
  console.log(`累積工作時間:${累積工作時間}`);
});
