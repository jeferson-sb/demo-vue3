<template>
  <section class="grid grid-cols-2 py-16 px-32 gap-4" v-if="!loading">
    <aside class="max-w-screen-sm">
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
      <h1 class="text-5xl font-bold">{{ gameDetails.name }}</h1>
      <p class="opacity-75 mb-5">Release Date: {{ dateReleased }}</p>
      <p
        class="text-4xl font-semibold border-solid border-4 border-blue-600 w-24 text-center"
      >
        {{ gameDetails.rating }}
      </p>
      <p class="opacity-50">({{ gameDetails.reviews_count }}) Reviews</p>
      <div class="my-5 flex flex-wrap">
        <span
          v-for="platform in gameDetails.platforms"
          :key="platform.id"
          class="bg-gray-800 bg-opacity-50 mr-2 my-1 px-2 rounded-lg"
        >
          {{ platform.platform.name }}
        </span>
      </div>
      <div class="my-5">
        <span
          v-for="genre in gameDetails.genres"
          :key="genre.id"
          class="bg-gray-800 bg-opacity-50 mr-2 my-1 px-2 rounded-lg"
        >
          {{ genre.name }}
        </span>
      </div>
      <a
        v-if="gameDetails.stores"
        :href="gameDetails.stores[0].url"
        target="_blank"
        rel="noopener norefferer"
        class="px-5 py-2 bg-blue-800 hover:bg-blue-500 transition duration-500 ease-in-out shadow-sm"
        >Buy {{ gameDetails.name }}
      </a>
      <hr class="my-4 opacity-25 bg-blue-400" />
      <div class="my-5">
        <span
          class="mr-2 font-bold border-2 border-green-600 text-green-600 p-3 py-2"
          >{{ gameDetails.metacritic }}
        </span>
        <a
          :href="gameDetails.metacritic_platforms"
          target="_blank"
          rel="noopener norefferer"
          class="px-5 py-2 bg-blue-800 hover:bg-blue-500 transition duration-500 ease-in-out shadow-sm"
        >
          View Critics
        </a>
      </div>
    </aside>

    <figure class="h-4/5 w-4/5">
      <img
        :src="gameDetails.background_image"
        :alt="`${gameDetails.name} cover image`"
        class="lozad rounded-md shadow-md"
      />
      <figcaption class="text-center opacity-50 my-2">
        Developed by <strong>{{ developers }}</strong>
      </figcaption>
    </figure>

    <div class="p-5 max-w-screen-sm bg-gray-800">
      <h4 class="text-3xl font-semibold">About</h4>
      <p v-html="gameDetails.description"></p>
    </div>

    <video
      v-if="gameDetails.clip"
      :src="gameDetails.clip.clip"
      controls
      preload="auto"
      class="rounded-md shadow-md"
      :poster="gameDetails.clip.preview"
    ></video>
  </section>
</template>

<script>
import useFetch from '../composables/useFetch';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const { results, hasErrors, loading, execute } = useFetch();
    const gameTitle = route.params.name;

    onMounted(() => {
      execute(`https://api.rawg.io/api/games/${gameTitle}`);
    });

    const dateReleased = computed(() => {
      return new Date(results.value.released).toLocaleString(['en-US'], {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    });

    const developers = computed(() => {
      const gameInfo = results.value;
      return gameInfo.developers?.map(developer => developer.name).join('');
    });

    return {
      gameDetails: results,
      dateReleased,
      developers,
      loading,
      hasErrors,
    };
  },
};
</script>
