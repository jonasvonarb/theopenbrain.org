<script setup>
import menu from "/src/assets/menu/menu.json";
import OpenCloseButton from "@/components/UI/OpenCloseButton.vue";
import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import gsap from "gsap";
const store = useGeneral();
const route = useRoute();

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
    class="fixed bg-white flex top-0 left-0 z-40 h-screen text-base duration-700 border-r border-black snap-x"
    :class="
      store.activeMenu
        ? route.name != 'home'
          ? 'w-[35vw] text-black  overflow-y-scroll overflow-x-hidden'
          : 'w-screen text-black overflow-x-scroll overflow-y-hidden'
        : 'w-8 text-black overflow-x-scroll overflow-y-hidden'
    "
  >
    <!-- menu links -->
    <div class="fixed flex z-40 pl-8 ml-5">
      <RouterLink to="/home">Home</RouterLink>
    </div>
    <!-- chapter structur -->
    <ul
      class="flex absolute mt-20 mb-52 flex-row overflow-visible duration-700 shrink-1"
      :class="route.name != 'home' ? '-left-[70vw]' : '-left-[0]'"
    >
      <li
        v-for="(chapter, index) in menu"
        class="w-[35vw] snap-start shrink-0 h-full"
        :class="[route.name != 'home' ? '' : '']"
      >
        <ul
          :class="
            index == 'Part9' ? 'pointer-events-auto' : 'pointer-events-none'
          "
          class="pl-0 px-12 w-full h-full overflow-hidden text-black duration-700"
        >
          <h2 class="pl-8 ml-5">
            {{ menu[index].title }}
          </h2>
          <RouterLink
            class="flex"
            :to="{
              name: 'chapter',
              hash: '#the-eye-and-retina-intro',
            }"
          >
            <div class="w-8 px-3.5 mt-5 mr-5 bg-white">
              <div
                v-if="route.name == 'chapter'"
                class="h-full w-full bg-red-600"
              ></div>
            </div>
            <li class="w-full border-b pt-4 border-black hover:bg-gray-100">
              0 Intro
            </li>
          </RouterLink>
          <RouterLink
            v-for="(part, index2) in chapter.parts"
            @click="closeMenu()"
            class="flex"
            :to="{
              name: 'chapter',
              hash: '#the-eye-and-retina-' + (index2 + 1),
            }"
          >
            <div class="w-8 px-3.5 mr-5 bg-white">
              <div
                v-if="route.name == 'chapter'"
                class="h-full w-full"
                :style="
                  store.currentSubChapter ==
                  'the-eye-and-retina-' + (index2 + 1)
                    ? 'height: ' + 100 * store.progress + '%'
                    : ''
                "
                :class="
                  index2 + 1 <= /[^-]*$/.exec(store.currentSubChapter)[0]
                    ? 'bg-red-600'
                    : 'bg-white'
                "
              ></div>
            </div>
            <li class="w-full border-b pt-4 border-black hover:bg-gray-100">
              {{ index2 + 1 + " " + part }}
            </li>
          </RouterLink>
        </ul>
      </li>
    </ul>

    <!-- menu open/close -->
    <OpenCloseButton
      :text="'+'"
      :target="'Menu'"
      class="fixed hover:bg-red-600 h-full w-8 flex justify-center items-top left-0 top-0 duration-700 overflow-hidden"
      :class="!store.activeMenu ? '-left-[0]' : '-left-8'"
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
