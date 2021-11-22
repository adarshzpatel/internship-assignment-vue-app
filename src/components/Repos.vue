<template>
  <!-- Repos Container -->
    <div class="flex items-center justify-center p-16" v-if="repos==={}">No Repositories Found !</div>
    <ul v-else class="grid lg:grid-cols-2 gap-4   ">
      <li class="flex flex-col bg-white justify-between border p-4 hover:bg-white rounded-xl shadow-lg hover:shadow-2xl transform ease-out duration-200 hover:scale-[1.01] hover:border-gray-400 cursor-pointer" v-for="(repo, index) in repos" :key="index">
        <RepoItem :repo='repo' />
      </li>
    </ul>
</template>

<script>
import RepoItem from "./RepoItem.vue";
export default {
    name: "Repos",
    props: {
      repos:{
        type:Object,
        required:true,
      }
    },
    components: { RepoItem }
};
</script>
