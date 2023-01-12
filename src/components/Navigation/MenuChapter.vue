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
    class="fixed h-screen overflow-y-scroll overflow-x-hidden bg-white scrollbar top-0 left-0 z-50 text-base duration-500 border-r border-black snap-x"
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
            <ol class="w-full list-decimal p-12 overflow-hidden duration-500">
              <h2 class="pb-6" @click="toStart()">
                <RouterLink to="/chapter/">
                  {{ menu[index].title }}
                </RouterLink>
              </h2>
              <RouterLink
                class="flex pl-8"
                :to="{
                  name: 'chapter',
                  hash: '#the-eye-and-retina-intro',
                }"
                @click="closeMenu()"
              >
                <div
                  class="w-full py-4 border-b border-black hover:bg-gray-100"
                >
                  Intro
                </div>
              </RouterLink>
              <template
                v-for="(part, index2) in chapter.parts"
                :key="part.title"
              >
                <RouterLink
                  v-if="!part.title"
                  class="flex pl-8"
                  :to="{
                    name: 'chapter',
                    hash: '#' + toSlug(part),
                  }"
                  @click="closeMenu()"
                >
                  <li
                    v-if="!part?.parts"
                    class="w-full border-b py-4 border-black hover:bg-gray-100"
                  >
                    <span
                      :class="
                        toSlug(part) === store.currentSubChapter
                          ? 'text-light'
                          : ''
                      "
                      >{{ part }}</span
                    >
                  </li>
                </RouterLink>
                <div class="pl-8" v-else>
                  <RouterLink
                    :to="{
                      name: 'chapter',
                      hash: '#' + toSlug(part.title),
                    }"
                    @click="closeMenu()"
                  >
                    <li
                      class="w-full border-b py-4 border-black hover:bg-gray-100"
                    >
                      <span
                        :class="
                          toSlug(part.title) === store.currentSubChapter
                            ? 'text-light'
                            : ''
                        "
                        >{{ part.title }}</span
                      >
                    </li>
                  </RouterLink>
                  <ol class="list-">
                    <RouterLink
                      :to="{
                        name: 'chapter',
                        hash: '#' + toSlug(subPart),
                      }"
                      @click="closeMenu()"
                      class="block lining-nums pl-12 p-2 hover:bg-gray-100"
                      v-for="subPart in part.parts"
                      :key="subPart"
                    >
                      <li class="sub">{{ subPart }}</li>
                    </RouterLink>
                  </ol>
                </div>
              </template>
              <RouterLink
                class="flex pl-8"
                :to="{
                  name: 'chapter',
                  hash: '#footnotes',
                }"
                @click="closeMenu()"
              >
                <div
                  class="w-full py-4 border-b border-black hover:bg-gray-100"
                >
                  Footnotes
                </div>
              </RouterLink>
            </ol>
          </li>
        </template>
      </ul>
    </Transition>
    <!-- menu open/close chapter -->
    <OpenCloseButton
      :text="'+'"
      :target="'Menu'"
      class="fixed border-r border-black bg-dark pt-6 text-white pointer-events-auto z-[60] hover:bg-lightDark h-full w-8 flex justify-center items-top left-0 top-0 duration-500 overflow-hidden"
      :class="
        !store.activeMenu && route.name === 'chapter' ? 'left-8' : '-left-8'
      "
    />
    <OpenCloseButton
      v-if="store.activeMenu"
      :text="'X'"
      :target="'Menu'"
      class="fixed pointer-events-auto pt-6 z-[60] flex justify-center items-center right-[65vw] pr-5 top-2 duration-500 overflow-hidden"
    />
  </div>
</template>

<style scoped>
.listItem {
  display: block;
}
li.sub {
  list-style: lower-alpha;
  /* content: "– "; */
}

p {
  padding-bottom: 0;
}

.proper {
  transition-property: heigh width;
}
</style>
