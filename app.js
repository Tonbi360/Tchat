const expandBtn = document.getElementById('expand-btn');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

expandBtn.addEventListener('click', () => {
    console.log("Button clicked!"); // This shows up in developer tools
    
    // Toggle the class
    messageForm.classList.toggle('hidden');
    
    // Check if it's hidden or not
    if (messageForm.classList.contains('hidden')) {
        expandBtn.style.transform = "rotate(0deg)";
        expandBtn.textContent = "＋";
    } else {
        expandBtn.style.transform = "rotate(45deg)";
        expandBtn.textContent = "＋"; 
        messageInput.focus();
    }
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (text !== "") {
        const div = document.createElement('div');
        div.classList.add('message', 'sent');
        div.textContent = text;
        messagesContainer.appendChild(div);
        messageInput.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
