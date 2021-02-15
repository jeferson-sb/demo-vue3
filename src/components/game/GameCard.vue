<template>
  <div ref="el" class="bg-gray-800 radius-sm shadow-md rounded-md h-full">
    <figure class="relative pb-2/3">
      <img
        :src="isShown ? game.background_image : './src/assets/loading.svg'"
        :alt="`${game.name} cover image`"
        class="absolute h-full w-full object-cover rounded-t-md"
      />
    </figure>

    <div class="p-5">
      <h3 class="text-2xl font-bold">{{ game.name }}</h3>
      <div class="my-2 flex flex-wrap">
        <span
          v-for="platform in platforms"
          :key="platform.id"
          class="bg-gray-700 bg-opacity-50 mr-2 my-1 px-2 rounded-lg"
        >
          {{ platform.platform.name }}
        </span>
      </div>
      <span
        class="flex items-center justify-center w-1/3 px-1 font-bold text-lg text-yellow-400 bg-gray-300 bg-opacity-25 rounded-lg"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="mr-1"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        {{ game.rating }}
      </span>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '../../composables/useIntersectionObserver'

export default {
  name: 'GameCard',
  props: {
    game: Object,
  },
  setup(props) {
    const el = ref(null)
    const { observe, unobserve, isShown } = useIntersectionObserver()

    const platforms = computed(() => props.game.platforms)

    onMounted(() => {
      observe(el.value)
    })

    onBeforeUnmount(() => {
      unobserve(el.value)
    })

    return { platforms, el, isShown }
  },
}
</script>
