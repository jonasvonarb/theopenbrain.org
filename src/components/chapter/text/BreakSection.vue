<script setup>
const props = defineProps({
  content: Object,
});
</script>

<template>
  <div
    ref="trigger"
    class="w-screen h-[180vh] -translate-x-1/2 -ml-32 text-white my-[50vh]"
  >
    <div class="sticky flex top-0 h-screen w-full p-32">
      <div
        class="border w-full text-violet-500 p-16 bg-white border-violet-500"
      >
        <template v-if="content.title === 'Blind-spot'">
          {{ content.title }}
          <ol class="list-decimal list-inside">
            <li v-for="step in content.steps">{{ step }}</li>
          </ol>
          <div
            class="absolute top-0 left-0 p-56 flex justify-around items-center w-full h-full"
          >
            <img class="w-32 h-32" src="/assets/icons/BlindSpotCross.svg" />
            <img class="w-32 h-32" src="/assets/icons/BlindSpotDot.svg" />
          </div>
        </template>
        <template v-else>
          {{ content.title }}
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.z-60 {
  z-index: 60;
}
</style>
