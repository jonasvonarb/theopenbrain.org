<template>
  <div id="further-reading" class="py-12 p-20 w-full border-t border-black">
    <TitleIllus :title="content.title" class="pb-6" />

    <p class="font">
      For additional details on retinal anatomy, physiology, connectivity and
      function, please visit the online vision textbook
      <a
        class="underline hover:text-violet"
        href="https://webvision.med.utah.edu/"
        target="_blank"
        >Webvision</a
      >.
    </p>
  </div>
</template>
<script setup>
import TitleIllus from "../../UI/TitleIllus.vue";

defineProps({
  content: Object,
});
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
