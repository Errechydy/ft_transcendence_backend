import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ProfileBlock from '@/components/Profile.vue'
import FriendsBlock from '@/components/Friends.vue'
import LeaderBoardBlock from '@/components/LeaderBoard.vue'
import MatchHistoryBlock from '@/components/MatchHistory.vue'
import GameBlock from '@/components/Game.vue'
import ChatBlock from '@/components/CHAT/Chat.vue'
import PublicChatBlock from '@/components/CHAT/PublicChat.vue'
import PrivateChatBlock from '@/components/CHAT/PrivateChat.vue'
import CreateRoomBlock from '@/components/CHAT/CreateRoom.vue'
import ErrorPageBlock from '@/components/ErrorPage.vue';
import ChatPublicMsgBlock from '@/components/CHAT/ChatPublicRoomMsg.vue'
import TEMP from '@/components/PlayerFromGlob.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'profile'}
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileBlock
  },
  {
    path: '/users',
    name: 'users',
    component: FriendsBlock
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderBoardBlock
  },
  {
    path: '/matchhistory',
    name: 'matchhistory',
    component: MatchHistoryBlock
  },
  {
    path: '/game',
    name: 'game',
    component: GameBlock
  },
  {
    path: '/chat',
    name: 'chat',
    redirect: {path: '/chat/public'},
    component: ChatBlock,
    children: [
      {
        path: 'private',
        name: 'chatprivate',
        component: PrivateChatBlock,
      },
      {
        path: 'public',
        name: 'chatpublic',
        component: PublicChatBlock
      },
      {
        path: 'createroom',
        name: 'chatcreateroom',
        component: CreateRoomBlock,
      },
      {
        path: 'chatpublicmsg',
        name: 'chatpublicmsg',
        component: ChatPublicMsgBlock
      },
    ]
  },
  {
    path: '/temp',
    name: 'temp',
    component: TEMP
  },
  {
    // this object make sure it's the last one 
    path:'/:notFound(.*)',
    component: ErrorPageBlock
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
