<template>
  <div class="relative">
    <div
      v-if="helpIsActive"
      class="fixed w-[33vw] bottom-14 z-30 right-5 ml-5 mb-5 p-6 text-black border border-black text-medium bg-white cursor-pointer duration-300 pointer-events-none"
    >
      <span v-html="help" />
    </div>
    <button
      class="uppercase text-medium bg-white text-black border border-black font-mono z-50 px-3 rounded-full hover:bg-primaryMed hover:text-black hover:border-primaryMed"
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
