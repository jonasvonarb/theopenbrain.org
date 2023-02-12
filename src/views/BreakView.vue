<template>
  <div>
    <div
      class="w-full absolute p-56 z-50 top-0 left-0 gap-4 flex h-screen justify-center items-start duration-300 object-fitt"
    >
      <div class="m-0 w-video h-full object-contain">
        <video class="lazy h-full w-full bg-black object-contain" autoplay muted controls loop>
          <source
            :src="
              '/publicAssets/video/9-1-diseases/' + route.params.video + '.mp4'
            "
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div class="text-left font-mono text-small pt-3 pb-24">
          <p class="font-semibold">{{ info.title }}</p>
          <p>{{ info.text }}</p>
        </div>
      </div>
      <button @click="router.go(-1)">
        <PlusIcon class="icon rotate-45" />
      </button>
    </div>
  </div>
</template>

<script setup>
import PlusIcon from "../icons/custom/PlusIcon.vue";
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
