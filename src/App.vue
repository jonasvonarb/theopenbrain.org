<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/navigation/Header.vue";
import Menu from "./components/navigation/Menu.vue";
</script>

<template>
  <div class="text-base">
    <RouterView class="w-full mt-body z-0" />
    <Menu />
  </div>
</template>

<style scoped></style>
