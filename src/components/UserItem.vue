<template>
  <div class="cursor-pointer border p-4 hover:bg-white transform hover:scale-[1.01] hover:px-16 hover:shadow-lg hover:border transition-all duration-200 ease-out hover:border-gray-400 items-center flex gap-4 rounded-2xl " @click="goToProfile(user?.login)">
    <img :src="user?.avatar_url" class=" border-2 h-16 w-16 rounded-full"/>
    <h6 class='font-semibold text-xl'>{{user?.login}}</h6>
  </div>
</template>

<script>
export default {
  name:"UserItem",
  props:{
    user: Object
  },
  methods:{
    goToProfile(username){
      this.$router.push(`/profile/${username}`);
    }
  }
}
</script>