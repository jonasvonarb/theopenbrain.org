<template>
  <div
    :class="store.superScriptActive ? 'translate-y-0' : 'translate-y-[25vh]'"
    class="fixed z-40 left-0 w-screen bottom-0 h-1/4 p-32 bg-white border-t border-black duration-500"
  >
    <button @click="toggle()" class="absolute top-12 right-12">X</button>
    <ol v-for="(note, index) in text['footNotes'].notes" :key="note.number">
      <li v-show="activeSup === index">{{ index + 1 }} {{ note.text }}</li>
    </ol>
  </div>
</template>

<script setup>
import { useText, useGeneral } from "@/stores";
import { onMounted, watch, ref, onBeforeUnmount } from "vue";
const textStore = useText();
const text = textStore.text;
const store = useGeneral();

const activeSup = ref(null);

const toggle = (event) => {
  if (!store.superScriptActive) {
    activeSup.value = +event.target.innerText - 1;
    store.superScriptActive = true;
  } else {
    activeSup.value = null;
    store.superScriptActive = false;
  }
};

onMounted(() => {
  let sups = document.getElementsByTagName("SUP");
  for (let sup of sups) {
    sup.addEventListener("click", (event) => toggle(event));
  }
});
onBeforeUnmount(() => {
  let sups = document.getElementsByTagName("SUP");
  for (let sup of sups) {
    sup.removeEventListener("click", toggle);
  }
});
</script>

<style scoped></style>
