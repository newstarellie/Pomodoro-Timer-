//cookie的值
//將取的值變成數字
let a = 1;
$.cookie("the_cookie", 1, { expires: 7 });
$("#cookieValue").text($.cookie("the_cookie"));
