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
  <button class="buttonEye" @click="store.toggle('active' + target)">
    <OpenEye class="eye" v-if="text === 'open'" />
    <ClosedEye class="eye small" v-else />
  </button>
</template>

<style scoped>
:root {
  --violet: rgb(151, 71, 255);
}
.eye {
  fill: #888;
  width: 2.5rem;
  height: 2.5rem;
}
.small {
  width: 2.2rem;
  height: 2.2rem;
}
.buttonEye:hover .eye {
  fill: var(--violet);
}
</style>
