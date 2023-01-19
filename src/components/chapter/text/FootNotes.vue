<template>
  <div
    class="w-screen -translate-x-[50vw] -ml-20 p-36 pt-6 bg-white border-y border-black font-mono text-small"
  >
    <h2 id="footnotes">{{ content.title }}</h2>
    <ol class="pt-6 pr-3 pb-32 w-full bg-white">
      <li
        v-for="(note, index) in content.notes"
        :key="note.number"
        class="flex gap-12 pb-2 justify-start"
      >
        <p class="text-left w-16">{{ index + 1 }}</p>
        <p class="max-w-[780px]">{{ note.text }}</p>
      </li>
    </ol>
  </div>
</template>

<script setup>
defineProps({
  content: Object,
});

const scrollToSup = (index) => {
  document.getElementById("sup" + index).scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped></style>
