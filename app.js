// 1. Import Firebase Functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } 
       from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Your Firebase Configuration (From your previous message)
const firebaseConfig = {
    apiKey: "AIzaSyBoVQ5yXyFy98nUP2XJF7S4Z_VVXDqg2Ak",
    authDomain: "mychatpwa-83667.firebaseapp.com",
    projectId: "mychatpwa-83667",
    storageBucket: "mychatpwa-83667.firebasestorage.app",
    messagingSenderId: "463021809756",
    appId: "1:463021809756:web:a4151d8970f5c1a292c699"
};

// 3. Initialize Firebase & Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Identity Logic: Give this user a unique ID so we know "who is who"
let myId = localStorage.getItem('chat_user_id');
if (!myId) {
    myId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chat_user_id', myId);
}

// 5. Setup for "Daily" chat
const today = new Date().toISOString().split('T')[0]; // Format: 2023-10-27
const messagesRef = collection(db, "chats", today, "messages");

// DOM Elements
const expandBtn = document.getElementById('expand-btn');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

// UI Logic: Expand/Collapse Input (Preserved from your code)
expandBtn.addEventListener('click', () => {
    messageForm.classList.toggle('hidden');
    if (messageForm.classList.contains('hidden')) {
        expandBtn.style.transform = "rotate(0deg)";
    } else {
        expandBtn.style.transform = "rotate(45deg)";
        messageInput.focus();
    }
});

// DATABASE Logic: Send message to Firebase
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();

    if (text !== "") {
        try {
            await addDoc(messagesRef, {
                text: text,
                senderId: myId,
                timestamp: serverTimestamp()
            });
            messageInput.value = "";
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    }
});

// DATABASE Logic: Listen for new messages in real-time
const q = query(messagesRef, orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = ''; // Clear current view
    snapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement('div');
        
        // If senderId matches mine, use 'sent' style, otherwise 'received'
        const isMe = data.senderId === myId;
        div.classList.add('message', isMe ? 'sent' : 'received');
        
        div.textContent = data.text;
        messagesContainer.appendChild(div);
    });
    // Auto-scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
