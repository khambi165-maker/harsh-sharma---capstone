// basic variables
let time = 0;
let timerRunning = false;
let timerRef = null;

// getting stored data (if any)
let savedSessions = JSON.parse(localStorage.getItem("sessions")) || [];
let distractionCount = JSON.parse(localStorage.getItem("distractions")) || 0;

// set initial distraction value
document.getElementById("distractionCount").innerText = distractionCount;

// show report on load
updateReport();



function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value.trim() === "") return;

  let li = document.createElement("li");
  li.innerText = value;

  document.getElementById("taskList").appendChild(li);


  input.value = "";
}



function startTimer() {
  if (timerRunning) return;

  timerRunning = true;

  timerRef = setInterval(() => {
    time++;
    updateTimerUI();
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerRef);
}

function updateTimerUI() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  document.getElementById("time").innerText =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;
}


function saveSession() {
  if (time === 0) return;

  savedSessions.push(time);
  localStorage.setItem("sessions", JSON.stringify(savedSessions));

  time = 0;
  updateTimerUI();
  updateReport();
}


//
function addDistraction() {
  distractionCount++;

  localStorage.setItem("distractions", distractionCount);

  document.getElementById("distractionCount").innerText = distractionCount;

  updateReport();
}


// ===
function updateReport() {
  let totalSeconds = 0;

  for (let i = 0; i < savedSessions.length; i++) {
    totalSeconds += savedSessions[i];
  }

  let minutes = Math.floor(totalSeconds / 60);

  document.getElementById("totalTime").innerText =
    "Total time: " + minutes + " min | Distractions: " + distractionCount;
}
