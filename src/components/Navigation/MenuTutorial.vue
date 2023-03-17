<template>
  <div class="relative flex justify-end items-end pb-1">
    <div
      v-if="helpIsActive"
      class="fixed w-[33vw] bottom-14 z-30 right-5 ml-5 mb-5 p-6 text-black border border-lighter text-medium bg-white cursor-pointer duration-300 pointer-events-none"
      :class="store.activeAbout ? 'right-1/2 ml-4' : 'right-24'"
    >
      This current chapter, while completely functional, is only a prototype,
      and many things may change over time. As a prototype, the site is also not
      accessible on small screens. For the best user experience at this stage,
      we invite you to visit our site using a Chrome browser and to set your
      browser screen size width to a minimum of 1320px.
      <br />
      <br />
      If you select a Text in the body of the chapter, you will be able to add a
      note to the selection you just did. For that, just click the N-Icon on the
      center-line of the page. To use the Notes on another computer or in an
      other browser, you can export and import those notes with the following
      buttons. Do not make notes, that you would like to keep yet, because the
      mechanics could still change in the future.
      <br />
      <br />
      At the moment you can't select text with a superscript or a paragraph
      break in it.
    </div>
    <FIcon
      @click="openAbout()"
      class="-m-0.5 z-[49] icon iconInvert duration-300"
      :class="store.activeAbout ? 'left-1/2 ml-4' : 'left-left'"
      @mouseenter="helpIsActive = true"
      @mouseleave="helpIsActive = false"
    />
  </div>
</template>

<script setup>
import { useGeneral } from "@/stores";
import { ref } from "vue";
import FIcon from "@/icons/custom/FIcon.vue";
const store = useGeneral();
const helpIsActive = ref(false);
</script>

<style scoped></style>
