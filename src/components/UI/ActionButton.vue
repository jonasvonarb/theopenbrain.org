<template>
  <button
    @click="storeText.clearTextMarking()"
    :class="pos == 'center' ? 'left-[45vw]' : 'right-2'"
    class="fixed z-50 bottom-2 px-3 py-1 float-right m-2 bg-black text-white border-2 rounded-full hover:bg-red-600"
  >
    Clear
  </button>
  <!-- <button
    @click="storeText.saveLocalstorage()"
    :class="pos == 'center' ? 'left-[45vw]' : 'right-2'"
    class="fixed z-50 px-3 py-1 float-right m-2 bg-black text-white border-2 rounded-full hover:bg-red-600"
  >
    Copy
  </button> -->
</template>

<script setup>
import { useText } from "@/stores";
const storeText = useText();
const props = defineProps({
  pos: String,
});
</script>

<style lang="scss" scoped></style>
