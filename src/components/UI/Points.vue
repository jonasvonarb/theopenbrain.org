<template>
  <div
    id="containerPunkt"
    class="w-20 absolute top-6 left-1/2 z-30 pointer-events-none"
  >
    <Point v-for="element in compStoreage" :key="element" :id="element" />
  </div>
</template>

<script setup>
import { useText } from "@/stores";
const textStore = useText();
const local = localStorage;
</script>
<script>
import { useText } from "@/stores";
import Point from "./Point.vue";
export default {
  data() {
    return {
      storage: useText().selectionIds,
    };
  },

  computed: {
    compStoreage() {
      return useText().selectionIds;
    },
  },

  components: { Point },
};
</script>

<style lang="scss" scoped></style>
