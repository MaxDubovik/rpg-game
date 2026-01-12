class Enemy {
    constructor({id, name, hp, attack, exp}) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.attack = attack;
        this.exp = exp;
    }

    takeDamage(dmg) {
        this.hp = Math.max(0, this.hp - dmg);
    }

    isDead() {
        return this.hp <= 0;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            hp: this.hp,
            maxHp: this.maxHp,
        }
    }
}

module.exports = Enemy;