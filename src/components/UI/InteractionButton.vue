<script setup>
import { useGeneral } from "@/stores";
import OpenEye from "@/icons/custom/OpenEye.vue";
import ClosedEye from "@/icons/custom/ClosedEye.vue";
const store = useGeneral();

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});
</script>

<template>
  <button class="buttonEye fill-white" @click="store.toggle('active' + target)">
    <OpenEye class="w-7 h-7 mt-1" v-if="text === 'open'" />
    <ClosedEye class="w-7 h-7" v-else />
  </button>
</template>

<style scoped>
:root {
  --violet: rgb(151, 71, 255);
}
.eye {
  fill: white;
}
.small {
  width: 2rem;
  height: 2rem;
}

.buttonEye:hover > svg {
  fill: var(--violet);
}
</style>
