<template>
  <section
    class="container mx-auto md:max-w-5xl grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16 md:pr-10"
    v-if="gameDetails"
  >
    <div
      class="relative z-10 col-start-1 row-start-1 py-3 px-2 sm:px-0 bg-gradient-to-t from-black sm:bg-none"
    >
      <router-link to="/">
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          class="bi bi-arrow-left hover:text-blue-700"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
          />
          <path
            fill-rule="evenodd"
            d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </router-link>
      <h2
        class="text-xl font-semibold text-white sm:text-2xl sm:leading-7 md:text-5xl"
      >
        {{ gameDetails.name }}
      </h2>
      <div class="text-sm font-medium text-white mt-4 sm:text-gray-500">
        <div class="flex items-center text-sm font-medium">
          <div
            class="flex items-center mr-2"
            v-for="developer in gameDetails.developers"
            :key="developer.id"
          >
            <div class="ml-1">
              <img
                :src="developer.image_background || '/src/assets/no-image.jpg'"
                :alt="`${developer.name} badge image`"
                class="w-7 h-7 rounded-full mr-2 bg-gray-100"
              />
            </div>
            <div>
              <strong>{{ developer.name }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-start-1 row-start-2 px-2 sm:px-0 pb-4">
      <aside class="max-w-screen-sm">
        <div class="grid gap-4 grid-cols-3 my-4">
          <div class="col-span-2">
            <p
              class="text-4xl font-semibold border-solid border-4 border-blue-600 w-24 text-center"
            >
              {{ gameDetails.rating }}
            </p>
            <p class="opacity-50">({{ gameDetails.reviews_count }}) Reviews</p>
          </div>
          <div class="col-span-1">
            <a
              v-if="gameDetails.stores.length"
              :href="gameDetails.stores[0].url"
              target="_blank"
              rel="noopener norefferer"
              class="flex px-5 py-3 bg-blue-800 hover:bg-blue-500 transition duration-500 ease-in-out shadow-sm"
              >Buy
            </a>
          </div>
        </div>
        <div class="my-8">
          <span
            :class="`mr-2 font-bold border-2 border-${metacriticColor}-600 text-${metacriticColor}-600 p-3 py-2`"
            >{{ gameDetails.metacritic || 'tbd' }}
          </span>
          <a
            v-if="gameDetails.metacritic_url"
            :href="gameDetails.metacritic_url"
            target="_blank"
            rel="noopener norefferer"
            class="px-5 py-2 bg-blue-800 hover:bg-blue-500 transition duration-500 ease-in-out shadow-sm"
          >
            View Critics
          </a>
        </div>
        <div class="grid gap-4 grid-cols-3 my-4">
          <div class="col-span-2">
            <div class="flex flex-wrap">
              <span
                v-for="platform in gameDetails.platforms"
                :key="platform.id"
                class="bg-gray-800 mr-2 my-1 px-2 rounded-lg"
              >
                {{ platform.platform.name }}
              </span>
            </div>
          </div>
          <div class="col-span-1 text-right">
            <div class="flex flex-wrap justify-end">
              <span
                v-for="genre in gameDetails.genres"
                :key="genre.id"
                class="bg-gray-800 mr-2 my-1 px-2 rounded-lg"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>
        </div>
        <hr class="my-4 opacity-25 bg-blue-400" />
        <div class="text-sm font-medium text-white my-1 sm:text-gray-500">
          Release Date: {{ dateReleased }}
        </div>
      </aside>
    </div>
    <div class="col-start-1 row-start-3 space-y-3 px-2 sm:px-0">
      <div class="p-5 bg-gray-800">
        <h4 class="text-3xl font-semibold">About</h4>
        <p v-html="gameDetails.description"></p>
      </div>
    </div>
    <div
      class="col-start-1 sm:col-start-2 row-start-1 sm:mt-11 sm:row-span-4 flex"
    >
      <div
        class="w-full grid grid-cols-2 grid-rows-2 sm:grid-rows-4 xl:grid-rows-3 gap-2"
      >
        <div class="relative col-start-1 col-span-2 row-span-2">
          <img
            :src="gameDetails.background_image || '/src/assets/no-image.jpg'"
            :alt="`${gameDetails.name} cover image`"
            class="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg lozad"
          />
        </div>
        <div
          class="relative hidden sm:block col-start-1 col-span-2 xl:col-span-1"
        >
          <img
            v-if="gameDetails.background_image_additional"
            :src="gameDetails.background_image_additional"
            :alt="`${gameDetails.name} additional image`"
            class="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg lozad"
          />
        </div>
        <div
          class="relative hidden sm:block col-start-1 xl:col-start-2 col-span-2 xl:col-span-1"
        >
          <video
            v-if="gameDetails.clip"
            :src="gameDetails.clip.clip"
            controls
            preload="auto"
            class="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
            :poster="gameDetails.clip.preview"
          ></video>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import useSWRFetch from '../composables/useSWRFetch'
import getMetacriticColor from '../composables/getMetacriticColor'

export default {
  name: 'GameProfile',
  setup() {
    const route = useRoute()
    const gameTitle = route.params.name
    const apiKey = import.meta.env.VITE_RAWG_API_KEY
    const { data: gameDetails, error } = useSWRFetch(
      `https://api.rawg.io/api/games/${gameTitle}?key=${apiKey}`,
    )

    const dateReleased = computed(() =>
      new Date(gameDetails.value.released).toLocaleString(['en-US'], {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    )

    const developers = computed(() => {
      const gameInfo = gameDetails.value
      return gameInfo.developers?.map((developer) => developer.name).join('')
    })

    const metacriticColor = computed(() => {
      const gameInfo = gameDetails.value
      return getMetacriticColor(gameInfo.metacritic)
    })

    return {
      gameDetails,
      dateReleased,
      metacriticColor,
      developers,
      error,
    }
  },
}
</script>
