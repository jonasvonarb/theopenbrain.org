<template>
  <div class="relative flex justify-end items-end pb-1">
    <div
      v-if="helpIsActive"
      class="fixed w-[33vw] bottom-14 z-30 right-5 ml-5 mb-5 p-6 text-black border border-lighter text-medium bg-white cursor-pointer duration-300 pointer-events-none"
      :class="store.activeAbout ? 'right-1/2 ml-4' : 'right-24'"
    >
      This is the help text fo this chapter Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Nesciunt molestiae tempora quidem
      accusantium unde natus incidunt iure ullam dicta aliquam voluptates,
      aperiam eligendi reiciendis voluptatibus dignissimos distinctio, fuga nam
      hic!
    </div>
    <div
      @click="openAbout()"
      class="h-11 w-11 -m-0.5 text-center flex justify-center items-center text-medium text-white bg-black hover:blur-xs z-[49] cursor-pointer duration-300"
      :class="store.activeAbout ? 'left-1/2 ml-4' : 'left-24'"
      @mouseenter="helpIsActive = true"
      @mouseleave="helpIsActive = false"
    >
      ?
    </div>
  </div>
</template>

<script setup>
import { useGeneral } from "@/stores";
import { ref } from "vue";
const store = useGeneral();
const helpIsActive = ref(false);
</script>

<style scoped></style>
