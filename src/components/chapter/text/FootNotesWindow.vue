<template>
  <div
    :class="
      store.superScriptActive ? 'translate-y-0' : 'translate-y-[33.33333vh]'
    "
    class="fixed overflow-x-scroll z-40 bottom-0 w-full left-0 h-1/3 p-24 pt-6 bg-white border-t border-black duration-500"
  >
    <button @click="toggle()" class="fixed z-50 top-6 right-12 cursor-pointer">
      X
    </button>
    <ol class="pt-6 pr-16 pb-32 w-full bg-white">
      <li
        v-for="(note, index) in text['footNotes'].notes"
        :key="note.number"
        v-show="activeSup.includes((index + 1).toString())"
        class="flex gap-12 pb-2 justify-start"
      >
        <p class="text-right">{{ index + 1 }}</p>
        <p class="max-w-[780px]">{{ note.text }}</p>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useText, useGeneral } from "@/stores";
import { onMounted, ref, onBeforeUnmount } from "vue";
const textStore = useText();
const text = textStore.text;
const store = useGeneral();

const activeSup = ref([]);

const toggle = (event) => {
  if (!store.superScriptActive) {
    console.log(event.target.dataset.sup.split(" "));
    activeSup.value = event.target.dataset.sup.split(" ");
    store.superScriptActive = true;
  } else {
    activeSup.value = [];
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
