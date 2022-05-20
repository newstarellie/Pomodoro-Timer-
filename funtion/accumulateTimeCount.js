//計算累積時間
let accumulateTimeCount= function (AllAccumulateTime) {
    accumulateHours = Math.floor(AllAccumulateTime / 3600);
    accumulateMinutes = Math.floor((AllAccumulateTime / 60)%60);
    accumulateSecondes = AllAccumulateTime % 60;

  
    $('.accumulateSecondes').text(accumulateSecondes);
    $('.accumulateMinutes').text(accumulateMinutes);
    $('.accumulateHours').text(accumulateHours);

    

}

export default accumulateTimeCount;