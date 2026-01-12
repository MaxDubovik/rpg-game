const Player = require('./Player');
const { locations } = require('../config/game.config');

class GameEngine {
    constructor() {
        this.players = new Map();
        this.locations = locations;
    }

    addPlayer(socketId) {
        const player = new Player(socketId);
        this.players.set(socketId, player);
        return player;
    }

    removePlayer(socketId) {
        this.players.delete(socketId);
    }

    getPlayer(socketId) {
        return this.players.get(socketId);
    }

    movePlayer(socketId, targetLocationId) {
        const player = this.getPlayer(socketId);
        if (!player) return { ok: false, error: 'Invalid lovation'};

        const currentLocation = this.locations[player.location];
        if (!currentLocation) return { ok: false, error: 'Invalid location'};

        if (!currentLocation.exits.includes(targetLocationId)) {
            return { ok: false, error: 'Invalid exit'};
        }

        player.location = targetLocationId;
        return { ok:true, player: player.toJSON()};
    }

    getState() {
        return {
            players: [...this.players.values()].map(p => p.toJSON()),
            locations: Object.values(this.locations).map(l => l.toJSON()),
        };
    }

    attackEnemy(socketId, enemyId) {
        const player = this.getPlayer(socketId);
        if (!player) return { ok: false, error: 'user not found' };

        const location = this.locations[player.location];
        if (!location) return { ok: false, error: 'location not found' };

        const enemy = location.enemies.find(e => e.id === enemyId && !e.isDead());
        if (!enemy) return { ok: false, error: 'enemy not found' };

        const playerDamage = 10;
        enemy.takeDamage(playerDamage);

        let log = [`You hit ${enemy.name} for ${playerDamage}`];

        if (!enemy.isDead()) {
            player.hp = Math.max(0, player.hp - enemy.attack);
            log.push(`${enemy.name} hits you for ${enemy.attack}`);
        }

        if (enemy.isDead()) {
            player.exp += enemy.exp;
            log.push(`${enemy.name} is defeated! +${enemy.exp} exp`);

            if (location.enemies.every(e => e.isDead())) {
                location.respawnEnemies();
                log.push('Enemies respawned');
            }
        }

        return {
            ok: true,
            log, 
            state: this.getState()
        };
    }
}

module.exports = new GameEngine();