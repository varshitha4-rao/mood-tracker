function saveMood() {
  const mood = document.getElementById("moodSelect").value;
  const note = document.getElementById("moodNote").value;
  const date = new Date().toLocaleDateString();

  if (!mood) {
    alert("Please select a mood!");
    return;
  }

  const moodEntry = { mood, date, note };

  const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
  moodHistory.push(moodEntry);
  localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

  document.getElementById("moodSelect").value = "";
  document.getElementById("moodNote").value = "";

  displayMoodHistory();
  buildMoodChart();
  showQuote(mood);
  triggerAnimation(mood);
}

function displayMoodHistory() {
  const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const list = document.getElementById("moodHistory");
  list.innerHTML = "";

  moodHistory.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} — ${entry.mood}`;  // ✅ Use backticks

    if (entry.note && entry.note.trim() !== "") {
      const notePara = document.createElement("p");
      notePara.textContent = `Note: ${entry.note}`;     // ✅ Use backticks
      notePara.style.fontStyle = "italic";
      notePara.style.fontSize = "14px";
      notePara.style.marginTop = "4px";
      li.appendChild(notePara);
    }

    list.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem("moodHistory");
  displayMoodHistory();
  buildMoodChart();
}

function buildMoodChart() {
  const data = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const counts = {};

  data.forEach((entry) => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const values = Object.values(counts);

  const ctx = document.getElementById("moodChart").getContext("2d");

  if (window.moodChartInstance) {
    window.moodChartInstance.destroy();
  }

  window.moodChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          label: "Mood Count",
          data: values,
          backgroundColor: [
            "#ff9ff3",
            "#feca57",
            "#ff6b6b",
            "#48dbfb",
            "#1dd1a1",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

// Initial load
displayMoodHistory();
buildMoodChart();
function showQuote(mood) {
  const quotes = {
    "😊 Happy": [
      "Happiness looks good on you!",
      "Keep smiling, sunshine ☀️",
      "You’re glowing today ✨"
    ],
    "😢 Sad": [
      "It’s okay to feel down. Brighter days are coming 🌈",
      "You are not alone 🫂",
      "Crying cleanses the soul 🌧️"
    ],
    "😠 Angry": [
      "Take a deep breath. You’ve got this 💪",
      "Even storms run out of rain ⛈️",
      "Let it out, then let it go 💨"
    ],
    "😴 Tired": [
      "Rest is productive too 😴",
      "You deserve a break 🛌",
      "Recharge like a queen 👑"
    ],
    "😐 Meh": [
      "Some days are just... meh. That’s okay 🤷‍♀️",
      "You're allowed to just exist today 🌙",
      "Be gentle with yourself 💗"
    ]
  };

  const quoteList = quotes[mood] || ["You're doing great!"];
  const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  alert(randomQuote); // Optional: replace with styled popup later
}

function triggerAnimation(mood) {
  if (mood.includes("Happy")) {
    confetti(); // basic confetti 🎉
  }
}

// Minimal confetti using emoji fallback
function confetti() {
  const confettiDiv = document.createElement("div");
  confettiDiv.innerText = "🎉🎊🎈✨";
  confettiDiv.style.position = "fixed";
  confettiDiv.style.top = "40%";
  confettiDiv.style.left = "50%";
  confettiDiv.style.fontSize = "50px";
  confettiDiv.style.transform = "translate(-50%, -50%)";
  confettiDiv.style.animation = "fadeOut 2s ease-out forwards";
  document.body.appendChild(confettiDiv);

  setTimeout(() => {
    document.body.removeChild(confettiDiv);
  }, 2000);
}