const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        // 1. Create the message element
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.textContent = messageText;

        // 2. Add it to the chat window
        messagesContainer.appendChild(messageDiv);

        // 3. Clear the input box
        messageInput.value = "";

        // 4. Scroll to the bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
