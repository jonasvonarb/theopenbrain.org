<template>
  <div>
    <div
      class="w-full absolute p-56 z-50 top-0 left-0 flex h-screen justify-center items-center content-center flex-wrap duration-500"
    >
      <video class="h-full max-w-[95%] lazy" autoplay muted controls loop>
        <source
          :src="'/assets/video/' + route.params.video + '.mp4'"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
    <button
      @click="router.go(-1)"
      class="absolute z-50 left-6 bottom-6 px-6 text-xl bg-white border border-black text-black hover:border-white hover:bg-light hover:text-white rounded-xl"
    >
      &#x2190;
    </button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<style scoped></style>
