<template>
  <div
    id="info"
    :class="
      place == 'home'
        ? ' bg-transparent overflow-x-scroll overflow-y-hidden w-full'
        : ' bg-black overflow-y-scroll overflow-x-hidden w-menu'
    "
    class="fixed top-0 left-0 z-40 h-full"
  >
    <ul
      id="list"
      :class="place == 'home' ? 'flex-col' : 'flex-row'"
      class="absolute flex flex-wrap h-full w-full text-h2 uppercase my-12 text-left pointer-events-none"
    >
      <li
        class="item pl-12 pr-12 pb-12 w-menu pointer-events-none normal-case break-inside-auto h-menu"
        v-for="(parts, index) in menu"
      >
        <h2
          class="static inline-block mt-0 menus text-lg hover:bg-emerald-400"
          :class="showBrain ? '' : ''"
          :id="index"
        >
          {{ parts.title }}
        </h2>
        <br />
        <p
          class="listItem hover:bg-red-600 parts indent-menu"
          v-for="(part, index) in parts.parts"
        >
          {{ parts.index + "." + (index + 1) + ". " + part }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import menu from "/src/assets/menu/menu.json";
import gsap from "gsap";

export default {
  props: ["place"],
  data() {
    return {
      menu: menu,
      showBrain: false,
    };
  },
  watch: {},
  computed: {},
  mounted() {
    console.log(this.place, "place");
  },
  methods: {},
};
</script>

<style scoped>
.listItem {
  display: block;
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
