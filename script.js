function start() {

  setInterval(updateTime, 100);
  var option1 = document.getElementById("time_select_start");
  console.log(option1.selectedIndex);
  for (var i = 0; i < option1.length; i++) {
    option1.selectedIndex = i;
    var hours = getHours();
    if (option1.value == hours.toLowerCase()) {
      i = option1.length;
    }
  }
  document.getElementById("time_select_last").selectedIndex = option1.length - 1;
  createTimetable();
}

function getHours() {
  hours = new Date().getHours();
  if (hours > 12) {
    hours = ((hours % 12) ) + "PM";
  } else if (hours == 12) {
    hours = "12PM"
  } else {
    hours = hours + "AM";
  }
  return hours;
}

function getDay() {
  var date = new Date();
  var weekday = new Array(7);
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[date.getDay()];
}

function updateTime() {
  var date = new Date();

  document.getElementById("day").innerHTML = getDay();
  document.getElementById("time").innerHTML = getHours().substr(0, getHours().length - 2) + ":" + date.getMinutes() + getHours().substr(getHours().length - 2, getHours().length);
}

function createTimetable() {

  var selectedStartIndex = document.getElementById("time_select_start").selectedIndex;
  var selectedStartValue = document.getElementById("time_select_start").options[selectedStartIndex].text;
  var startTime = parseInt(selectedStartValue.slice(0, -2));
  var morning = (selectedStartValue.slice(-2) == "AM");

  var selectedFinishIndex = document.getElementById("time_select_last").selectedIndex;
  var selectedFinishValue = document.getElementById("time_select_last").options[selectedFinishIndex].text;
  var finishTime = parseInt(selectedFinishValue.slice(0, -2));
  var afternoon = (selectedFinishValue.slice(-2) == "PM");

  var tt = "";
  var template = '<li class="times">%1%2<span class="peoplelist">%3</span></li>';
  if (!afternoon && morning) {
      for (var i = startTime; i < finishTime; i++) {
        tt += template.replace('%1', i).replace('%2', "AM").replace("%3", getTimetableList (getDay(), i + "AM"));
      }
  } else if (morning && afternoon) {
    for (var i = startTime; i < 12; i++) {
      tt += template.replace('%1', i).replace('%2', "AM").replace("%3", getTimetableList (getDay(), i + "AM"));
    }
      tt += template.replace('%1', i).replace('%2', "PM").replace("%3", getTimetableList (getDay(), "12PM"));
    for (var i = 1; i < finishTime; i++) {
      tt += template.replace('%1', i).replace('%2', "PM").replace("%3", getTimetableList (getDay(), i + "PM"));
    }
  } else if (afternoon && !morning) {
    for (var i = startTime; i < finishTime; i++) {
      tt += template.replace('%1', i).replace('%2', "PM").replace("%3", getTimetableList (getDay(), i + "PM"));
    }
  }

  document.getElementById('timetable').innerHTML = tt;
}

function getNames () {
  return ["Sean", "Ryan", "Pierce", "Connor", "Scott", "Girish"];
}

function getTimetableList (day, time) {
  names = getNames();
  used_names = [];
  var html = "<br />%1";
  var times = data[day];
  if (Object.keys(times).includes(time)) {
    var classes = Object.keys(times[time]);
    for (var i = 0; i < classes.length; i++) {
      var className = classes[i]
      html += "<br /><b>" + className + "</b>";
      people = times[time][className]
      for (var j = 0; j < people.length; j++) {
        if (names.includes(people[j])) {
          html += "<br />" + people[j];
          used_names.push(people[j]);
        }
      }
      html += "<br />";
    }
  }
  var free = "";
  var unused_names = [];
  for (var i  = 0; i < names.length; i++) {
    if (!used_names.includes(names[i])) {
      unused_names.push(names[i]);
    }
  }
  if (unused_names.length != 0) {
    free += "<br /><b>Free</b>";
    for (var i  = 0; i < unused_names.length; i++) {
      free += "<br />" + unused_names[i];
    }
    free += "<br />";
  }
  html = html.replace("%1", free);
  return html;
}
