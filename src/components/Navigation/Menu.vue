<script setup>
import menu from "/src/assets/menu/menu.json";
import OpenCloseButton from "@/components/UI/OpenCloseButton.vue";
import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
const store = useGeneral();
const route = useRoute();

const closeMenu = () => {
  console.log("test");
  store.activeMenu = false;
};
</script>

<template>
  <div
    v-if="route.name && route.name != 'landing'"
    class="fixed flex w-screen overflow-x-scroll overflow-y-hidden top-0 left-0 z-40 h-screen text-base duration-700 border-r border-black"
    :class="
      store.activeMenu
        ? route.name != 'home'
          ? 'w-[35vw] bg-gray-300 text-black  overflow-y-scroll overflow-x-hidden'
          : 'w-screen bg-white/20 px-10 text-black overflow-x-scroll overflow-y-hidden'
        : 'w-[20px] bg-gray-300 text-black  justify-center'
    "
  >
    <!-- menu links -->
    <div v-if="store.activeMenu" class="fixed flex gap-5 px-12 pt-2 z-40">
      <RouterLink to="/home">Home</RouterLink>
    </div>
    <!-- chapter structur -->
    <transition name="fade">
      <ul
        v-show="store.activeMenu"
        class="flex relative mt-20 mb-52 flex-row overflow-visible duration-700 shrink-1"
        :class="
          route.name != 'home' ? '-translate-x-[70vw]' : '-translate-x-[0]'
        "
      >
        <li
          v-for="(chapter, index) in menu"
          class="w-[35vw] shrink-0 h-full"
          :class="[route.name != 'home' ? '' : 'border-l-2 border-black']"
        >
          <ul
            :class="index == 'Part9' ? 'pointer-events-auto': 'pointer-events-none'"
            class="pl-6 px-12 w-full h-full overflow-hidden text-black duration-700"
          >
            <h2 class="pb-5">
              {{ menu[index].title }}
            </h2>
            <RouterLink
              :to="{
                name: 'chapter',
                hash: '#the-eye-and-retina-' + (i + 1),
              }"
            >
              <li class="border-b pt-4 border-black hover:bg-gray-100">
                Intro
              </li>
            </RouterLink>
            <RouterLink
              v-for="(part, i) in chapter.parts"
              @click="closeMenu()"
              :to="{
                name: 'chapter',
                hash: '#the-eye-and-retina-' + (i + 1),
              }"
            >
              <li class="border-b pt-4 border-black hover:bg-gray-100">
                {{ i + 1 + " " + part }}
              </li>
            </RouterLink>
          </ul>
        </li>
      </ul>
    </transition>
    <!-- menu open/close -->
    <OpenCloseButton
      :text="'+'"
      :target="'Menu'"
      class="fixed hover:bg-red-600 h-full w-[20px] flex justify-center items-top left-0 top-0 duration-700 overflow-hidden"
      :class="!store.activeMenu ? '-left-[0]' : '-left-[20px]'"
    />
    <OpenCloseButton
      v-if="route.name != 'home' && store.activeMenu"
      :text="'-'"
      :target="'Menu'"
      class="fixed flex justify-center items-center right-[65vw] pr-5 top-2 duration-700 overflow-hidden"
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
</style>
