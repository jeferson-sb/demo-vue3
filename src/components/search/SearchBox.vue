SearchBox
<template>
  <input
    type="search"
    v-model="searchInput"
    v-on:keyup.enter="$emit('fetch-game')"
    class="flex-1 text-black px-4 py-2 bg-gray-800 text-gray-300 rounded-sm"
    placeholder="Enter your favorite game..."
  />
  <button
    @click="$emit('fetch-game')"
    class="py-2 px-5 uppercase font-bold bg-green-400 rounded-sm ml-2"
  >
    Search
  </button>
</template>
