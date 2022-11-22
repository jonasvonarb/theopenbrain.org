<script setup>
import { RouterView } from "vue-router";
import Menu from "./components/navigation/Menu.vue";
import { useGeneral } from "@/stores";

import { Transition } from "vue";

const store = useGeneral();
</script>

<template>
  <div class="text-base">
    <RouterView class="w-full mt-body z-0" v-slot="{ Component }">
      <!-- <Transition name="fade"> -->
      <component :is="Component" />
      <!-- </Transition> -->
    </RouterView>
    <Menu />
  </div>
</template>

<style scoped></style>
