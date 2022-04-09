<template>

    <div
      class="flex flex-col items-center justify-center" style="height:90vh;"
    >
      <div
        class="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
      >


        <div class="mt-5">
          <form @submit.prevent="createRoom">
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Room Name:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
    
                </div>

                <input
                  id="text"
                  type="text"
                  name="text"
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  :class="{'bg-pink-500' : invalid_name}"
                  v-model="room_name"
                  @keyup="userIsTyping($event, 0)"
                  @keypress="userIsTyping($event, 0)"
                  placeholder="Enter name room"
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Password:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="true"
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  :class="{'bg-pink-500' : inavlid_pass}"
                  v-model="room_password"
                    @keyup="userIsTyping($event, 1)"
                    @keypress="userIsTyping($event, 1)"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                <span class="mr-2 uppercase">create</span>
              </button>
              
              <div
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                  <input type="checkbox" @click="changeAccess" class="opacity-0 absolute">
                  <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"  :class="{checked : is_private}"  viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                </div>
                  <label class="text-gray-600">private</label>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import store from '@/store';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CreateRoomBlock',
    data()
    {
        return {
            room_password: '' as string,
            room_name: '' as string,
            tmp_password: '' as string,
            tmp_name: '' as string,
            invalid_name: false as boolean,
            inavlid_pass: false as boolean,
            is_private: false as boolean,
      }
    },
    methods: {
        async createRoom()
        {
            this.tmp_name = this.room_name.trim();
            this.tmp_password = this.room_password.trim();
            if (this.tmp_name.length !== 0 && this.tmp_password.length !== 0)
            {
                // means password and name are valid
                // here i will send to some endpoint name and pass and user_id  and user name
                // i have user name and id in store maybe i will use them
                // room_name has name with spaces maybe i will use tmp_name since tmp_name has no spaces at end and start
                console.log(`create room with ${this.room_name} ${this.room_password}`);
                // i'm assuming that password and name are valid
                store.commit('addRoom', {
                  room_id: 0, // this id will be updated inside mutations
                  room_name: this.tmp_name,
                  is_locked: this.is_private
                });
                router.push({name: 'chatpublic'});
            }else
            {
                this.invalid_name = !this.tmp_name.length;
                this.inavlid_pass = !this.tmp_password.length;
            }

        },
        userIsTyping(e:any, index:number)
        {
            if (e.keyCode !== 13)
            {
                if (index === 0)
                    this.invalid_name = false;
                else
                    this.inavlid_pass = false;
            }
        },
        changeAccess()
        {
          this.is_private = !this.is_private;
        }
    }
})
</script>


<style scoped>
.checked{
    display: block;
}
</style>