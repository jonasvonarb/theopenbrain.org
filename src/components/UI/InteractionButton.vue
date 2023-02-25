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
    <div class="eye flex justify-center w-6 h-6">
      <OpenEye v-if="text === 'open'" />
      <ClosedEye v-else class="" />
    </div>
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

.buttonEye:hover * {
  fill: var(--violet);
}
</style>
