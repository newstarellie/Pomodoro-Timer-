$(document).ready(function () {
  $("p").toggle(
    function () {
      $("body").css("background-color", "green");
    },
    function () {
      $("body").css("background-color", "red");
    }
  );
});
