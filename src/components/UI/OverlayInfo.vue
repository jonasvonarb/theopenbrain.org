<template>
  <div
    class="fixed text-center flex justify-center items-center top-0 left-0 z-[10000] bg-black/90 text-white w-screen h-screen"
  >
    <div class="w-1/2 max-w-[400px] pb-64">
      <h3><em>The Open Brain</em> is an Open Access neuroscience textbook.</h3>
      <p class="pb-12 text-base">
        While we currently only have one chapter online, we are actively seeking
        funding in order to expand the book with many more chapters covering the
        breadth of neuroscience topics. Stay tuned for more!
      </p>
      <p class="pb-12 text-base">
        This is only a prototype, and many things may change over time. Caution:
        due to possible changes in the code and the mechanics of the site,
        exported and saved notions may not always be compatible with future
        versions of the site. So please fill free to test the website as much as
        you like, but keep in mind, that the noting-system is not yet meant to
        be permanently.
      </p>
      <button
        @click="visited"
        class="uppercase bg-white text-black border border-black font-mono z-50 px-3 rounded-full hover:bg-violet hover:text-white hover:border-violet"
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
