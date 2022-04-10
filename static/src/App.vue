
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
			token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5NjE3MDQ1LCJleHAiOjE2NTIyMDkwNDV9.wI-kuAjS-PDo43WRL0MaZpNKVkBxW5QvYIXxMK0oz5Y',

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


		}
		catch(e)
		{
			console.log(`while trying to get data for rooms ${e}`);
		}
    }
  }
})
</script>
