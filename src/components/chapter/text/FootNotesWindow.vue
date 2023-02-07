<template>
  <div
    :class="store.superScriptActive ? 'translate-y-0' : 'translate-y-[100vh]'"
    class="fixed max-h-[95vh] z-40 bottom-0 w-full left-0 p-24 pb-16 pt-10 bg-white border-t border-black duration-300 font-mono text-medium"
  >
    <button
      @click="toggle()"
      class="fixed z-50 -top-5 right-1/2 -mr-5 cursor-pointer rotate-45"
    >
      <PlusIcon class="icon cursor-pointer" />
    </button>
    <ol class="pr-16 w-full bg-white overflow-x-scroll h-full">
      <li
        v-for="(note, index) in text['footNotes'].notes"
        :key="note.number"
        v-show="activeSup.includes((index + 1).toString())"
        class="flex gap-4 pb-4 justify-start"
      >
        <p class="w-16 text-left">{{ index + 1 }}</p>
        <p class="max-w-[780px]">{{ note.text }}</p>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useText, useGeneral } from "@/stores";
import { onMounted, watch, ref, onBeforeUnmount } from "vue";
import PlusIcon from "@/icons/custom/PlusIcon.vue";
const textStore = useText();
const text = textStore.text;
const store = useGeneral();

const activeSup = ref([]);

const toggle = (event) => {
  if (!store.superScriptActive) {
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
