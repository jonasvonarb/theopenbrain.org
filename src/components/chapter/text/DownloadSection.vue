<template>
  <div
    id="downloads"
    class="py-12 p-20 w-full border-t border-black bg-bgMedLi"
  >
    <TitleIllus title="Downloads" class="pb-6" />
    <div class="flex flex-col gap-4">
      <template v-for="(file, index) in files" :key="index">
        <a
          class="px-4 -mx-6 flex gap-4 hover:text-primaryLi"
          target="_blank"
          :href="file.link"
          :data-index="index"
          @mouseenter="setHover"
          @mouseleave="unSetHover"
        >
          <FileIcon v-if="file.type === 'file' && +hover !== +index" />
          <FilesIcon v-if="file.type === 'files' && +hover !== +index" />
          <FileIconHover v-if="file.type === 'file' && +hover === +index" />
          <FilesIconHover v-if="file.type === 'files' && +hover === +index" />
          {{ file.text }}
        </a>
      </template>
    </div>
  </div>
</template>

<script setup>
import FileIcon from "@/icons/custom/FileIcon.vue";
import FilesIcon from "@/icons/custom/FilesIcon.vue";
import FileIconHover from "@/icons/custom/FileIconHover.vue";
import FilesIconHover from "@/icons/custom/FilesIconHover.vue";
import { ref } from "vue";
import TitleIllus from "../../UI/TitleIllus.vue";

const hover = ref(undefined);

const setHover = (event) => {
  hover.value = event.srcElement.dataset.index;
};
const unSetHover = () => {
  hover.value = undefined;
};

const files = [
  {
    type: "files",
    link: "https://mcgill-my.sharepoint.com/:f:/g/personal/stuart_trenholm_mcgill_ca/EnG2B8tGLGFPiMO-HAO3NrUBIumc8gYjobEvJZn805l3Hw?e=WvmhBY",
    text: "Download text, images, animations and more here!",
  },
  {
    type: "files",
    link: "https://github.com/jonasvonarb/theopenbrain.org",
    text: "Repository on github with the code-base for this textbook!",
  },
];
</script>

<style scoped></style>
