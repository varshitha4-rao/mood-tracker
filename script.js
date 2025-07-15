function saveMood() {
  const mood = document.getElementById('moodSelect').value;
  if (!mood) {
    alert("Please select a mood!");
    return;
  }

  const date = new Date().toLocaleDateString();
  const entry = ${date} - ${mood};

  let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
  moods.unshift(entry);
  localStorage.setItem("moodHistory", JSON.stringify(moods));

  displayMoods();
}

function displayMoods() {
  const moodList = document.getElementById('moodHistory');
  moodList.innerHTML = "";
  let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];

  moods.forEach(mood => {
    const li = document.createElement('li');
    li.textContent = mood;
    moodList.appendChild(li);
  });
}

window.onload = displayMoods;