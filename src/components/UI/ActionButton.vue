<template>
  <div class="relative">
    <div
      v-if="helpIsActive"
      class="fixed w-[33vw] bottom-14 z-30 right-5 ml-5 mb-5 p-6 text-black border border-lighter text-medium bg-white cursor-pointer duration-300 pointer-events-none"
    >
      <span v-html="help" />
    </div>
    <button
      class="px-2 uppercase py-0 text-medium bg-lighter text-black border border-white font-mono hover:blur-xs z-50"
      @click="$emit('action')"
      @mouseenter="helpIsActive = true"
      @mouseleave="helpIsActive = false"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineEmits(["action"]);
defineProps({
  pos: { type: String, default: "" },
  text: { type: String, default: "" },
  help: { type: String, default: "" },
  clickF: { type: Function, default: () => {} },
});
const helpIsActive = ref(false);
</script>

<style lang="scss" scoped></style>
