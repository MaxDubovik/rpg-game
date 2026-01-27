export let currentPlayer = null;
export let locations = {};
export let allPlayers = [];

export function setFromInit(data) {
    currentPlayer = data.player;
    locations = Object.fromEntries(
        data.state.locations.map(l => [l.id, l])
    );
}

export function setFromStateUpdate(state) {
    allPlayers = state.players;
    locations = Object.fromEntries(
        state.locations.map(l => [l.id, l])
    );
    const me = state.players.find(p => p.id === currentPlayer.id);
    if (me) currentPlayer = me;
}