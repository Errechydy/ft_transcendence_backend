
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
import ManagerBlock from './components/manager.vue';
// import testApp from './components/test.vue'
export default defineComponent({
  components: {
    ManagerBlock,
    // testApp,
  },
})
</script>
