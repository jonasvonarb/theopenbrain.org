<template>
  <button
    class="px-6 py-2 bg-black text-white border-2 rounded-full hover:bg-white hover:text-black hover:border-black"
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
