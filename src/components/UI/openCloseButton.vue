<script setup>
import { useGeneral } from "@/stores";
import TeenyiconsEyeClosedOutline from "../../icons/TeenyiconsEyeClosedOutline.vue";
import TeenyiconsEyeOutline from "../../icons/TeenyiconsEyeOutline.vue";
const store = useGeneral();

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});
</script>

<template>
  <button class="" @click="store.toggle('active' + target)">
    <TeenyiconsEyeOutline class="w-6 h-6" v-if="text === 'open'" />
    <TeenyiconsEyeClosedOutline class="w-6 h-6" v-else />
  </button>
</template>

<style scoped></style>
