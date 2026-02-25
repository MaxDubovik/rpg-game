import { socket } from './socket.js';
import { currentPlayer, locations, allPlayers } from './state.js';

const playerDiv = document.getElementById('player');
const actionsDiv = document.getElementById('actions');
const othersDiv = document.getElementById('others');

export function render() {
    if (!currentPlayer) return;

    const location = locations[currentPlayer.location];
    if (!location) return;

    const hpPercent = (currentPlayer.hp / currentPlayer.maxHp) * 100;
    const expPercent = (currentPlayer.exp / currentPlayer.expToNextLevel) * 100;

    playerDiv.innerHTML = `
        <div class="section-title">Character</div>
        <div class="player-head">
            <div class="player-name">${currentPlayer.name}</div>
            <div class="chip">Level ${currentPlayer.level}</div>
        </div>
        <div class="progress">
            <div class="progress-fill hp" style="width: ${hpPercent}%"></div>
        </div>
        <div class="progress">
            <div class="progress-fill exp" style="width: ${expPercent}%"></div>
        </div>
        <div class="stat-line">
            HP ${currentPlayer.hp}/${currentPlayer.maxHp} · EXP ${currentPlayer.exp}/${currentPlayer.expToNextLevel} · ATK ${currentPlayer.attack}
        </div>
        <div class="current-place">Location: <strong>${location.name}</strong></div>
    `;

    if (currentPlayer.isDead) {
        actionsDiv.innerHTML = `
            <div class="section-title">Action</div>
            <div class="dead-wrap">
                <div class="dead-title">You are dead</div>
                <button class="btn btn-ghost" onclick="respawn()">
                    Respawn at Village
                </button>
                <p class="hint">Half of your EXP is lost on death.</p>
            </div>
        `;
        othersDiv.innerHTML = `
            <div class="section-title">Players Nearby</div>
            <p>You cannot interact until respawn.</p>
        `;
        return;
    }

    actionsDiv.innerHTML = `
        <div class="section-title">Move</div>
        <div class="move-buttons"></div>
    `;

    const moveButtonsDiv = actionsDiv.querySelector('.move-buttons');
    location.exits.forEach((exit) => {
        const nextLocation = locations[exit];
        if (!nextLocation) return;

        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = nextLocation.name;
        btn.onclick = () => socket.emit('player:move', exit);
        moveButtonsDiv.appendChild(btn);
    });

    if (location.enemies.length) {
        const enemiesSection = document.createElement('div');
        enemiesSection.className = 'enemy-grid';
        enemiesSection.innerHTML = `<div class="section-title">Enemies</div>`;

        location.enemies.forEach((enemy) => {
            const wrapper = document.createElement('div');
            const enemyHpPercent = (enemy.hp / enemy.maxHp) * 100;

            wrapper.className = 'enemy-card';
            wrapper.innerHTML = `
                <div>
                    <p class="enemy-name">${enemy.name}</p>
                    <div class="progress">
                        <div class="progress-fill hp" style="width: ${enemyHpPercent}%"></div>
                    </div>
                    <div class="enemy-hp">HP ${enemy.hp}/${enemy.maxHp}</div>
                </div>
            `;

            const btn = document.createElement('button');
            btn.className = 'btn btn-danger';
            btn.textContent = 'Attack';
            btn.onclick = () => socket.emit('player:attack', enemy.id);

            wrapper.appendChild(btn);
            enemiesSection.appendChild(wrapper);
        });

        actionsDiv.appendChild(enemiesSection);
    }

    const others = allPlayers.filter(
        (p) => p.id !== currentPlayer.id && p.location === currentPlayer.location
    );

    if (!others.length) {
        othersDiv.innerHTML = `
            <div class="section-title">Players Nearby</div>
            <p>No one else is here yet.</p>
        `;
        return;
    }

    othersDiv.innerHTML = `
        <div class="section-title">Players Nearby</div>
        <div class="player-tags">
            ${others.map((p) => `<span class="player-tag">${p.name}</span>`).join('')}
        </div>
    `;
}
