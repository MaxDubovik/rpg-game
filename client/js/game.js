const socket = io();

const playerDiv = document.getElementById('player');
const actionsDiv = document.getElementById('actions');
const logDiv = document.getElementById('log');

const othersDiv = document.getElementById('others');

let currentPlayer = null;
let locations = {};

let allPlayers = [];

socket.on('init', (data) => {
    currentPlayer = data.player;
    locations = Object.fromEntries(
        data.state.locations.map(l => [l.id, l])
    );
    render();
});

socket.on('state:update', (state) => {
    allPlayers = state.players;

    locations = Object.fromEntries(
        state.locations.map(l => [l.id, l])
    );

    const me = state.players.find(p => p.id === currentPlayer.id);
    if (me) currentPlayer = me;

    render();
});

socket.on('action:error', (msg) => {
    log.textContent = msg;
});

socket.on('battle:log', (lines) => {
    logDiv.textContent = lines.join('\n');
});

function render() {
    if (!currentPlayer) return;

    const location = locations[currentPlayer.location];

    playerDiv.innerHTML = `
        <strong>${currentPlayer.name}</strong><br>
        HP: ${currentPlayer.hp}<br>
        Location: ${location.name}
    `;

    actionsDiv.innerHTML = '';
    location.exits.forEach(exit => {
        const btn = document.createElement('button');
        btn.textContent = `Go to ${locations[exit].name}`;
        btn.onclick = () => socket.emit('player:move', exit);
        actionsDiv.appendChild(btn);
    });

    const others = allPlayers.filter(
        p => p.id !== currentPlayer.id && p.location === currentPlayer.location
    );

    othersDiv.innerHTML = others.length
        ? `<strong>Others here:</strong><br>${others.map(p => p.name).join('<br>')}`
        : '';

    if (location.enemies.length) {
        const enemiesBlock = document.createElement('div');
        enemiesBlock.innerHTML = '<strong>Enemies:</strong><br>';

        location.enemies.forEach(enemy => {
            const btn = document.createElement('button');
            btn.textContent = `${enemy.name} (${enemy.hp}/${enemy.maxHp})`;
            btn.onclick = () => socket.emit('player:attack', enemy.id);
            enemiesBlock.appendChild(btn);
        });

        actionsDiv.appendChild(enemiesBlock);
    }
}