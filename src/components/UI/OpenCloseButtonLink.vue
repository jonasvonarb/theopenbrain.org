<script setup>
import { useGeneral } from "@/stores";
const store = useGeneral();
const setMenu = () => {
  store.menuActive = true;

  console.log(store.menuActive);
};

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});
</script>

<template>
  <!-- menu links -->
  <div>
    <RouterLink :to="'/' + target">{{ text }}</RouterLink>
  </div>
</template>

<style scoped></style>
