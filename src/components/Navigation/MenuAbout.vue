<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGeneral } from "@/stores";

const route = useRoute();
const router = useRouter();
const store = useGeneral();
</script>

<template>
  <div class="fixed flex h-18 top-6 right-6 z-50 text-base duration-500">
    <!-- menu open/close -->

    <RouterLink
      v-if="route.name !== 'about'"
      @click="store.activeMenu = false"
      class="block p-2 px-6 bg-black border hover:border-black hover:bg-white hover:text-black text-white rounded-full"
      :to="'/about'"
    >
      Info</RouterLink
    >
    <button
      v-else
      @click="router.go(-1)"
      class="w-24 h-18 text-xl top-6 left-12 border border-black rounded-full"
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
