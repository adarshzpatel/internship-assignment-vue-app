<template>
  <header class="border-b border-gray-400 shadow-xl z-10 w-full sticky top-0 left-0 backdrop-blur-lg">
    <nav class="max-w-screen-lg  mx-auto p-4 lg:px-0">
      <form @submit.prevent="searchUsers" class="flex flex-wrap justify-center gap-4 items-center">
        <input
          placeholder="Enter Github Username"
          class="
            rounded-xl
            border-gray-400 border
            px-3
            py-1
            focus:outline-none focus:border-indigo-500 focus:border-2
          "
          v-model="searchValue"
          type="text"
        />
        <select
          v-model="type"
          class="
            rounded-xl
            py-1
            px-3
            border
            focus:border-2
            focus:outline-none
            border-gray-400
            focus:border-indigo-600
          "
          name=""
          id=""
        >
          <option value="users">Users</option>
          <option value="organizations">Organizations</option>
          <option value="repos">Repositories</option>
        </select>
        <button
          type="submit"
          class="rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 px-3 py-1"
        >
          Search
        </button>
      </form>
    </nav>
  </header>
  <main class="max-w-screen-lg mx-auto">
    <p v-if="isFetching">Fetching data from API</p>

    <ul v-else class="p-4 flex flex-col gap-4 space-y">
      <li
        class=" hover:bg-gray-100 "
        v-for="(item, index) in data"
        :key="index"
      >
        <UserItem
          v-if="type == 'users' || type == 'organizations'"
          :user="item"
        />
        <div v-else class="flex flex-col bg-white justify-between border p-4 hover:bg-white rounded-xl shadow-lg hover:shadow-2xl transform ease-out duration-200 hover:scale-[1.01] hover:border-gray-400 cursor-pointer">
        <RepoItem  :repo="item" />
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
import UserItem from "../components/UserItem.vue";
import RepoItem from "../components/RepoItem.vue";
export default {
  name: "Home",
  data() {
    return {
      type: "users",
      searchValue: "",
      isFetching: false,
      data: [],
    };
  },
  methods: {
    searchUsers() {
      this.isFetching = true;
      console.log("fetching");
      //fetch list of users according to the search Value when search value is not empty
      if (this.searchValue != "" && this.type === "users") {
        fetch(
          `https://api.github.com/search/users?q=${this.searchValue}&page=1,per_page=10}`
        )
          .then((res) => res.json())
          .then((data) => {
            this.data = data.items;
            console.log(data);
          })
          .catch((err) => alert(err));
      } else if (this.searchValue != "" && this.type === "organizations") {
        fetch(
          `https://api.github.com/search/users?q=${this.searchValue}&page=1,per_page=10}`
        )
          .then((res) => res.json())
          .then((data) => {
            this.data = data.items;
            console.log(data);
          })
          .catch((err) => alert(err));
      } else {
        //fetch repositories
        fetch(
          `https://api.github.com/search/repositories?q=${this.searchValue}&page=1,per_page=10}`
        )
          .then((res) => res.json())
          .then((data) => {
            this.data = data.items;
            console.log(this.data);
          })
          .catch((err) => alert(err));
      }
      this.searchValue = "";
      this.isFetching = false;
    },
  },
  components: { UserItem, RepoItem },
};
</script>
