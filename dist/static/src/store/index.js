"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vuex_1 = require("vuex");
exports.default = (0, vuex_1.createStore)({
    strict: true,
    state: {
        chatState: {
            index: 0,
        },
        userData: {
            user_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImpvaW5lZFJvb21zIjpbXSwiaWF0IjoxNjQ5NDU0ODY3LCJleHAiOjE2NTIwNDY4Njd9.XuwCa2OLPmGTbQAiDwhGB1fKu7T4jjT5dzqw1zDUBA0',
            username: '',
            user_id: 0,
            avatar: '',
            joinedRooms: [],
        },
        chatPublicMsgs: [],
        rooms: [],
        players: [],
        PlayerHistory: [],
        privateUsersList: [],
        currentRoomId: 0,
    },
    getters: {
        getPrivateList(state) {
            return state.privateUsersList;
        },
        getCurrentRoomId(state) {
            return state.currentRoomId;
        },
        getUserToken(state) {
            return state.userData.user_token;
        },
        getUsername(state) {
            return state.userData.username;
        },
        getAvatar(state) {
            return state.userData.avatar;
        },
        getJoinedRooms(state) {
            return state.userData.joinedRooms;
        },
        getUserId(state) {
            return state.userData.user_id;
        },
        getRooms(state) {
            return state.rooms;
        },
        getMsgs(state) {
            return state.chatPublicMsgs;
        },
        getPlayers(state) {
            return state.players;
        },
        getPlayerHistory(state) {
            return state.playerHistory;
        }
    },
    mutations: {
        setRoomId(state, id) {
            state.currentRoomId = id;
        },
        setUserData(state, token) {
            state.userData.user_token = token;
            const user = JSON.parse(atob(token.split('.')[1]));
            state.userData.joinedRooms = user.joinedRooms;
            state.userData.user_id = user.sub;
            state.userData.username = user.username;
            state.userData.avatar = user.avatar;
        },
        updateRooms(state, rooms) {
            state.rooms = [];
            state.rooms = rooms;
        },
        updatePrivateList(state, usersList) {
            state.privateUsersList = usersList;
        },
        addRoom(state, room) {
            state.rooms.push(room);
        },
        updateChatState(state, index) {
            state.chatState.index = index;
        },
        updateUserData(state, user_data) {
            state.userData = user_data;
        },
        updatePublicRoomMsgs(state, msgs) {
            state.chatPublicMsgs = [];
            state.chatPublicMsgs = msgs;
        },
        addMessageToRoomMsgs(state, msg) {
            state.chatPublicMsgs.push(msg);
        },
        updatePlayers(state, players) {
            state.players = [];
            state.players = players;
        },
        updatePlayerHistory(state, playerHistory) {
            state.playerHistory = [];
            state.playerHistory = playerHistory;
        }
    },
    actions: {},
    modules: {}
});
//# sourceMappingURL=index.js.map