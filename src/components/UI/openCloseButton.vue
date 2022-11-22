<script setup>
import { useGeneral } from "@/stores";
import { storeToRefs } from "pinia";
const store = useGeneral();

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});
</script>

<template>
  <button @click="store.toggle('active' + props.target)">
    {{ text }}
    <!-- <template v-if="store['active' + target]">Close</template>
    <template v-else>M</template> -->
  </button>
</template>

<script>
export default {};
</script>

<style scoped></style>
