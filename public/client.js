const socket = io();
let username = '';

function joinChat() {
  username = document.getElementById('username').value.trim();
  if (username) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('chat').classList.remove('hidden');
    socket.emit('join', username);
  }
}

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('div');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
