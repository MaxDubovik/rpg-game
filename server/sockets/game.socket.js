const game = require('../game/GameEngine');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        const player = game.addPlayer(socket.id);

        socket.emit('init', {
            player: player.toJSON(),
            state: game.getState(),
        });

        io.emit('state:update', game.getState());

        socket.on('player:move', (locationId) => {
            const result = game.movePlayer(socket.id, locationId);

            if (!result.ok) {
                socket.emit('action:error', result.error);
                return;
            }

            io.emit('state:update', game.getState());
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected', socket.id);
            game.removePlayer(socket.id);
            io.emit('state:update', game.getState());
        });

        socket.on('player:attack', (enemyId) => {
            const result = game.attackEnemy(socket.id, enemyId);

            if (!result.ok) {
                socket.emit('action:error', result.error);
            }

            socket.emit('battle:log', result.log);
            io.emit('state:update', result.state);
        });

        socket.on('player:respawn', () => {
            const player = game.getPlayer(socket.id);
            if (!player || !player.isDead) return;

            player.respawn();
            io.emit('state:update', game.getState());
        });
    });
};