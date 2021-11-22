<template>
<!-- Repo Name -->
  <p class="text-lg font-medium">{{ repo?.full_name }}</p>
  <!-- Topics -->
  <ul class="flex flex-wrap gap-2 my-1">
    <li
      class="
        bg-indigo-500
        text-white
        leading-relaxed
        tracking-wider
        px-2
        rounded
        text-xs
        font-medium
      "
      v-for="(topic, index) in repo?.topics"
      :key="index"
    >
      {{ topic }}
    </li>
  </ul>
  <div class="text-gray-500">
    <!-- Repo Description -->
    <p v-if="repo?.description">{{ repo?.description }}</p>
    <p v-else>No description available.</p>
  </div>
  <div class="flex gap-4">
    <!-- Forks Count -->
    <div class="text-gray-600 text-sm my-2 flex gap-1">
      <svg
        aria-hidden="true"
        height="20"
        class="fill-current"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        data-view-component="true"
      >
        <path
          fill-rule="evenodd"
          d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
        ></path>
      </svg>
      Forks : {{ repo?.forks_count }}
    </div>
    <div class="text-gray-600 text-sm my-2 flex gap-1">
      <!-- Stars Count -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="20"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-yellow-500 fill-current"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      Stars : {{ repo?.stargazers_count }}
    </div>
  </div>
  <div>
    <a
      class="
      rounded-xl
        border border-gray-400
        py-1
        px-2
        transition-all
        duration-300
        ease-out
        hover:bg-indigo-600 hover:text-white
        font-medium
        hover:border-0
        text-indigo-500 text-sm
      "
      target="_blank"
      :href="repo?.html_url"
      >View Repository in Github</a
    >
  </div>
</template>
<script>
export default {
  name: "RepoItem",
  props: {
    repo: {
      type: Object,
    },
  },
};
</script>
