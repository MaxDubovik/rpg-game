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
    logDiv.textContent = lines.join('\n') + '\n\n';
    logDiv.scrollTop = logDiv.scrollHeight;
});

function render() {

    if (!currentPlayer) return;

    const location = locations[currentPlayer.location];

    if (currentPlayer.isDead) {
        actionsDiv.innerHTML = `
            <div class="text-center space-y-3">
            <div class="text-red-500 text-xl font-bold">You are dead</div>
            <button
                class="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition"
                onclick="respawn()">
                Respawn
            </button>
            </div>
        `;
        return;
    }

    playerDiv.innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between">
            <span class="font-bold">${currentPlayer.name}</span>
            <span class="text-sm text-gray-400">Lv ${currentPlayer.level}</span>
            </div>

            <div class="w-full bg-gray-700 rounded-full h-3">
            <div
                class="bg-red-600 h-3 rounded-full transition-all"
                style="width: ${(currentPlayer.hp / currentPlayer.maxHp) * 100}%">
            </div>
            </div>

            <div class="text-sm text-gray-400">
            HP ${currentPlayer.hp} / ${currentPlayer.maxHp} ·
            EXP ${currentPlayer.exp} / ${currentPlayer.expToNextLevel} ·
            ATK ${currentPlayer.attack}
            </div>

            <div class="text-sm">
            Location: <span class="font-semibold">${location.name}</span>
            </div>
        </div>
        `;

    actionsDiv.innerHTML = `
        <div class="font-semibold mb-2">Move to:</div>
      `;

    location.exits.forEach(exit => {
        const btn = document.createElement('button');
        btn.className =
            'px-3 py-1 me-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition';
        btn.textContent = locations[exit].name;
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
            enemiesBlock.className = 'pt-4 space-y-2';
            enemiesBlock.innerHTML = '<div class="font-semibold">Enemies:</div>';
            
            location.enemies.forEach(enemy => {
                const wrapper = document.createElement('div');
                wrapper.className =
                'flex items-center justify-between bg-gray-700 rounded-lg p-2';
            
                wrapper.innerHTML = `
                <div>
                    <div>${enemy.name}</div>
                    <div class="w-32 bg-gray-600 rounded-full h-2 mt-1">
                    <div
                        class="bg-red-500 h-2 rounded-full"
                        style="width: ${(enemy.hp / enemy.maxHp) * 100}%">
                    </div>
                    </div>
                </div>
                `;
            
                const btn = document.createElement('button');
                btn.className =
                'px-3 py-1 rounded bg-red-600 hover:bg-red-500 transition';
                btn.textContent = 'Attack';
                btn.onclick = () => socket.emit('player:attack', enemy.id);
            
                wrapper.appendChild(btn);
                enemiesBlock.appendChild(wrapper);
            });
            
            actionsDiv.appendChild(enemiesBlock);
        }
          
}

function respawn() {
    socket.emit('player:respawn');
}
  