<script setup>
import menu from "/src/assets/menu/menu.json";
import OpenCloseButton from "@/components/UI/OpenCloseButton.vue";
import OpenCloseButtonLink from "@/components/UI/OpenCloseButtonLink.vue";
import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import { toSlug } from "@/helper/general.js";
const store = useGeneral();
const route = useRoute();

const toStart = () => {
  store.startIsActive = true;
};

const closeMenu = () => {
  store.activeMenu = false;

  store.isScrolling = true;
  setTimeout(() => {
    store.isScrolling = false;
    console.log("finished scrollling");
  }, 700);
};
</script>

<template>
  <div
    v-if="route.name && route.name != 'landing'"
    class="fixed scrollbar pointer-events-none flex top-0 left-0 z-50 h-screen text-base duration-700 border-r border-black snap-x proper"
    :class="[
      store.activeMenu
        ? route.name != 'home'
          ? 'w-[35vw]  overflow-y-scroll overflow-x-hidden bg-white'
          : 'w-screen  overflow-x-scroll overflow-y-hidden'
        : 'w-0  overflow-x-scroll overflow-y-hidden bg-white',
    ]"
  >
    <div
      class="absolute top-0 left-0 z-50 p-12 font-bold text-xl text-black uppercase w-screen overflow-hidden"
      v-if="route.name == 'home'"
    >
      The Open Brain . Org
    </div>
    <!-- chapter structur -->
    <ul
      class="pt-24 flex pointer-events-auto flex-row bg-white/60 absolute h-full top-0 mb-52 duration-700 shrink-1"
      :class="
        route.name != 'home'
          ? '-left-[105vw] w-[35vw] overflow-visible bg-white'
          : '-left-[0] w-full overflow-scroll '
      "
    >
      <li class="w-[35vw] shrink-0 py-12 px-12">
        <h2 @click="toStart()" class="py-4">Welcome to the openbrain.org</h2>
        <p class="py-4">
          This codu be an Introduction to the book, maybe a short text I dont
          Know? Stuard could maybe proved somthing like that?
        </p>
      </li>
      <li v-for="(chapter, index) in menu" class="w-[35vw] shrink-0 py-12">
        <ul
          :class="
            index == 'Part9' ? 'pointer-events-auto' : 'pointer-events-none'
          "
          class="pl-0 px-12 w-full overflow-hidden duration-700"
        >
          <h2 @click="toStart()" class="pl-8 ml-5 py-4">
            <RouterLink to="/chapter/">
              {{ menu[index].title }}
            </RouterLink>
          </h2>
          <RouterLink
            class="flex"
            :to="{
              name: 'chapter',
              hash: '#the-eye-and-retina-intro',
            }"
            @click="closeMenu()"
          >
            <div class="w-8 px-3.5 mt-5 mr-5">
              <div
                v-if="route.name == 'chapter'"
                class="h-full w-full bg-red-600"
              ></div>
            </div>
            <li class="w-full border-b py-4 border-black hover:bg-gray-100">
              0 Intro
            </li>
          </RouterLink>
          <RouterLink
            v-for="(part, index2) in chapter.parts"
            @click="closeMenu()"
            class="flex"
            :to="{
              name: 'chapter',
              hash: '#' + toSlug(part),
            }"
          >
            <div class="w-8 px-3.5 mr-5">
              <div
                v-if="route.name == 'chapter'"
                class="h-full w-full"
                :style="
                  store.currentSubChapter == toSlug(part)
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
            <li class="w-full border-b py-4 border-black hover:bg-gray-100">
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
      class="fixed border-r border-black bg-white pointer-events-auto z-[60] hover:bg-red-600 h-full w-8 flex justify-center items-top left-0 top-0 duration-700 overflow-hidden"
      :class="!store.activeMenu && route.name != 'home' ? 'left-8' : '-left-8'"
    />
    <OpenCloseButton
      v-if="store.activeMenu"
      :text="'-'"
      :target="'Menu'"
      class="fixed pointer-events-auto z-[60] flex justify-center items-center right-[65vw] pr-5 top-2 duration-700 overflow-hidden"
    />
    <OpenCloseButtonLink
      :text="'H'"
      :target="''"
      class="fixed border-r border-black bg-white pointer-events-auto z-[60] hover:bg-red-600 h-full w-8 flex justify-center items-top left-0 top-0 duration-700 overflow-hidden"
      :class="route.name && route.name != 'home' ? 'left-0' : '-left-8'"
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
