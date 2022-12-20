<template>
  <div
    id="containerPunkt"
    class="w-20 absolute top-[-100vh] left-[50vw] z-30 pointer-events-none"
  >
    <Point v-for="element in compStorage" :id="element" :key="element" />
  </div>
</template>

<script setup>
import { useText } from "@/stores";
import { computed } from "vue";
import Point from "./PointComp.vue";

const compStorage = computed(() => {
  return useText().selectionIds;
});
</script>
<script>
export default {
  components: { Point },
  data() {
    return {
      storage: useText().selectionIds,
    };
  },
};
</script>

<style lang="scss" scoped></style>
