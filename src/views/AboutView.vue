<script setup>
import { useGeneral } from "@/stores";
const store = useGeneral();
</script>

<template>
  <div class="about">
    <h1>This is an about page {{ $version }}</h1>
    <br />
    <button @click="store.increment()">Click me to get one more!</button>
    <div>{{ store.count + ", " + store.doubleCount }}</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
