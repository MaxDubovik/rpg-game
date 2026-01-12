const Location = require('../game/Location');
const Enemy = require('../game/Enemy');

const locations = {
    village: new Location('village', 'Village', ['forest'], []),

    forest: new Location(
        'forest', 
        'Dark Forest', 
        ['village', 'cave'],
        [
            () => new Enemy({
                id: 'wolf',
                name: 'Wolf',
                hp: 30,
                attack: 5,
                exp: 10
            })
        ]
    ),

    cave: new Location(
        'cave', 
        'Cave', 
        ['forest'],
        [
            () => new Enemy({
                id: 'goblin',
                name: 'Goblin',
                hp: 50,
                attack: 8,
                exp: 20
            })
        ]
    ),
};

module.exports = {
    locations,
};