function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function saveMood() {
    let mood = document.getElementById("moodSelect").value;
    if (mood !== "") {
        let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        moods.push({ mood, date: new Date().toLocaleDateString() });
        localStorage.setItem("moodHistory", JSON.stringify(moods));
        displayMoodHistory();
        updateWellnessScore();
    }
}

function displayMoodHistory() {
    let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    let div = document.getElementById("moodHistory");
    div.innerHTML = "";
    moods.forEach(entry => {
        div.innerHTML += `<p>${entry.date} - ${entry.mood}</p>`;
    });
}

function updateWellnessScore() {
    let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    let score = 50;
    moods.forEach(entry => {
        if (entry.mood === "Happy") score += 5;
        if (entry.mood === "Sad") score -= 5;
        if (entry.mood === "Anxious") score -= 3;
    });
    score = Math.max(0, Math.min(100, score));
    document.getElementById("wellnessBar").value = score;
    document.getElementById("wellnessText").innerText =
        "Current Wellness Score: " + score;
}

function checkStress() {
    let level = document.getElementById("stressInput").value;
    let result = document.getElementById("stressResult");

    if (level >= 8) result.innerText = "High stress detected. Try breathing exercise.";
    else if (level >= 5) result.innerText = "Moderate stress. Take breaks.";
    else result.innerText = "Low stress. Keep going!";
}

document.getElementById("appointmentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;

    if (name && email && date) {
        localStorage.setItem("appointment", JSON.stringify({ name, email, date }));
        document.getElementById("appointmentMessage").innerText = "Appointment Saved!";
    }
});

function sendMessage() {
    let input = document.getElementById("chatInput").value.toLowerCase();
    let messages = document.getElementById("chatMessages");

    let botReply = "";

    if (input.includes("sad")) botReply = "I'm here for you. You are not alone.";
    else if (input.includes("stress")) botReply = "Try deep breathing.";
    else if (input.includes("happy")) botReply = "That's wonderful!";
    else if (input.includes("suicide") || input.includes("die"))
        botReply = "Please contact Helpline: 9152987821";
    else botReply = "Tell me more about your feelings.";

    messages.innerHTML +=
        `<p class="user-msg"><strong>You:</strong> ${input}</p>
         <p class="bot-msg"><strong>Bot:</strong> ${botReply}</p>`;

    document.getElementById("chatInput").value = "";
    messages.scrollTop = messages.scrollHeight;
}

function saveJournal() {
    let entry = document.getElementById("journalText").value;
    if (entry !== "") {
        localStorage.setItem("journalEntry", entry);
        document.getElementById("journalMessage").innerText = "Journal Saved!";
    }
}

function startBreathing() {
    let text = document.getElementById("breathingText");
    text.innerText = "Breathe In...";
    setTimeout(() => text.innerText = "Hold...", 4000);
    setTimeout(() => text.innerText = "Breathe Out...", 8000);
    setTimeout(() => text.innerText = "Repeat!", 12000);
}

function startTimer() {
    let time = 1500;
    let display = document.getElementById("timer");

    let interval = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        display.innerText = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        time--;
        if (time < 0) {
            clearInterval(interval);
            alert("Session Complete!");
        }
    }, 1000);
}

function addTask() {
    let task = document.getElementById("taskInput").value;
    let list = document.getElementById("taskList");

    if (task !== "") {
        let li = document.createElement("li");
        li.innerText = task;
        li.onclick = function () {
            this.style.textDecoration = "line-through";
        };
        list.appendChild(li);
        document.getElementById("taskInput").value = "";
    }
}

function generateQuote() {
    let quotes = [
        "You are stronger than you think.",
        "This too shall pass.",
        "Small steps matter.",
        "Your mental health matters.",
        "Believe in yourself."
    ];
    let random = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteText").innerText = quotes[random];
}

function clearData() {
    localStorage.clear();
    alert("All Data Cleared");
    location.reload();
}

window.onload = function() {
    displayMoodHistory();
    updateWellnessScore();
};
