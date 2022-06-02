$(document).ready(function () {
  $(".btn-start").on("click", function () {
    let accumulationTime = 0; //累計總時長
    let accumulateArr = []; //累加時間 用於計時
    let originalArr = []; //個階段鬧鐘時長
    let cycleTimes = 3;

    for (let n = 0; n < cycleTimes; n++) {
      //抓取輸入的值
      for (let i = 1; i < 5; i++) {
        //所有時間總和
        accumulationTime += Number(
          $(`fieldset div:nth-child(${i}) input`).val() * 60
        );
        //形成陣列 設定成響鈴的時間
        accumulateArr.push(accumulationTime);
        originalArr.push($(`fieldset div:nth-child(${i}) input`).val() * 60);
      }
    }
    count(accumulationTime, accumulateArr, originalArr);
  });

  function count(accumulationTime, accumulateArr, originalArr) {
    let nowTime = 0; //目前累積時間
    let countDown = accumulateArr[0]; //要倒數的時間
    let workTime = 0;

    timer = setInterval(function () {
      if (accumulationTime > 0) {
        //先載入第一個鬧鐘時間
        if (nowTime < accumulateArr[0]) {
          $(".alarmText").text("工作時間");
          $("body").css("background-color", "#FFC0BE");
          workTime += 1;
          workTimeToLocal(workTime);
          countSecondToMinuteAndHour(workTime, ".showAccumulateTime");
        }

        for (let i = 0; i < accumulateArr.length + 1; i++) {
          //判斷特定秒數就轉換狀態
          if (nowTime == accumulateArr[i]) {
            workTimeToLocal(workTime);
            countSecondToMinuteAndHour(workTime, ".showAccumulateTime");
            //accumulateArr[0]=3 三秒後要幫下一個鬧鐘倒數計時
            //所以要抓取原本設定的時間 取i=1的位置
            countDown = originalArr[i + 1];
            //這是變色設定
            //accumulateArr[0]=3  要變成下一個鬧鐘的顏色
            //三秒後進入休息模式
            if (i % 2 == 0) {
              $(".alarmText").text("休息時間");
              $("body").css("background-color", "green");
              textAlarm(workTimeAlarm);
            } else if (i % 2 == 1) {
              $(".alarmText").text("工作");
              $("body").css("background-color", "#FFC0BE");
              textAlarm(breakTimeAlarm);
            }
          }
          //工作鬧鐘要累積 到工作時間
          if (accumulateArr[i] < nowTime && nowTime < accumulateArr[i + 1]) {
            if (i % 2 == 1) {
              workTime += 1;
              //console.log("workTime" + workTime);
              workTimeToLocal(workTime);
              countSecondToMinuteAndHour(workTime, ".showAccumulateTime");
            }
          }
        }
        //當下的鬧鐘 倒數計時
        countDown -= 1;
        //計算倒數計時時間
        countSecondToMinuteAndHour(countDown, ".countDownTime");
        //所有鬧鐘的累積時間 -1
        accumulationTime -= 1;

        nowTime += 1;
      } else {
        $("body").css("background-color", "#FDFDEB");
        $(".alarmText").text("結束計時");
        clearInterval(timer);
      }
    }, 1000);
  }
});
