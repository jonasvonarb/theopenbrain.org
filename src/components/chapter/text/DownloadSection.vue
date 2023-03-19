<template>
  <div id="downloads" class="py-12 p-20 w-full border-t border-black">
    <TitleIllus title="Downloads" class="pb-6" />
    <div class="flex flex-col gap-4">
      <template v-for="(file, index) in files" :key="index">
        <a
          class="px-4 -mx-6 flex gap-4 hover:text-violet"
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
    type: "file",
    link: "https://www.dropbox.com/s/nlqeqruub90msr7/pexels-sunsetoned-7235791.mp4?dl=1",
    text: "Text",
  },
  {
    type: "files",
    link: "https://www.dropbox.com/scl/fo/kmeyrslmcqfk3ko2vgo8h/h?dl=1&rlkey=38ckgbdt1kz2k8j3x717ox2ul",
    text: "Animations",
  },
  {
    type: "files",
    link: "https://www.dropbox.com/s/wzggtpip0tyjh0i/lamb-120739.mp4?dl=1",
    text: "Images",
  },
  {
    type: "files",
    link: "https://www.dropbox.com/s/nlqeqruub90msr7/pexels-sunsetoned-7235791.mp4?dl=1",
    text: "Entire chapter",
  },
];
</script>

<style scoped></style>
