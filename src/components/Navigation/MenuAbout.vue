<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGeneral } from "@/stores";

const route = useRoute();
const router = useRouter();
const store = useGeneral();
</script>

<template>
  <div
    class="fixed flex h-18 bottom-4 z-[60] text-base duration-500"
    :class="
      route.name === 'about'
        ? 'left-6'
        : route.name === 'home'
        ? store.activeMenu
          ? 'left-6'
          : 'left-6'
        : 'left-20'
    "
  >
    <!-- menu open/close -->
    <RouterLink
      v-if="route.name === 'home'"
      @click="store.activeMenu = false"
      class="block p-1 px-6 bg-white border border-black text-black hover:border-white hover:bg-light hover:text-white rounded-xl"
      :to="'/about'"
    >
      About</RouterLink
    >
    <button
      v-else-if="route.name === 'about'"
      @click="router.go(-1)"
      class="px-6 text-xl bg-white border border-black text-black hover:border-white hover:bg-light hover:text-white rounded-xl"
    >
      &#x2190;
    </button>
  </div>
</template>

<style scoped>
.listItem {
  display: block;
}
p {
  padding-bottom: 0;
}

.proper {
  transition-property: heigh width;
}
.widthAbout {
  width: calc(100vw - 2 * 1.9rem);
}
</style>
