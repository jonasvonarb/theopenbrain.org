<template>
  <div>
    <div
      class="w-full absolute p-56 z-50 top-0 left-0 gap-4 flex h-screen justify-center items-start duration-300"
    >
      <div class="w-video h-full w-full m-0 object-fill">
        <video class="lazy object-fill" autoplay muted controls loop>
          <source
            :src="'/assets/video/' + route.params.video + '.mp4'"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div class="text-left font-mono text-small pt-3 pb-24">
          <p class="font-semibold">{{ info.title }}</p>
          <p>{{ info.text }}</p>
        </div>
      </div>
      <button
        @click="router.go(-1)"
        class="rotate-45 w-6 h-6 hover:blur-xs hover:opacity-70 cursor-pointer"
      >
        <BiPlusCircleFill />
      </button>
    </div>
  </div>
</template>

<script setup>
import BiPlusCircleFill from "../icons/BiPlusCircleFill.vue";
import { useRoute, useRouter } from "vue-router";
import infos from "@/assets/json_backend/breakVideos.json";
const route = useRoute();
const router = useRouter();
const info = infos.videos.find((x) => x.video === route.params.video);
</script>

<style scoped>
.w-video {
  width: calc(100% - 6rem);
}
</style>
