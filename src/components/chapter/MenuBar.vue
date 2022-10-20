<script setup>
import Menu from "../navigation/Menu.vue";
import { useGeneral } from "@/stores";
const store = useGeneral();
</script>

<template>
  <transition
    @before-enter="onBeforeEnter"
    @enter="enter"
    @before-leave="onBeforeLeave"
    @leave="leave"
    name="leftLeave"
    :css="false"
  >
    <div
      v-if="store.activeMenu"
      class="fixed left-0 top-0 h-body mt-body p-5 text-white translate overflow-scroll z-50 w-menu"
    >
      <Menu :place="$route.name == 'home' ? 'home' : 'chapter'" />
    </div>
  </transition>
</template>

<script>
import gsap from "gsap";

export default {
  methods: {
    onBeforeEnter(ev) {
      var el = ev;
      var tween = gsap.to(el, {
        duration: 0,
        x: -window.innerWidth * 0.35,
        y: 0,
      });
      tween.totalTime(tween.totalDuration());
    },
    onBeforeLeave(ev) {
      var el = ev;
      var tween = gsap.to(el, {
        duration: 0,
        x: 0,
        y: 0,
      });
      tween.totalTime(tween.totalDuration());
    },
    enter(ev, done) {
      var el = ev;
      gsap.to(el, {
        duration: 0.5,
        x: 0,
        y: 0,
        onComplete() {
          done();
        },
      });
    },
    leave(ev, done) {
      var el = ev;
      gsap.to(el, {
        duration: 0.5,
        x: -window.innerWidth * 0.35,
        y: 0,
        onComplete() {
          done();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
