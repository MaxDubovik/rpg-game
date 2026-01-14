class Player {
    constructor(id) {
        this.id = id;
        this.name = `Player_${id.slice(0,4)}`;

        this.level = 1;
        this.exp = 0;
        this.expToNextLevel = 20;

        this.hp = 100;
        this.maxHp = 100;

        this.attack = 10;
        this.location = 'village';
        this.isDead = false;
    }

    gainExp(amount) {
        this.exp += amount;

        let leveledUp = false;

        while (this.exp >= this.expToNextLevel) {
            this.exp -= this.expToNextLevel;
            this.levelUp();
            leveledUp = true;
        }

        return leveledUp;
    }

    levelUp() {
        this.level += 1;
        this.expToNextLevel = Math.floor(this.expToNextLevel * 1.5);

        this.maxHp += 20;
        this.hp = this.maxHp;

        this.attack += 5;
    }

    takeDamage(amount) {
        this.hp -= amount;

        if (this.hp <= 0) {
            this.hp = 0;
            this.isDead = true;
        }
    }

    respawn() {
        this.hp = this.maxHp;
        this.isDead = false;
        this.location = 'village';
        this.exp = Math.floor(this.exp * 0.5);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            level: this.level,
            exp: this.exp,
            expToNextLevel: this.expToNextLevel,
            hp: this.hp,
            maxHp: this.maxHp,
            attack: this.attack,
            location: this.location,
            isDead: this.isDead,
        };
    }
}

module.exports = Player;