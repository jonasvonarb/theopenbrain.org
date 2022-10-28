<template>
  <div
    id="containerPunkt"
    class="w-[55vw] h-full absolute top-6 right-0 pr-24 z-30 pointer-events-none"
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
