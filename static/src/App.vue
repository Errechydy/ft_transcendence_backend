
<template>

<!-- npm remove @vue/cli-plugin-eslint -->
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->


  <div class="flex flex-row h-full">
    <ManagerBlock />
    <div class="px-16 py-4 text-gray-700 bg-gray-200 h-screen w-screen">
        <!-- Content -->
        <router-view />
    </div>
    <!-- <testApp  /> -->
  </div>
</template>
     

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';
import ManagerBlock from './components/manager.vue';
// import testApp from './components/test.vue'
export default defineComponent({
  components: {
    ManagerBlock,
    // testApp,
  },
  data()
  {
	  return {
		  	// userId = 1
			token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMzU0MjUsImV4cCI6MTY1MjYyNzQyNX0.erTb_ngQiIopzOYWovOWCvz3G2LO0v_f1kI2K_dZOUk',
			// userId = 4
			// token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjQ5NzY5MjU0LCJleHAiOjE2NTIzNjEyNTR9.ALBPdeuMvdS5suhHrDLLQj43Q_FoVqz7YbJQSkFHlkI'
	  }
  },
  created(){
	   this.persist();
   },
  methods: {
    async persist() {

		try {

			const resp = await axios.get(
				`http://localhost:3000/api/v1/users/1/current`,
				{
					headers: { Authorization: `Bearer ${this.token}` }
				}
			);
			const data = resp.data;
			localStorage.token = this.token;
			localStorage.userId = data.id;
			localStorage.username = data.username;
			localStorage.avatar = data.avatar;
			localStorage.joinedRooms = data.joinedRooms;
			localStorage.blockedList = data.blockedList;


		}
		catch(e)
		{
			console.log(`while trying to get data for rooms ${e}`);
		}
    }
  }
})
</script>
