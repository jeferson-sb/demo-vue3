<template>
  <ul
    class="w-full grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
  >
    <li v-for="i in 9" :key="i">
      <div
        class="bg-gray-800 radius-sm shadow-md rounded-md h-full animate-pulse"
      >
        <figure class="pb-2">
          <div
            class="rounded-t-md bg-gray-700 w-full"
            style="height: 220px"
          ></div>
        </figure>

        <div class="p-5 pb-3">
          <h3 class="h-8 w-32 bg-gray-700"></h3>
          <div class="my-2 flex flex-wrap">
            <span
              class="bg-gray-700 bg-opacity-50 mr-2 my-1 px-2 rounded-lg w-16 h-7"
            ></span>
            <span
              class="bg-gray-700 bg-opacity-50 mr-2 my-1 px-2 rounded-lg w-16 h-7"
            ></span>
            <span
              class="bg-gray-700 bg-opacity-50 mr-2 my-1 px-2 rounded-lg w-16 h-7"
            ></span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
