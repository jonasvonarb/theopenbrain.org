<script setup>
import menu from "@/assets/menu/menu.json";
import OpenCloseButton from "@/components/UI/OpenCloseButton.vue";
import OpenCloseButtonLink from "@/components/UI/OpenCloseButtonLink.vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useGeneral } from "@/stores";
import { watch } from "vue";
const store = useGeneral();
const route = useRoute();
const router = useRouter();

const toStart = () => {
  console.log(store.prevRoute);
  // if (!store.prevRoute) {
  router.push({ path: "/chapter" });
  // } else {
  //   router.go(-1);
  // }
  store.startIsActive = true;
  setTimeout(() => {
    store.activeMenu = false;
  }, 0);
};

const closeMenu = () => {
  store.activeMenu = false;

  store.isScrolling = true;
  setTimeout(() => {
    store.isScrolling = false;
  }, 700);
};
</script>

<template>
  <div
    v-if="route.name && route.name != 'landing'"
    class="fixed overflow-y-scroll overflow-x-hidden bg-white scrollbar pointer-events-none top-0 left-0 z-[60] h-screen text-base duration-500 border-r border-black snap-x"
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
        class="pointer-events-auto list-decimal list-inside w-[35vw] text-xl text-black uppercase overflow-visible"
      >
        <div class="shrink-0 pt-12 pl-12">
          <h1 class="font-bold">The Open Brain</h1>
          <h2 class="py-4" @click="toStart()">Welcome to the openbrain.org</h2>
        </div>
        <template v-for="(chapter, index) in menu" :key="chapter">
          <RouterLink
            @click="toStart()"
            v-if="index === 'Part2' && store.isNextBack"
            class="w-full py-6 px-12 text-l cursor-pointer list-item"
            :class="
              index !== 'Part2'
                ? 'hover:bg-black/50 hover:text-white'
                : 'hover:bg-black hover:text-white'
            "
            to="/chapter/"
          >
            {{ menu[index].title }}
          </RouterLink>
          <div
            @click="toStart()"
            v-else-if="index === 'Part2'"
            class="w-full py-6 px-12 text-l cursor-pointer list-item"
            :class="
              index !== 'Part2'
                ? 'hover:bg-black/50 hover:text-white'
                : 'hover:bg-black hover:text-white'
            "
          >
            {{ menu[index].title }}
          </div>
          <li
            class="w-full shrink-0 py-6 px-12 text-l cursor-pointer"
            :class="
              index !== 'Part2'
                ? 'hover:bg-black/50 hover:text-white'
                : 'hover:bg-black hover:text-white'
            "
            v-else
          >
            {{ menu[index].title }}
          </li>
        </template>
      </ol>
    </Transition>
    <!-- menu open/close -->
    <OpenCloseButton
      v-if="store.activeMenu && route.name === 'home'"
      :text="'X'"
      :target="'Menu'"
      class="fixed pointer-events-auto z-[60] flex justify-center items-center right-[65vw] pr-5 top-2 duration-500 overflow-hidden"
    />
    <OpenCloseButtonLink
      :text="'+'"
      :target="''"
      class="fixed border-r pt-6 border-black bg-dark text-white pointer-events-auto z-[60] hover:bg-lightDark h-full w-8 flex justify-center items-top left-0 top-0 duration-500 overflow-hidden"
      :class="route.name && route.name === 'chapter' ? 'left-0' : '-left-8'"
    />
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
