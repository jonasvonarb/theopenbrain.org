<template>
  <div
    class="fixed text-center flex justify-center items-center top-0 left-0 z-[10000] bg-black/90 text-white w-screen h-screen"
  >
    <div class="w-1/2 max-w-[462px] pb-64">
      <h3><em>The Open Brain</em> is an Open Access neuroscience textbook.</h3>
      <p class="pb-12 text-base">
        Our first chapter is now online! Our long-term goal is to produce an
        entire ‘textbook’ worth of material, and we are currently fundraising.
      </p>
      <p class="pb-12 text-base">
        This current chapter, while completely functional, is only a prototype,
        and many things may change over time. Thanks for your patience!
      </p>
      <button
        @click="visited"
        class="uppercase bg-white text-black border border-black font-mono z-50 px-3 rounded-full hover:bg-primaryMed hover:text-white hover:border-primaryMed"
      >
        Enter
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGeneral } from "@/stores";

const store = useGeneral();
const visited = () => {
  store.hasBeenVisited = true;
  localStorage.setItem("hasBeenVisited", Date.now());
};
</script>

<style scoped></style>
