<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/navigation/Header.vue";
import Menu from "./components/navigation/Menu.vue";
</script>

<template>
  <div class="text-base">
    <Menu />
    <!-- <Header v-if="$route.name != 'landing'" class="bg" /> -->
    <RouterView class="w-full mt-body z-0" />
  </div>
</template>

<style scoped></style>
