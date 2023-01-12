<template>
  <div
    class="w-screen -translate-x-[50vw] -ml-28 p-24 pt-6 bg-white border-y border-black"
  >
    <h2 id="footnotes">{{ content.title }}</h2>
    <ol class="pt-6 pr-16 pb-32 w-full bg-white">
      <li
        v-for="(note, index) in content.notes"
        :key="note.number"
        class="pb-4 !text-small cursor-pointer max-w-[800px]"
        @click="scrollToSup(index + 1)"
      >
        {{ index + 1 }} {{ note.text }}
      </li>
    </ol>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});

const scrollToSup = (index) => {
  document.getElementById("sup" + index).scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped></style>
