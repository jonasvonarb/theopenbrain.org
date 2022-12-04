<script setup>
import { RouterView } from "vue-router";
import Menu from "./components/navigation/Menu.vue";
import { useGeneral } from "@/stores";

import { Transition } from "vue";

const store = useGeneral();
</script>

<template>
  <div class="text-base">
    <RouterView class="w-full z-0" v-slot="{ Component }">
      <transition name="routeT">
        <component :is="Component" />
      </transition>
    </RouterView>
    <Menu />
  </div>
</template>

<style scoped>
.noPointer {
  pointer-events: none !important;
}

.routeT-leave-active,
.routeT-enter-active {
  /* transition: opacity -webkit-filter 4s; */
  transition: opacity 0.5s;
}

.routeT-enter-active {
  transition-delay: 0.5s;
}

.routeT-enter-from,
.routeT-leave-to {
  opacity: 0;
  filter: blur(10px);
}
</style>
