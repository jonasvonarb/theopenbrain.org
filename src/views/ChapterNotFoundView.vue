<template>
  <div
    class="fixed h-screen w-1/2 p-20 right-1/4 about flex justify-center items-center text-center"
  >
    The Chapter "{{ chapterName }}" is currently in production and will be
    available soon! Hopfully ;)
  </div>
</template>

<script setup>
import { onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
const chapterName = ref("");

const route = useRoute();
chapterName.value =
  route.params.chapter.replaceAll("-", " ")[0].toUpperCase() +
  route.params.chapter.replaceAll("-", " ").substring(1);

onUpdated(() => {});
</script>

<style scoped></style>
