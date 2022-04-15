"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const Profile_vue_1 = require("@/components/Profile.vue");
const Friends_vue_1 = require("@/components/Friends.vue");
const LeaderBoard_vue_1 = require("@/components/LeaderBoard.vue");
const MatchHistory_vue_1 = require("@/components/MatchHistory.vue");
const Game_vue_1 = require("@/components/Game.vue");
const Chat_vue_1 = require("@/components/CHAT/Chat.vue");
const PublicChat_vue_1 = require("@/components/CHAT/PublicChat.vue");
const PrivateChat_vue_1 = require("@/components/CHAT/PrivateChat.vue");
const CreateRoom_vue_1 = require("@/components/CHAT/CreateRoom.vue");
const ErrorPage_vue_1 = require("@/components/ErrorPage.vue");
const ChatPublicRoomMsg_vue_1 = require("@/components/CHAT/ChatPublicRoomMsg.vue");
const privateMsgs_vue_1 = require("@/components/CHAT/privateMsgs.vue");
const PlayerFromGlob_vue_1 = require("@/components/PlayerFromGlob.vue");
const routes = [
    {
        path: '/',
        redirect: { name: 'profile' }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile_vue_1.default
    },
    {
        path: '/users',
        name: 'users',
        component: Friends_vue_1.default
    },
    {
        path: '/leaderboard',
        name: 'leaderboard',
        component: LeaderBoard_vue_1.default
    },
    {
        path: '/matchhistory',
        name: 'matchhistory',
        component: MatchHistory_vue_1.default
    },
    {
        path: '/game',
        name: 'game',
        component: Game_vue_1.default
    },
    {
        path: '/chat',
        name: 'chat',
        redirect: { path: '/chat/public' },
        component: Chat_vue_1.default,
        children: [
            {
                path: 'private',
                name: 'chatprivate',
                component: PrivateChat_vue_1.default,
            },
            {
                path: 'privatemsgs',
                name: 'privatemsgs',
                component: privateMsgs_vue_1.default
            },
            {
                path: 'public',
                name: 'chatpublic',
                component: PublicChat_vue_1.default
            },
            {
                path: 'createroom',
                name: 'chatcreateroom',
                component: CreateRoom_vue_1.default,
            },
            {
                path: 'chatpublicmsg',
                name: 'chatpublicmsg',
                component: ChatPublicRoomMsg_vue_1.default
            },
        ]
    },
    {
        path: '/temp',
        name: 'temp',
        component: PlayerFromGlob_vue_1.default
    },
    {
        path: '/:notFound(.*)',
        component: ErrorPage_vue_1.default
    },
];
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(process.env.BASE_URL),
    routes
});
exports.default = router;
//# sourceMappingURL=index.js.map