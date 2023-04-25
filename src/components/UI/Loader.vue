<template>
  <div
    class="fixed bg-white text-black w-screen h-screen z-[10000] bg-img invert"
  >
    <div
      class="absolute flex flex-col justify-start items-start p-12 uppercase"
    >
      <div
        class="sticky top-6 left-20 text-biggest flex items-center gap-4 z-50 pb-4"
      >
        <img
          loading="lazy"
          src="/favicon_io/android-chrome-512x512.png"
          class="h-20"
        />
        The Open Brain
      </div>
      <template v-for="amount in loading" :key="amount">
        <div class="pl-24">{{ loadingSteps[amount - 1] }}</div>
      </template>
    </div>
    <div
      class="absolute flex flex-col justify-center w-full h-full items-center p-12 uppercase"
    ></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
const loading = ref(0);

const loadingSteps = [
  "Loading Data, ",
  "Text, ",
  "Animations, ",
  "",
  "Images! ",
];

onMounted(() => {
  const load = setInterval(() => {
    loading.value = loading.value + 1;
    if (loading.value <= 4) return;
    clearInterval(load);
  }, 500);
});
</script>

<style scoped>
.bg-img {
  background-color: white;
  background-image: url("/publicAssets/images/animationEye.gif");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 13%;
}
</style>
