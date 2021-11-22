<template>
  <div v-if="isFetching" class="min-h-screen grid place-items-center">
    Fetching User Data ... Please wait!
  </div>
  <!-- If there is an error show error -->
  <div v-else-if="error">{{ errorMessage }}</div>
  <!-- If data has been successfully fetched show the user list -->
  <div v-else class="p-4 max-w-screen-lg mx-auto grid grid-cols-2 gap-4">
    <a href='/' class='text-medium text-indigo-500 cursor-pointer transition-all first-line:ease-out hover:font-bold hover:-translate-x-2 col-span-2'>{{"<< "}}Back to Home</a>
    <!-- Back to Home Button -->
    <!-- Profile picture and username -->
    <div class="bg-white rounded-xl shadow-xl col-span-2 md:col-span-1 flex gap-4 items-center justify-center p-8 border">
      <img :src="user.avatar_url" alt="avatar" class="h-32 md:h-40 rounded-full" />
      <div class="">
        <h1 class="text-3xl font-bold text-gray-900">{{ user?.name }}</h1>
        <h6 class="text-xl font-medium text-gray-500">@{{ user?.login }}</h6>
        <p class="text-gray-700">{{ user.bio }}</p>
      </div>
    </div>
    <!-- Stats -->
    <div class="p-8 grid gap-2 col-span-2 md:col-span-1 rounded-xl shadow-xl bg-white border">
      <!-- Followers -->
      <div class="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span class="">
          {{ user?.followers }} followers | {{ user?.following }} following
        </span>
      </div>
      <!-- Repositories -->
      <div class="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
        <span class=""> {{ user.public_repos }} public repositories </span>
      </div>
      <!-- Location -->
      <div class="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span class="">
          {{ user.location ? user.location : "Location unavailable" }}
        </span>
      </div>
      <!-- Website Link -->
      <div v-if="user.blog" class="flex gap-2 items-center text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          ></path>
          <path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          ></path>
        </svg>
        <a
          target="_blank"
          :href="`https://${user.blog}`"
          :v-show="user.blog"
          class=""
        >
          {{ user.blog }}
        </a>
      </div>
    </div>
    <div class="col-span-2">

    <h6 class="uppercase tracking-widest font-medium text-gray-600 my-4">
      Repositories |

      <button @click="goToRepos"
        class="text-indigo-500 border-b-2 border-indigo-400 cursor-pointer"
      >
        See All Repositories
      </button>
    </h6>
    <Repos :repos="this.repos" />
  </div>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import Repos from "../components/Repos.vue";
export default {
  name: "Profile",
  data() {
    return {
      error: false,
      errorMessage: "",
      isFetching: true,
      user: null,
      repos: {},
    };
  },
  mounted() {
    const route = useRoute();
    const username = route.params.username;
    // Fetching User Details
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        this.user = data;
        this.isFetching = false;
      })
      .catch((err) => {
        console.log({ err });
        this.error = true;
        this.errorMessage = "UserNotFound";
        this.isFetching = false;
      });
    //Fetching 5 Top Repositories
    fetch(`https://api.github.com/users/${username}/repos?per_page=4&page=1`)
      .then((res) => res.json())
      .then((data) => {
        this.repos = data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    goToRepos(){
      const username = this.$route.params.username
      this.$router.push(`/profile/${username}/repos`)
    }
  },
  components: { Repos },
};
</script>
