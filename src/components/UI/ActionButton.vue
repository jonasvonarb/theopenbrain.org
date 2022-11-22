<template>
  <button
    @click="this.$emit('action')"
    class="px-3 py-1 m-2 bg-black text-white border-2 rounded-full hover:bg-red-600"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { useText } from "@/stores";
const storeText = useText();
const emit = defineEmits(["action"]);
const props = defineProps({
  pos: String,
  text: String,
  clickF: Function,
});
</script>

<style lang="scss" scoped></style>
