// Handle Appointment Booking Form Submission
document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    
    if (name && email && date) {
        document.getElementById("appointmentMessage").innerHTML = `✅ Appointment booked for ${name} on ${date}.`;
        document.getElementById("appointmentMessage").style.color = "green";
    } else {
        document.getElementById("appointmentMessage").innerHTML = `❌ Please fill out all fields.`;
        document.getElementById("appointmentMessage").style.color = "red";
    }
});

// Handle Chatbox Visibility Toggle
function toggleChat() {
    let chatBox = document.getElementById("chatBox");
    chatBox.classList.toggle("hidden");
}

// Handle Chat Message Sending
function sendMessage() {
    let chatInput = document.getElementById("chatInput").value;
    let chatMessages = document.getElementById("chatMessages");
    
    if (chatInput.trim() !== "") {
        let userMessage = `<p><strong>You:</strong> ${chatInput}</p>`;
        let botReply = `<p><strong>Chatbot:</strong> I’m here to support you. How are you feeling today?</p>`;
        
        chatMessages.innerHTML += userMessage + botReply;
        document.getElementById("chatInput").value = "";
    }
}
