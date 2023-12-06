/*
Ce module chat.js a été fait à partir du tutoriel de chat de socket.io.
Il est donc en dehors de Phaser3. Vu qu'il est possible d'utiliser les deux
en même temps sans avoir besoin de les mettre ensemble directement, cette
fonctionalité a été rajoutée telle quelle pour gagner du temps, même si
ce n'est pas très propre.
*/

import io from "socket.io-client";

/*
sur le serveur de lifprojet:
const socket = io.connect("//lif.sci-web.net:8000/");
en localhost: (pricipalement pour les tests)
const socket = io.connect("ws://localhost:8000/");
*/
const socket = io.connect("//lif.sci-web.net:8000/");
export default socket;
const chatMessages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const username = prompt("Choose a username.");
socket.emit("newPlayerJoined", username);

function sendMessage(event) {
    event.preventDefault();
    if (input.value) {
        socket.emit('chatMessage', input.value);
        input.value = '';
    }
}

function displayNewMessage(message) {
    let item = document.createElement('li');
    let userWasPinged = message.includes("@"+username);
    if (userWasPinged) {item.id = "userPinged";}
    item.textContent = message;
    chatMessages.appendChild(item);
    chatMessages.scrollTo(0,chatMessages.scrollHeight);
}

form.addEventListener('submit', sendMessage);
socket.on('chatMessage', displayNewMessage);
