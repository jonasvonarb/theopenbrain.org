<script setup>
import menu from "@/assets/json_backend/menu.json";
import InteractionButton from "@/components/UI/InteractionButton.vue";
import {  useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import Brain from "../../icons/custom/Brain.vue";
const store = useGeneral();
const route = useRoute();

const toStart = () => {
  store.startIsActive = true;
  setTimeout(() => {
    store.activeMenu = false;
  }, 0);
};
</script>

<template>
  <div
    v-if="route.name && route.name != 'landing'"
    class="fixed overflow-y-scroll overflow-x-hidden bg-white scrollbar pointer-events-none top-0 left-0 z-[60] h-screen text-base duration-300 border-r border-black snap-x"
    :class="[
      store.activeMenu
        ? route.name != 'home'
          ? 'w-[0]  overflow-hidden bg-white '
          : 'w-[35vw]  overflow-x-scroll overflow-y-hidden bg-white'
        : 'w-0  overflow-hidden bg-white',
    ]"
  >
    <!-- chapter structur -->
    <Transition name="menuTo" mode="out-in">
      <ol
        v-if="route.name == 'home' && store.activeMenu"
        class="no-select pl-left pt-24 pointer-events-auto list-decimal list-inside w-[35vw] text-xl text-black uppercase overflow-visible"
      >
        <div class="shrink-0 pb-6">
          <h1 class="font-semibold">The Open Brain</h1>
        </div>
        <template v-for="(chapter, index) in menu" :key="chapter">
          <RouterLink
            @click="toStart()"
            to="/chapter"
            v-if="index === 'Part2'"
            class="w-full py-6 text-l cursor-pointer list-item hover:blur-xs"
          >
            {{ menu[index].title }}
          </RouterLink>
          <li
            class="w-full shrink-0 py-6 text-l cursor-pointer hover:blur-xs opacity-50"
            v-else
          >
            {{ menu[index].title }}
          </li>
        </template>
        <InteractionButton
          v-if="store.activeMenu && route.name === 'home'"
          :text="'close'"
          :target="'Menu'"
          class="absolute pointer-events-auto pt-2 pr-4 z-[60] flex justify-center items-center right-0 top-2 duration-300 overflow-hidden"
        />
      </ol>
    </Transition>
    <!-- menu open/close -->

    <div>
      <RouterLink
        class="fixed pointer-events-none cursor-pointer stroke-white hover:stroke-primaryMed bg-bgDa pt-10 pb-4 z-[60] h-full w-10 flex justify-center items-start left-0 top-0 duration-300 overflow-hidden"
        :class="
          route.name && route.name === 'chapter' && !store.activeMenu
            ? 'left-0'
            : '-left-10'
        "
        v-if="route.name !== 'home'"
        :to="'/'"
      >
        <div class="w-6 h-6">
          <Brain class="w-full h-ull" />
        </div>
      </RouterLink>
    </div>
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
</style>
