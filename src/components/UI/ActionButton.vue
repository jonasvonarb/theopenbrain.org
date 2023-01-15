<template>
  <button
    class="px-6 py-1 text-baseMono bg-lighter text-dark font-mono hover:blur-xs"
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
