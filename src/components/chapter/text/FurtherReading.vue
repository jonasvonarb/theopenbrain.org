<template>
  <div id="further-reading" class="py-12 h-[50vh]">
    <h2 class="py-6">{{ content.title }}</h2>
    <p class="font">
      For additional details on retinal anatomy, physiology, connectivity and
      function, please visit the online vision textbook
      <a
        class="font-bold"
        href="https://webvision.med.utah.edu/"
        target="_blank"
        >Webvision</a
      >
    </p>
    <!-- <div v-for="paragraph in content.paragraphs" :key="paragraph">
      <h3 class="pb-2">{{ paragraph.title }}</h3>
      <a
        v-for="link in paragraph.links"
        :key="link"
        class="underline"
        :href="link.url"
        target="_blank"
        >{{ link.text }}</a
      >
    </div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});
</script>

<style scoped>
.font {
  font-family: "IBM Plex Sans";
}
a:hover {
  text-decoration: underline;
}
</style>
