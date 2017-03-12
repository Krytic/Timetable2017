function start() {
  createTimetable();
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
  var template = '<li class="times">%1%2%3</li>';
  if (!afternoon && morning) {
      for (var i = startTime; i < finishTime; i++) {
        tt += template.replace('%1', i).replace('%2', "AM").replace("%3", getPeopleList (i + "AM"));
      }
  } else if (morning && afternoon) {
    for (var i = startTime; i < 12; i++) {
      tt += template.replace('%1', i).replace('%2', "AM").replace("%3", getPeopleList (i + "AM"));
    }
      tt += '<li class="times">12PM</li>';
    for (var i = 1; i < finishTime; i++) {
      tt += template.replace('%1', i).replace('%2', "PM").replace("%3", getPeopleList (i + "PM"));
    }
  } else if (afternoon && !morning) {
    for (var i = startTime; i < finishTime; i++) {
      tt += template.replace('%1', i).replace('%2', "PM").replace("%3", getPeopleList (i + "PM"));
    }
  }

  document.getElementById('timetable').innerHTML = tt;
}

function getPeopleList (time) {
  var timetable = JSON.parse(data);
  var a = "";

  return a;
}
