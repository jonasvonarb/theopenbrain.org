<script setup>
const props = defineProps({
  content: Object,
});
</script>

<template>
  <div
    ref="trigger"
    class="w-screen h-[180vh] -translate-x-1/2 -ml-40 text-white my-[10vh] text-small"
  >
    <div class="sticky flex top-0 h-screen w-full pl-52 py-32">
      <div class="border w-full text-black p-6 bg-white border-dark">
        <div
          class="max-w-[800px] flex flex-col justify-between h-full"
          v-if="content.title === 'Blind-spot'"
        >
          <p v-html="content.text"></p>

          <ol class="list-decimal list-inside">
            <li
              v-for="step in content.steps"
              class="pb-6 last:pb-0"
              :key="step"
            >
              {{ step }}
            </li>
          </ol>
          <div
            class="absolute top-0 left-0 p-56 flex justify-around items-center w-full h-full pointer-events-none"
          >
            <img class="w-32 h-32" src="/assets/icons/BlindSpotCross.svg" />
            <img class="w-32 h-32" src="/assets/icons/BlindSpotDot.svg" />
          </div>
        </div>
        <template
          v-else-if="content.title === 'Pathway for the pupillary light reflex'"
        >
          {{ content.title }}

          <div
            class="w-full absolute p-56 z-50 top-0 left-0 flex h-full justify-center items-center content-center flex-wrap duration-500"
          >
            <img
              class="h-full max-w-[95%] lazy"
              src="/assets/images/pupillary_Light_Reflex.jpg"
            />
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
