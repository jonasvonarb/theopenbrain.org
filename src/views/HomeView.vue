<script setup>
import Brain from "../components/home/Brain.vue";
import Menu from "../components/navigation/Menu.vue";
</script>

<template>
  <main class="font-mono text-white bg-black">
    <!-- <Menu :place="$route.name == 'home' ? 'home' : 'chapter'" /> -->
    <!-- <Brain /> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      database: null,
    };
  },
  mounted() {
  },
  methods: {},
};
</script>

<style scoped></style>
