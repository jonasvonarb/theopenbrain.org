<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/navigation/Header.vue";
</script>

<template>
  <div>
    <Header v-if="$route.name != 'landing'"  class="bg"/>
    <RouterView class="fixed h-body w-full mt-body" />
  </div>
</template>

<style scoped></style>
