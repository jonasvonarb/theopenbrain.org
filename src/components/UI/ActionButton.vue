<template>
  <button
    class="px-6 py-1 bg-white text-black border border-black rounded-xl hover:bg-light hover:text-white hover:border-black"
    @click="$emit('action')"
  >
    {{ text }}
  </button>
</template>

<script setup>
const emit = defineEmits(["action"]);
const props = defineProps({
  pos: { type: String, default: "" },
  text: { type: String, default: "" },
  clickF: { type: Function, default: () => {} },
});
</script>

<style lang="scss" scoped></style>
