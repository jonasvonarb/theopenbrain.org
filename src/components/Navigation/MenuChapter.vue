<script setup>
import menu from "@/assets/menu/menu.json";
import OpenCloseButton from "@/components/UI/OpenCloseButton.vue";
import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import { toSlug } from "@/helper/general.js";
const store = useGeneral();
const route = useRoute();

const toStart = () => {
  store.startIsActive = true;
  setTimeout(() => {
    store.activeMenu = false;
  }, 0);
};

const scrollToMenu = (menu) => {
  const link = document.querySelector("#" + menu);
  link.scrollIntoView({
    behavior: "smooth",
    alignToTop: "false",
    block: "start",
  });
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
    v-if="route.name"
    class="fixed h-screen overflow-y-scroll overflow-x-hidden bg-white scrollbar top-0 left-0 z-50 text-baseMono font-mono duration-500 border-r border-black snap-x"
    :class="[
      store.activeMenu
        ? route.name === 'chapter'
          ? 'w-[35vw] bg-white ml-8'
          : 'w-[0] bg-white'
        : 'w-0  bg-white',
    ]"
  >
    <!-- chapter structur -->
    <Transition name="menuTo">
      <ul
        v-if="route.name && store.activeMenu"
        class="bg-white/60 absolute top-0 mb-52 duration-500 shrink-1 pb-24"
      >
        <template v-for="(chapter, index) in menu">
          <li :key="chapter" v-if="index === 'Part2'" class="w-[35vw] shrink-0">
            <ol class="w-full list-decimal py-12 overflow-hidden duration-500">
              <div class="pb-6 pl-12 pr-24">
                <h3 class="-translate-x-0" @click="toStart()">
                  <span class="pl-8 pr-12">3</span>
                  <RouterLink to="/chapter/">
                    {{ menu[index].title }}
                  </RouterLink>
                </h3>
              </div>
              <div class="pb-6 pl-32 pr-12 border-t border-black font-medium">
                <div
                  class="flex pl-8"
                  @click="scrollToMenu('the-eye-and-retina-intro'), closeMenu()"
                >
                  <div class="w-full">Intro</div>
                </div>
              </div>
              <div
                class="pb-6 pl-32 pr-12 border-t border-black"
                v-for="(part, index2) in chapter.parts"
                :key="part.title"
              >
                <div
                  class="flex"
                  @click="scrollToMenu(toSlug(part.title)), closeMenu()"
                >
                  <li class="w-full pb-3 pl-8 hover:blur-xs font-medium">
                    <span
                      class=""
                      :class="
                        toSlug(part.title) === store.currentSubChapter
                          ? 'bg-lighter'
                          : ''
                      "
                      >{{ part.title }}</span
                    >
                  </li>
                </div>
                <ol>
                  <div
                    class="block pl-8 pb-3 hover:blur-xs"
                    @click="scrollToMenu(toSlug(subPart)), closeMenu()"
                    v-for="subPart in part.parts"
                    :key="subPart"
                  >
                    <li class="sub">{{ subPart }}</li>
                  </div>
                </ol>
              </div>
              <div class="pb-6 pl-32 pr-12 border-t border-black">
                <div
                  class="flex"
                  @click="scrollToMenu('footnotes'), closeMenu()"
                >
                  <div class="w-full pb-3 pl-8 hover:blur-xs font-medium">
                    <span
                      class=""
                      :class="
                        'Footnotes' === store.currentSubChapter
                          ? 'bg-light'
                          : ''
                      "
                      >Footnotes</span
                    >
                  </div>
                </div>
              </div>
            </ol>
          </li>
        </template>
        <OpenCloseButton
          v-if="store.activeMenu"
          :text="'close'"
          :target="'Menu'"
          class="absolute pointer-events-auto pt-2 pr-4 z-[60] flex justify-center items-center right-0 top-2 duration-500 overflow-hidden"
        />
      </ul>
    </Transition>
    <!-- menu open/close chapter -->
    <OpenCloseButton
      :text="'open'"
      :target="'Menu'"
      class="fixed border-r border-transparent bg-dark pt-2 text-white pointer-events-auto z-[60] hover:bg-lightDark h-full w-8 flex justify-center items-top left-0 top-0 duration-500 overflow-hidden"
      :class="
        !store.activeMenu && route.name === 'chapter' ? 'left-8' : '-left-8'
      "
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
