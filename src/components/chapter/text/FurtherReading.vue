<template>
  <div
    id="further-reading"
    class="py-12 p-20 w-full border-t border-black bg-bgMedLi"
  >
    <TitleIllus :title="'Further reading'" class="pb-6" />
    <p class="font">
      For additional details on retinal anatomy, physiology, connectivity and
      function, please visit the online vision textbook
      <a
        class="underline hover:text-primaryLi"
        href="https://webvision.med.utah.edu/"
        target="_blank"
        >Webvision</a
      >.
    </p>
  </div>
</template>
<script setup>
import TitleIllus from "../../UI/TitleIllus.vue";
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
