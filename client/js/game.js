import { socket } from './socket.js';

export function respawn() {
    socket.emit('player:respawn');
}

window.respawn = respawn;