<script setup>
import menu from "/src/assets/menu/menu.json";
import OpenCloseButton from "@/components/UI/OpenCloseButton.vue";

import { useRoute } from "vue-router";
import { useGeneral } from "@/stores";
import { ref } from "vue";
const route = useRoute();
const store = useGeneral();
</script>

<template>
  <div
    v-if="route.name"
    id="info"
    class="fixed flex w-screen overflow-x-scroll overflow-y-hidden top-0 left-0 z-40 h-screen text-base duration-500"
    :class="
      store.activeMenu
        ? route.name != 'home'
          ? 'w-[35vw] bg-slate-800 text-white overflow-y-scroll overflow-x-hidden'
          : 'w-screen text-black overflow-x-scroll overflow-y-hidden'
        : 'w-[20px] bg-slate-800 text-white justify-center'
    "
  >
    <div v-if="store.activeMenu" class="fixed flex gap-5 px-12 pt-2 z-50">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/chapter">Chapter</RouterLink>
    </div>
    <ul
      v-show="store.activeMenu"
      :class="route.name != 'home' ? 'flex-col ' : 'flex-row'"
      class="flex relative pt-20 pb-52 w-[35vw]"
    >
      <li
        v-for="(chapter, index) in menu"
        class="w-full px-12 shrink-0"
        :class="route.name != 'home' ? '' : 'border-l-2'"
      >
        <a href="#"> {{ menu[index].index + ". " + menu[index].title }}</a>
        <ul class="pl-6 pb-2" v-for="(part, index) in chapter.parts">
          <li>
            <RouterLink
              :to="{
                name: 'chapter',
                hash: '#the-eye-and-retina-' + (index + 1),
              }"
              >{{ "* " + part }}</RouterLink
            >
          </li>
        </ul>
      </li>
    </ul>
    <OpenCloseButton
      :text="'O'"
      :target="'Menu'"
      class="fixed hover:bg-slate-500 h-full w-[20px] flex justify-center items-center left-0 top-0 duration-500 overflow-hidden"
      :class="!store.activeMenu ? '-left-[0]' : '-left-[20px]'"
    />
    <OpenCloseButton
      v-if="route.name != 'home' && store.activeMenu"
      :text="'X'"
      :target="'Menu'"
      class="fixed flex justify-center items-center right-[65vw] pr-5 top-2 duration-500 overflow-hidden"
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
.row {
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}
.col {
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
</style>
