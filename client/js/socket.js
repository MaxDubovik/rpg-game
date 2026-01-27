import * as state from './state.js';
import { render } from './ui.js';

export const socket = io();

const logDiv = document.getElementById('log');

socket.on('init', (data) => {
    state.setFromInit(data);
    render();
});
socket.on('state:update', (stateData) => {
    state.setFromStateUpdate(stateData);
    render();
});
socket.on('action:error', (msg) => {
    logDiv.textContent = msg;
});
socket.on('battle:log', (lines) => {
    logDiv.textContent = lines.join('\n') + '\n\n';
    logDiv.scrollTop = logDiv.scrollHeight;
});