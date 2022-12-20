<script setup>
import { useGeneral } from "@/stores";
const store = useGeneral();

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});

</script>

<template>
  <button @click="store.toggle('active' + target)">
    {{ text }}
  </button>
</template>

<script>
export default {};
</script>

<style scoped></style>
