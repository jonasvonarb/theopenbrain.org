<template>
  <div
    id="containerPunkt"
    class="w-20 absolute top-6 left-1/2 z-30 pointer-events-none"
  >
    <Point v-for="element in compStorage" :key="element" :id="element" />
  </div>
</template>

<script setup>
import { useText } from "@/stores";
import { computed } from "vue";
import Point from "./Point.vue";
const textStore = useText();
const local = localStorage;

const compStorage = computed(() => {
  return useText().selectionIds;
});
</script>
<script>
export default {
  data() {
    return {
      storage: useText().selectionIds,
    };
  },

  components: { Point },
};
</script>

<style lang="scss" scoped></style>
