<script setup>
import { RouterView, useRoute } from "vue-router";
import MenuChapter from "./components/Navigation/MenuChapter.vue";
import MenuHome from "./components/Navigation/MenuHome.vue";
import MenuAbout from "./components/Navigation/MenuAbout.vue";
const route = useRoute();

let resizeTimer;

window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
</script>

<template>
  <div id="app" class="text-base cursor-default">
    <RouterView v-slot="{ Component }" class="z-0">
      <transition :name="route.meta?.transitionName || 'routeT'">
        <component :is="Component" />
      </transition>
    </RouterView>
    <MenuHome />
    <MenuAbout />
    <MenuChapter />
  </div>
</template>

<style scoped>
.noPointer {
  pointer-events: none !important;
}

.routeT-leave-active,
.routeT-enter-active {
  /* transition: opacity -webkit-filter 4s; */
  transition: opacity 0.3s;
  filter: blur(0);
  width: 100vw;
}

.routeT-enter-active {
  transition-delay: 0.3s;
}

.routeT-enter-from,
.routeT-leave-to {
  opacity: 0;
  filter: blur(2px);
}

.aboutLeave-enter-active {
  transition: all 0.3s linear;
}
.aboutLeave-leave-active {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 49;
  transition: all 0.3s linear;
}

.aboutLeave-leave-from {
  filter: blur(30px);
  transform: translateX(0%);
}

.aboutLeave-leave-to {
  filter: blur(30px);
  transform: translateX(100%);
}

.aboutLeave-enter-from {
  filter: blur(30px);
  transform: translateX(-100%);
}

.aboutTo-enter-active {
  transition: all 0.3s linear;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 49;
}
.aboutTo-leave-active {
  transition: all 0.3s linear;
  filter: blur(30px) grayscale(1);
}

.aboutTo-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.aboutTo-leave-to {
  transform: translateX(-100%);
  filter: blur(10px) grayscale(1);
  opacity: 0;
}
</style>
