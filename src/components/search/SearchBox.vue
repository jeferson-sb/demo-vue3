<template>
  <div class="flex mb-4">
    <input
      type="search"
      v-model="searchInput"
      v-on:keyup.enter="$emit('fetchGame', searchInput)"
      class="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-sm"
      placeholder="Enter your favorite game..."
    />
    <button
      @click="fetchGame"
      class="py-2 px-5 uppercase font-bold bg-green-400 rounded-sm ml-2"
    >
      Search
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchBox',
  setup() {
    const searchInput = ref('')
    return {
      searchInput,
    }
  },
  emits: ['fetchGame'],
}
</script>
