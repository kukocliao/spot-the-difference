// 多人連線同步層：Firebase 未設定時自動退回 BroadcastChannel（同機多分頁本機測試）
// 固定單一房間：主控端只有一位，不需要房間代碼
const ROOM = "spotdiff-main";
const LOCAL_MODE = firebaseConfig.apiKey.includes("貼上");
const bc = LOCAL_MODE ? new BroadcastChannel("spot-diff-" + ROOM) : null;
if (!LOCAL_MODE) firebase.initializeApp(firebaseConfig);
const db = LOCAL_MODE ? null : firebase.database();

function refRoom() { return db.ref(`rooms/${ROOM}`); }
function refPlayers() { return refRoom().child('players'); }
function refPlayer(name) { return refPlayers().child(name); }

let roomState = { status: 'idle', round: null };
let playersState = {};
const roomListeners = [];
const playersListeners = [];

function emitRoom() { roomListeners.forEach((cb) => cb(roomState)); }
function emitPlayers() { playersListeners.forEach((cb) => cb(playersState)); }

if (LOCAL_MODE) {
    bc.onmessage = (e) => {
        const m = e.data;
        if (m.kind === 'room') { roomState = m.room; emitRoom(); }
        else if (m.kind === 'player') { playersState = { ...playersState, [m.name]: m.data }; emitPlayers(); }
        else if (m.kind === 'players_reset') { playersState = {}; emitPlayers(); }
    };
} else {
    refRoom().child('status').on('value', (snap) => { roomState = { ...roomState, status: snap.val() || 'idle' }; emitRoom(); });
    refRoom().child('round').on('value', (snap) => { roomState = { ...roomState, round: snap.val() }; emitRoom(); });
    refPlayers().on('value', (snap) => { playersState = snap.val() || {}; emitPlayers(); });
}

// cb 會在註冊當下立即收到目前狀態一次，之後每次變化都會再收到
function onRoom(cb) { roomListeners.push(cb); cb(roomState); }
function onPlayers(cb) { playersListeners.push(cb); cb(playersState); }

function writeRoom(partial) {
    roomState = { ...roomState, ...partial };
    if (LOCAL_MODE) { bc.postMessage({ kind: 'room', room: roomState }); emitRoom(); }
    else refRoom().update(partial);
}

function writePlayer(name, data) {
    playersState = { ...playersState, [name]: data };
    if (LOCAL_MODE) { bc.postMessage({ kind: 'player', name, data }); emitPlayers(); }
    else refPlayer(name).set(data);
}

function resetRoom() {
    roomState = { status: 'idle', round: null };
    playersState = {};
    if (LOCAL_MODE) {
        bc.postMessage({ kind: 'room', room: roomState });
        bc.postMessage({ kind: 'players_reset' });
        emitRoom(); emitPlayers();
    } else {
        refRoom().set({ status: 'idle' });
        refPlayers().remove();
    }
}
