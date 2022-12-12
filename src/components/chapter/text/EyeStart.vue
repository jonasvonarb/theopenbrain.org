<script setup>
import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import {toSlug} from "@/helper/general";
import menu from "/src/assets/menu/menu.json";
const route = useRoute();
const store = useGeneral();
</script>
<template>
  <div
    id="titleAnimation"
    class="absolute top-0 w-screen z-[50] bg-yellow-300 pointer-events-none overflow-hidden duration-500"
    :class="!store.startIsActive ? 'h-0' : 'h-screen'"
  >
    <!-- :class="store.isScrolling ? ' z-[20]	' : ' duration-500 z-[55]'" -->

    <img
      class="absolute top-0 left-0 w-full h-screen"
      src="/assets/images/6eee34a5c5d835360c6ffa36c5f49efa.jpeg"
    />
    <div class="absolute bottom-6 right-12 w-full flex justify-end pr-3">
      <button
        class="pointer-events-auto text-xl text-white bg-black rounded-full w-16 h-16"
        @click="store.startIsActive = !store.startIsActive"
      >
        &#x2193;
      </button>
    </div>

    <!-- chapter structur -->
    <!-- <ul
      class="flex absolute top-0 left-0 w-[35vw] h-full pt-20 mb-52 flex-row duration-700 shrink-1 bg-white/90 pointer-events-auto"
    >
      <li class="w-[35vw] shrink-0 h-full">
        <ul
          class="pl-8 px-12 w-full h-full overflow-hidden text-black duration-700"
        >
          <h2 class=" ">
            {{ menu["Part9"].title }}
          </h2>
          <RouterLink
            class="flex"
            :to="{
              name: 'chapter',
              hash: '#the-eye-and-retina-intro',
            }"
          >
            <li class="w-full border-b pt-4 border-black hover:bg-gray-100">
              0 Intro
            </li>
          </RouterLink>
          <RouterLink
            v-for="(part, index2) in menu['Part9'].parts"
            class="flex"
            :to="{
              name: 'chapter',
              hash: '#' + toSlug(part),
            }"
          >
            <li class="w-full border-b pt-4 border-black hover:bg-gray-100">
              {{ index2 + 1 + " " + part }}
            </li>
          </RouterLink>
        </ul>
      </li>
    </ul> -->
  </div>
</template>

<style scoped></style>
