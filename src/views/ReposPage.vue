<template>

  <div class="p-4 pb-2 mb-8 shadow-2xl sticky top-0 left-0 z-10 backdrop-blur-lg bg-gray-100 bg-opacity-30 border-b border-gray-400">
    <div class="flex  flex-wrap max-w-screen-lg mx-auto justify-between items-center">
    <a
      href="/"
      class="
        text-medium text-indigo-500
        cursor-pointer
        transition-all
        first-line:ease-out
        hover:font-bold hover:-translate-x-2
        col-span-2
      "
      >{{ "<< " }}Back to Home</a
    >
      <input
        placeholder="Search by name"
        class="
          rounded-xl
          border
          px-2
          py-1
          focus:outline-none focus:border-2 focus:border-indigo-500
        "
        type="text"
        v-model="filter"
      />
      <h1 class="leading-loose text-2xl font-bold mb-2 text-indigo-600">
        @{{ this.$route.params.username }}
      </h1>
    </div>
  </div>
  <div class="p-4 max-w-screen-lg mx-auto">
  
    <Repos
      :repos="
        this.repos.filter((item) =>
          item.full_name.toLowerCase().includes(this.filter.toLowerCase())
        )
      "
    />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import Repos from "../components/Repos.vue";
export default {
  name: "ReposPage",
  data() {
    return {
      filter: "",
      repos: [],
    };
  },
  mounted() {
    const router = useRoute();
    const username = router.params.username; 
    //fetching repos for the given user
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => {
        this.repos = data;
      })
      .catch((err) => console.log(err));
  },
  components: {
    Repos,
  },
};
</script>
