<template>
  <div id="further-reading" class="py-12 h-[50vh]">
    <h4 class="font-bold">{{ content.title }}</h4>
    <p class="font">
      For additional details on retinal anatomy, physiology, connectivity and
      function, please visit the online vision textbook
      <a
        class="underline hover:blur-xs"
        href="https://webvision.med.utah.edu/"
        target="_blank"
        >Webvision</a
      >.
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  content: Object,
});
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
