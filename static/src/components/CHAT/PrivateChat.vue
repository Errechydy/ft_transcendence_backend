<template>
    <div>
    <div class="grid grid-cols-1 min-w-full border rounded">
                <ul class="overflow-auto hideScrollBar" style="height: 90vh;">
                    <li>
                        <div class="px-6"
                            v-for="message in privateList" :key="message.user_id"
                        >
                        <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                            <div class="ml-2" >
                                <div class="text-sm font-light" style="color: #2d00ff;">  {{ message.username }} </div>
                            </div>
                            </div>
                            <div>
                                <div 
                                class="rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out  mr-6 cursor-pointer"
                                :class="'bg-green-500 hover:bg-green-600'"
                                >


								<div @click="getUserData(message.user_id)">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" style="float: left; margin-right: 8px;"  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
									</svg>
									<span>Chat</span>
								</div>



                                </div>
                            </div>
                        </div>

                        </div>

                    </li>
                </ul>
            </div>
        </div>
</template>


<script lang="ts">
// interface Room{
//     room_id : number; // i use this variable as index be carful
//     room_name: string;
//     is_locked: boolean;
// }

interface Room{
    id : number; // i use this variable as index be carful
    name: string;
    locked: boolean;
    owner_id: number;
    admins: number[];
}

import { defineComponent } from 'vue'
import axios from 'axios';
import store from '@/store';
import router from '@/router';

const globalComponent = defineComponent({
    name: 'PrivateChatBlock',
    components:{
    },
    data()
    {
        return {
            invalid_pass: false as boolean,
            user_room_pass: '' as string,
            typing_room_id: -1 as number,    
			token: '' as String,
			userId: 0,
			username: '' as String,
			avatar: '' as String,
			joinedRooms: [] as Number[],        
        }
    },
	mounted() {
		if (localStorage.userId) {
			this.userId = localStorage.userId;
		}
		if (localStorage.token) {
			this.token = localStorage.token;
		}
		if (localStorage.avatar) {
			this.avatar = localStorage.avatar;
		}
		if (localStorage.username) {
			this.username = localStorage.username;
		}
		if (localStorage.joinedRooms) {
			this.joinedRooms = localStorage.joinedRooms;
		}
        this.getUsers();

  	},
    methods: {
        async getUsers()
        {
            try {

                const resp = await axios.get(
					`http://localhost:3000/api/v1/messages`,
					{
						headers: { Authorization: `Bearer ${this.token}` }
					}
				);
                const data = resp.data;

                store.commit('updatePrivateList', data);
            }
			catch(e)
            {
                console.log(`while trying to get data for rooms ${e}`);
            }
        },

  
        
        async getUserData(user_id:number)
        {       

            router.push({name: 'privatemsgs', query: { uId: user_id}});
        },
 
    },

    computed: {
        privateList() : Array<any>
        {
            return store.getters.getPrivateList;
        }
    }
})

export default globalComponent;


//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://




//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://

</script>


<style scoped>
.hideScrollBar::-webkit-scrollbar {
    display: none;
}

.hideScrollBar
{
    -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>