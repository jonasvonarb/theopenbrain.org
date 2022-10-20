<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/navigation/Header.vue";
</script>

<template>
  <div>
    <Header v-if="$route.name != 'landing'" class="bg" />
    <RouterView class="w-full mt-body z-0" />
  </div>
</template>

<style scoped></style>
