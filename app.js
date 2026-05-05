const expandBtn = document.getElementById('expand-btn');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

// Toggle the input box expansion
expandBtn.addEventListener('click', () => {
    messageForm.classList.toggle('hidden');
    if (!messageForm.classList.contains('hidden')) {
        messageInput.focus();
        expandBtn.style.transform = "rotate(45deg)";
    } else {
        expandBtn.style.transform = "rotate(0deg)";
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
