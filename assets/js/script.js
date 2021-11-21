var lastHour;
var activityListText = [];

//Finds hour of current timezone then calls changeColor.
var findHour = function() {
  var hour = moment().format('HH');
  changeColor(hour)
};

//Loops though every timeblock and changes its color based on time of day.
var changeColor = function(hour) {

  //if
  //this is the first time this function is running meaning lasthour is equal to null 
  //OR 
  //the hour has changed since this function was last run 
  if (!lastHour || lastHour !== hour) {

    //loops though every timeblock starting at 9am and ending at 5pm
    //and changes there color based on the time.
    for (var i = 9; i <= 17; i++) {

      //selects a time block based on i value
      var timeblock = $(".activitys").eq(i - 9);
      //removes all backround colors using classes
      $(timeblock).removeClass("past present future");

      //if timeblock is in the past turn gray
      if (i < hour) {
        $(timeblock).addClass("past");
      }
      //if timeblock is in the present turn red
      else if (i == hour) {
        $(timeblock).addClass("present");
      }
      //if timeblock is in the future turn green
      else if (i > hour) {
        $(timeblock).addClass("future");
      }
    }

    //After colors change because of time change set last hour to the current hour
    lastHour = hour;
  }
};

//Saves user input of specific textarea to local storage
var saveTextArea = function() {
  //gets index of the timeblock
  var index = $(this).index(".save");
  //gets value of textarea in specific timeblock
  var timeblock = $(".activitys").eq(index).val();

  //Puts value of textarea in array at specific index
  activityListText[index] = (timeblock);
  //saves activityListText array to local storage
  localStorage.setItem("Text", JSON.stringify(activityListText));
};

var loadTextArea = function() {
  //gets activityListText array from local storage
  activityListText = JSON.parse(localStorage.getItem("Text"));
  console.log(activityListText);

  //if activityListText is null set it to an array
  if (!activityListText) {
    activityListText = [];
  }

  //loops through activityListText array to find any saved text using i and index
  for (var i = 0; i <= 9; i++) {
    //if activityListText at specific index is NOT null
    if (activityListText[i]) {
      //Set textarea with index i, to activityListText[i]
      $(".activitys").eq(i).val(activityListText[i]);
    }
  }
};

var findAndSetDate = function() {
  var date = moment().format('dddd, MMMM Do');
  $('#currentDay').text(date);
};



findHour();
findAndSetDate();
loadTextArea();

//OnClick of a element with class="save" run saveTextArea function
$(".save").on("click", saveTextArea);

//Every sixty seconds run findHour function
setInterval(findHour, 60000);
setInterval(findAndSetDate, 60000);