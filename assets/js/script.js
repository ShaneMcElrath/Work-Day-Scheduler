


var findHour = function() {
  var hour = moment().format('HH');
  changeColor(hour)
};

var changeColor = function(hour) {

  for (var i = 9; i <= 17; i++) {

    var timeblock = $(".activitys").eq(i - 9);

    $(timeblock).removeClass("past present future");

    console.log(i);

    if (i < hour) {
      $(timeblock).addClass("past");
    }
    else if (i == hour) {
      $(timeblock).addClass("present");
    }
    else if (i > hour) {
      $(timeblock).addClass("future");
    }
  }
};




findHour();
setInterval(findHour, 60000);