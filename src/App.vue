<script setup>
import { RouterView, useRoute } from "vue-router";
import MenuChapter from "./components/Navigation/MenuChapter.vue";
import MenuHome from "./components/Navigation/MenuHome.vue";
import MenuAbout from "./components/Navigation/MenuAbout.vue";
import { onBeforeUnmount, ref, watch } from "vue";
import { watchDebounced } from "@vueuse/core";
import { useGeneral } from "@/stores";

const route = useRoute();
const resize = ref(0);
const store = useGeneral();

const onResize = (event) => {
  resize.value = 1;
  let resizeTimer;
  if (document.body.classList.contains("resize-animation-stopper")) return;
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resize.value = 0;
  }, 400);
};

watchDebounced(
  resize,
  () => {
    document.body.classList.remove("resize-animation-stopper");
  },
  { debounce: 1000 }
);

watch(route, (to, from) => {
  if (from.name !== "chapter") {
    store.isNextBack = false;
  } else {
    store.isNextBack = true;
  }
});

window.addEventListener("resize", onResize);

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div class="text-base cursor-default font-sans">
    <RouterView v-slot="{ Component }" class="z-0">
      <transition :name="route.meta?.transitionName || 'routeT'">
        <component :is="Component" />
      </transition>
    </RouterView>
    <MenuHome />
    <MenuChapter />
    <MenuAbout />
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
  transform: translateX(-100%);
}

.aboutLeave-enter-from {
  filter: blur(30px);
  transform: translateX(0%);
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
  transform: translateX(-100%);
}
.aboutTo-leave-to {
  transform: translateX(0%);
  filter: blur(10px) grayscale(1);
  opacity: 0;
}
</style>
