class Location {
    constructor(id, name, exits = [], enemyFactories = []) {
        this.id = id;
        this.name = name;
        this.exits = exits;
        this.enemyFactories = enemyFactories;
        this.enemies = enemyFactories.map(f => f());
    }

    respawnEnemies() {
        this.enemies = this.enemyFactories.map(f => f());
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            exits: this.exits,
            enemies: this.enemies.map(e => e.toJSON())
        };
    }
}

module.exports = Location;