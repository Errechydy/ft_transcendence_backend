<template>
<div>

	<div v-if="isPopUp">
		<div class="bg-slate-800 bg-opacity-50 flex z-[1000] justify-center absolute top-0 right-0 bottom-0 left-0">
			<div class="flex flex-col justify-center">
				<div class="bg-white px-10 py-8 rounded-md flex flex-col justify-between">

						<div class="flex-1 -mt-5 mb-5 -mr-5">
							<div class="flex justify-end">
								<svg @click="isPopUp = false;" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
							</div>
						</div>

					<button @click="profileClicked" class="mb-2 bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Profile</button>


					<div v-if="clickedUserId != userId" class="w-full">
						<div v-if="clickedUserId != userId || true" class="w-full">
							<button @click="inviteClicked" class="w-full mb-2 bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Invite </button>
							<button v-if="(isAdmin && !roomInfo.admins.includes(clickedUserId)) || isOwner" @click="banClicked" class="w-full mb-2 bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Ban</button>
							<input  v-if="(isAdmin && !roomInfo.admins.includes(clickedUserId)) || isOwner" v-focus class="w-full px-4 py-2 rounded-lg text-center mb-2 border-2 border-blue-500" :class="{'border-red-500' : invalidTime}" type="text" v-model="numOfSeconds" placeholder="seconds"/>
							<button v-if="(isAdmin && !roomInfo.admins.includes(clickedUserId)) || isOwner" @click="muteClicked" class="w-full mb-2 bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Mute</button>
						</div>

						<div v-if="isOwner" class="w-full">
							<button v-if=" !roomInfo.admins.includes(clickedUserId) " @click="addAdmin" class="mb-2 w-full bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Set as admin</button>
							<button v-else @click="removeAdmin" class="mb-2 w-full bg-indigo-500 px-4 py-2 rounded-md text-md text-white">Remove admin</button>
						</div>
					</div>
		
					
				
				</div>
			</div>
		</div>
	</div>

	<div class="flex-1 p:2 sm:p-6 justify-between flex flex-col" style="height:90vh;">



		<nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">

		<div class="mb-2 sm:mb-0 flex flex-row">
			{{ (this.roomInfo != null) ? this.roomInfo.name : '' }} <!-- will display room name username should be changed to roomName maybe -->
		</div>

		<div class="sm:mb-0 self-center">
			<button @click="leaveRoom" class="bg-blue-500 font-bold text-white  px-5 rounded">leave</button>
		</div>
		</nav>



	<div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
	</div>
	<div id="messages" v-godown  class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
		
		<div class="chat-message" v-for="msg in currentMsgs" :key="msg.id">
			<div class="flex items-start" >
				
				<div class="px-5 my-2 text-gray-700 relative text-orange-500 cursor-pointer" @click="userIconClicked(msg)" style="max-width: 300px;">
					<img class="hidden sm:block w-full h-auto" loading="lazy" :src="'http://localhost:3000/uploads/'+msg.avatar" alt="" width="50px" height="50px" style="width: 50px; margin: auto;">
					<span class="block"> {{ msg.username }} </span>
				</div>
				<div class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative" style="max-width: 300px;">
				<span class="block"> {{ msg.msg }} </span>
				<span class="block text-xs text-right"> {{ timestampToDateTime(+msg.created) }} </span>
				</div>

				
	
			</div>
		</div>
	</div>


	<div class="px-4 pt-4 mb-2 sm:mb-0">
		<div class="relative flex">
			<input type="text" v-model="curMsgData" @keypress.enter="addMessage" placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-white-200 rounded-md py-3">
			<div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
				<button @click="addMessage"  type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
				<span class="font-bold">Send</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
					<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
				</svg>
				</button>
			</div>
		</div>
	</div>
	</div>
</div>

</template>

<script lang="ts">

import store from '@/store';
import axios from 'axios';
import router from '@/router';
import { defineComponent } from 'vue';
import io from 'socket.io-client';


interface message{
	id: number;
	room_id: number;
	from_id: number;
	avatar: string;
	username: string;
	msg: string;
	created: string;
}


const globalComponentRoomMessages =  defineComponent({
   name: 'ChatPublicRoomMsg',
   data()
   {
      return {
		clickedUserId: 0 as number,
		ownerId: 0 as number,
		isOwner: false as boolean,
		isAdmin: false as boolean,
		numOfSeconds: '' as string,
		isPopUp: false as boolean,
        curMsgData: '' as string,
        roomId: Number(this.$route.query.roomId),
		token: '' as string,
		userId: 0,
		username: '' as string,
		avatar: '' as string,
		joinedRooms: [] as number[],
		blockedList: [] as number[],
		roomInfo: null as any,
		invalidTime: false as boolean,
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
		if (localStorage.blockedList) {
			this.blockedList = localStorage.blockedList;
		}
	   this.getRoomsMessages();
	   this.getRoomsInfo();
	   joinTheRoom(localStorage.userId, this.roomId);
  	},
   methods: {
	   async getRoomsInfo()
        {

			// Append roomId to the url
            const resp = await axios.get(
				`http://localhost:3000/api/v1/room/${this.roomId}`,
				// `http://localhost:3000/api/v1/room/1/messages`,
				{
					headers: { Authorization: `Bearer ${this.token}` }
				}
			);
            this.roomInfo = resp.data;

			this.isAdmin = this.roomInfo.admins.includes(localStorage.userId);
			this.isOwner = localStorage.userId == this.roomInfo.owner_id;
			this.ownerId = this.roomInfo.owner_id;
        },
		async getRoomsMessages()
        {

			// Append roomId to the url
            const resp = await axios.get(
				`http://localhost:3000/api/v1/room/${this.roomId}/messages`,
				// `http://localhost:3000/api/v1/room/1/messages`,
				{
					headers: { Authorization: `Bearer ${this.token}` }
				}
			);
            const data = resp.data;
            store.commit('updatePublicRoomMsgs', data);
            // now i will redirect him to chat block messages
        },
      addMessage()
      {
         const tmp = this.curMsgData.trim();
         if (tmp.length !== 0)
         {
			handleSubmitNewMessage(this.userId, this.username, this.avatar, this.roomId, tmp);
			this.curMsgData = '';
         }
      },

	  newMessage(data: any)
      {
			if( !this.blockedList.includes(data.from) )
		  	{
			  	const msgObj = {
                  	id: 0,
					room_id: 0,
					from_id: data.from,
					username: data.username,
					avatar: data.avatar,
					msg: data.message,
					created: Date.now(),
				};
				this.curMsgData = '';
				store.commit('addMessageToRoomMsgs', msgObj);
			}
	  },
	  timestampToDateTime(unix_timestamp: number)
	  {
			var a = new Date(unix_timestamp);
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
			return time;
	  },
	  leaveRoom()
	  {
		  leaveTheRoom(this.userId, this.roomId);
	  },
	  goBackToRoomsList()
	  {
		  router.push({name: 'chatpublic'});
	  },
	  userIconClicked(msg:message)
	  {
		  	this.isPopUp = true;
			this.clickedUserId = msg.from_id;
		  	console.log(`message clicked`);
	  },
	  disablePopUp()
	  {
		  console.log('blured');
		  this.isPopUp = false;
	  },
	  profileClicked()
	  {
		  console.log(`profile clicked`);
		  this.isPopUp = false;
	  },
	  inviteClicked()
	  {
		  console.log(`invite clicked`);
		  this.isPopUp = false;
	  },
	  async muteClicked()
	  {
		  if (Number.isInteger(+this.numOfSeconds) && +this.numOfSeconds > 0)
		  {
			  	// TODO : axios:
				//   if success
				const resp = await axios.post(
					`http://localhost:3000/api/v1/ban`,
					{
						"banned": false,
						"room_id": this.roomId,
						"user_id": this.clickedUserId,
						"duration": +this.numOfSeconds
					},
					{
						headers: { Authorization: `Bearer ${localStorage.token}` }
					}
				);

				if(!resp.data.status)
				{
					this.numOfSeconds = '';
			  		this.invalidTime = false;
		  			this.isPopUp = false;
				}
		  }
		  else
		  {
			  this.invalidTime = true;
			  return ;
		  }
	  },
	  async banClicked()
	  {
		  	const resp = await axios.post(
				`http://localhost:3000/api/v1/ban`,
				{
					"banned": true,
					"room_id": this.roomId,
					"user_id": this.clickedUserId,
					"duration": 0
				},
				{
					headers: { Authorization: `Bearer ${localStorage.token}` }
				}
			);

			if(!resp.data.status)
			{
				this.isPopUp = false;
			}
	  },
	async addAdmin()
	{
		const resp = await axios.post(
			`http://localhost:3000/api/v1/room/${this.roomId}/add-admin`,
			{
				"userId": this.clickedUserId
			},
			{
				headers: { Authorization: `Bearer ${localStorage.token}` }
			}
		);

		if(!resp.data.status)
		{
			this.isPopUp = false;
		}

	},
	async removeAdmin()
	{
		const resp = await axios.post(
			`http://localhost:3000/api/v1/room/${this.roomId}/remove-admin`,
			{
				"userId": this.clickedUserId
			},
			{
				headers: { Authorization: `Bearer ${localStorage.token}` }
			}
		);

		if(!resp.data.status)
		{
			this.isPopUp = false;
		}

	}
   },

   directives: {
      godown(box:any)
      {
         box.scrollTop = box.scrollHeight; // probably i will make call to async function to scroll down since until this line height is still old
      },
	focus : {
        mounted(el) {
            el.focus();
        },
    }
   },
   computed: {
      currentMsgs() : Array<message>
      {
         return store.getters.getMsgs;
      }
   }

})

export default globalComponentRoomMessages;


//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://


const socket = io("http://localhost:8000")

// receive message
socket.on("message", ({ data }) => {
	globalComponentRoomMessages.methods!.newMessage(data);
})

// send message
const handleSubmitNewMessage = (from: number, username: string, avatar: string, roomName: number, message: string) => {

	const messageData = {
						from: from,
						username: username,
						avatar: avatar,
						roomName: roomName,
						message: message
					}

	socket.emit(
				'chat-room',
				{ 
					data: messageData
				},
				// send message callback
				(response: any) => {
					if(response.status)
					{
						globalComponentRoomMessages.methods!.newMessage(messageData);
					}
				}
			)
	}



// // join room
const joinTheRoom = (userId: number, roomId: number) => {
	socket.emit(
		'join-room-m',
		{ 
			data: {
				from: userId,
				roomName: roomId,
			}
		}
	)
}



const leaveTheRoom = (userId: number, roomId: number) => {
	socket.emit(
		'leave-room',
		{ 
			data: {
				from: userId,
				roomName: roomId
			}
		},
		(response: any) => {
			// join-room callback
			if(response.status)
			{
				globalComponentRoomMessages.methods!.goBackToRoomsList();
			}
			else
			{
				console.log("Error joining the room"); // ok
			}
		}
	)
}




//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::::://

</script>


<style scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}

</style>