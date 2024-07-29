import { Client } from "@gradio/client";

document.getElementById('chat-button').addEventListener('click', sendMessage);

async function sendMessage() {
    const inputBox = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const message = inputBox.value.trim();
    
    if (message !== '') {
        // Display user message
        chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
        inputBox.value = '';

        try {
            const client = await Client.connect("PfoxjDev/VBoom");
            const result = await client.predict("/chat", {
                message: message,
                system_message: message,
                max_tokens: 1,
                temperature: 0.1,
                top_p: 0.1,
            });

            // Display chatbot response
            chatBox.innerHTML += `<div><strong>VBoom:</strong> ${result.data}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
        } catch (error) {
            console.error('Error:', error);
            chatBox.innerHTML += `<div><strong>VBoom:</strong> Sorry, something went wrong.</div>`;
        }
    }
}
