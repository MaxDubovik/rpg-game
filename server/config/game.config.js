const Location = require('../game/Location');
const Enemy = require('../game/Enemy');

const locations = {
    village: new Location('village', 'Village of Emberfall', ['forest', 'farmlands', 'old_road'], []),

    farmlands: new Location(
        'farmlands',
        'Ashen Farmlands',
        ['village', 'windmill_hill'],
        [
            () => new Enemy({
                id: 'rat_fiend',
                name: 'Rat-Fiend',
                hp: 25,
                attack: 8,
                exp: 8
            }),
            () => new Enemy({
                id: 'field_raider',
                name: 'Field Raider',
                hp: 35,
                attack: 10,
                exp: 12
            })
        ]
    ),

    windmill_hill: new Location(
        'windmill_hill',
        'Windmill Hill',
        ['farmlands', 'forest'],
        [
            () => new Enemy({
                id: 'crow_swarm',
                name: 'Crow Swarm',
                hp: 30,
                attack: 11,
                exp: 12
            }),
            () => new Enemy({
                id: 'broken_guard',
                name: 'Broken Guard',
                hp: 45,
                attack: 13,
                exp: 16
            })
        ]
    ),

    forest: new Location(
        'forest', 
        'Dark Forest',
        ['village', 'windmill_hill', 'cave', 'ruins'],
        [
            () => new Enemy({
                id: 'wolf',
                name: 'Wolf',
                hp: 30,
                attack: 10,
                exp: 10
            }),
            () => new Enemy({
                id: 'thorn_stalker',
                name: 'Thorn Stalker',
                hp: 40,
                attack: 12,
                exp: 14
            })
        ]
    ),

    old_road: new Location(
        'old_road',
        'Old King\'s Road',
        ['village', 'ruins'],
        [
            () => new Enemy({
                id: 'road_bandit',
                name: 'Road Bandit',
                hp: 40,
                attack: 12,
                exp: 14
            }),
            () => new Enemy({
                id: 'torch_deserter',
                name: 'Torch Deserter',
                hp: 55,
                attack: 14,
                exp: 18
            })
        ]
    ),

    ruins: new Location(
        'ruins',
        'Sunken Ruins',
        ['forest', 'old_road', 'swamp'],
        [
            () => new Enemy({
                id: 'stone_watcher',
                name: 'Stone Watcher',
                hp: 55,
                attack: 15,
                exp: 20
            }),
            () => new Enemy({
                id: 'grave_scholar',
                name: 'Grave Scholar',
                hp: 65,
                attack: 16,
                exp: 22
            })
        ]
    ),

    cave: new Location(
        'cave', 
        'Howling Cave',
        ['forest', 'deep_cave'],
        [
            () => new Enemy({
                id: 'goblin',
                name: 'Goblin',
                hp: 50,
                attack: 20,
                exp: 20
            }),
            () => new Enemy({
                id: 'cave_hyena',
                name: 'Cave Hyena',
                hp: 65,
                attack: 18,
                exp: 24
            })
        ]
    ),

    swamp: new Location(
        'swamp',
        'Mire of Whispers',
        ['ruins', 'fort_gate'],
        [
            () => new Enemy({
                id: 'bog_witch',
                name: 'Bog Witch',
                hp: 75,
                attack: 20,
                exp: 28
            }),
            () => new Enemy({
                id: 'rot_marauder',
                name: 'Rot Marauder',
                hp: 85,
                attack: 21,
                exp: 30
            })
        ]
    ),

    deep_cave: new Location(
        'deep_cave',
        'Deep Cave',
        ['cave', 'fort_gate'],
        [
            () => new Enemy({
                id: 'tunnel_troll',
                name: 'Tunnel Troll',
                hp: 95,
                attack: 24,
                exp: 34
            }),
            () => new Enemy({
                id: 'echo_bat',
                name: 'Echo Bat',
                hp: 60,
                attack: 22,
                exp: 26
            })
        ]
    ),

    fort_gate: new Location(
        'fort_gate',
        'Blackfort Gate',
        ['swamp', 'deep_cave', 'blackfort'],
        [
            () => new Enemy({
                id: 'iron_pikeman',
                name: 'Iron Pikeman',
                hp: 110,
                attack: 25,
                exp: 38
            }),
            () => new Enemy({
                id: 'gate_hound',
                name: 'Gate Hound',
                hp: 100,
                attack: 24,
                exp: 36
            })
        ]
    ),

    blackfort: new Location(
        'blackfort',
        'Blackfort Courtyard',
        ['fort_gate', 'frozen_peak'],
        [
            () => new Enemy({
                id: 'dread_knight',
                name: 'Dread Knight',
                hp: 130,
                attack: 28,
                exp: 44
            }),
            () => new Enemy({
                id: 'war_channeler',
                name: 'War Channeler',
                hp: 115,
                attack: 30,
                exp: 46
            })
        ]
    ),

    frozen_peak: new Location(
        'frozen_peak',
        'Frozen Peak',
        ['blackfort', 'citadel'],
        [
            () => new Enemy({
                id: 'ice_wraith',
                name: 'Ice Wraith',
                hp: 140,
                attack: 32,
                exp: 50
            }),
            () => new Enemy({
                id: 'frost_giant',
                name: 'Frost Giant',
                hp: 180,
                attack: 34,
                exp: 58
            })
        ]
    ),

    citadel: new Location(
        'citadel',
        'Ashen Citadel',
        ['frozen_peak'],
        [
            () => new Enemy({
                id: 'citadel_champion',
                name: 'Citadel Champion',
                hp: 210,
                attack: 36,
                exp: 70
            }),
            () => new Enemy({
                id: 'ember_lord',
                name: 'Ember Lord',
                hp: 260,
                attack: 40,
                exp: 90
            })
        ]
    ),
};

module.exports = {
    locations,
};
