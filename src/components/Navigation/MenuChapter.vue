<script setup>
import menu from "@/assets/json_backend/menu.json";
import InteractionButton from "@/components/UI/InteractionButton.vue";
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
    class="fixed h-screen font-light overflow-y-scroll overflow-x-hidden border-violet/90 bg-dark text-white scrollbar top-0 left-0 z-50 text-baseMono font-mono duration-300 border-r-2 snap-x"
    :class="[
      store.activeMenu
        ? route.name === 'chapter'
          ? 'w-[50vw]'
          : 'w-[0vw]'
        : 'w-0 ',
    ]"
  >
    <!-- chapter structur -->
    <Transition name="menuTo">
      <ul
        v-if="route.name"
        class="mb-52 duration-300 shrink-1 pb-24 h-full overflow-scroll z-30 absolute"
      >
        <template v-for="(chapter, index) in menu">
          <li
            :key="chapter"
            v-if="index === 'Part2'"
            class="w-[50vw] shrink-0 cursor-pointer"
          >
            <ol class="w-full list-decimal py-12 overflow-hidden duration-300">
              <div class="pb-6 pl-44 pr-24">
                <h3 class="-translate-x-0" @click="toStart()">
                  <RouterLink to="/chapter/">
                    {{ menu[index].title }}
                  </RouterLink>
                </h3>
              </div>
              <div
                class="py-4 pl-36 pr-12 border-t border-light/70 font-medium"
                :class="
                  'intro' === store.currentSubChapter
                    ? 'text-white pointer-events-none bg-violet'
                    : ''
                "
              >
                <div
                  class="flex pl-8 border-light/70 hover:text-violet"
                  @click="scrollToMenu('the-eye-and-retina-intro'), closeMenu()"
                >
                  <div class="w-full max-w-[850px]">Intro</div>
                </div>
              </div>
              <template v-for="part in chapter.parts" :key="part.title">
                <div
                  class="flex py-4 pl-36 pr-12 border-t border-light/70 hover:text-violet"
                  @click="scrollToMenu(toSlug(part.title)), closeMenu()"
                  :class="
                    toSlug(part.title) === store.currentSubChapter
                      ? 'text-white pointer-events-none bg-violet'
                      : ''
                  "
                >
                  <li class="w-full max-w-[850px] pl-8 font-medium">
                    {{ part.title }}
                  </li>
                </div>
                <ol>
                  <div
                    class="block pl-44 pb-3 pt-3 hover:text-violet"
                    :class="
                      toSlug(part.title) === store.currentSubChapter
                        ? 'bg-violet/50'
                        : ''
                    "
                    @click="scrollToMenu(toSlug(subPart)), closeMenu()"
                    v-for="subPart in part.parts"
                    :key="subPart"
                  >
                    <li class="sub max-w-[850px]">{{ subPart }}</li>
                  </div>
                </ol>
              </template>
              <div
                class="flex py-4 pl-36 pr-12 border-t border-light/70 hover:text-violet"
                @click="scrollToMenu('footnotes'), closeMenu()"
                :class="
                  'Footnotes' === store.currentSubChapter
                    ? 'text-white pointer-events-none bg-violet'
                    : ''
                "
              >
                <li class="w-full max-w-[850px] pl-8 font-medium">Footnotes</li>
              </div>
            </ol>
          </li>
        </template>
      </ul>
    </Transition>

    <InteractionButton
      v-if="store.activeMenu"
      :text="'close'"
      :target="'Menu'"
      class="absolute bg-darker pt-10 pb-4 pointer-events-auto z-[60] h-full w-12 flex justify-center items-start top-0 right-0 duration-300 overflow-hidden"
    />
    <!-- menu open/close chapter -->
    <InteractionButton
      :text="'open'"
      :target="'Menu'"
      class="fixed bg-darker pt-10 pb-4 pointer-events-auto z-[60] h-full w-12 flex justify-center items-start top-0 duration-300 overflow-hidden"
      :class="
        !store.activeMenu && route.name === 'chapter'
          ? 'left-0 opacity-100 '
          : '-left-10 opacity-0'
      "
    />
    <div
      @click="store.activeMenu = false"
      class="fixed left-0 top-0 backdrop-blur-md h-screen w-screen duration-300"
      :class="[
        store.activeMenu
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      ]"
    ></div>
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
