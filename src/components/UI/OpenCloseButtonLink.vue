<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});
</script>

<template>
  <!-- menu links -->
  <div>
    <RouterLink
      class="w-full text-center"
      v-if="route.name !== target"
      :to="'/' + target"
      >{{ text }}</RouterLink
    >
    <div v-else @click="router.go(-1)">{{ text }}</div>
  </div>
</template>

<style scoped></style>
