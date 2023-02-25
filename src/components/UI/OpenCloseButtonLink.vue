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
      class="w-full h-full text-center"
      v-if="route.name !== target"
      :to="'/' + target"
    >
      o1
    </RouterLink>
    <div v-else @click="router.go(-1)">o2</div>
  </div>
</template>

<style scoped></style>
