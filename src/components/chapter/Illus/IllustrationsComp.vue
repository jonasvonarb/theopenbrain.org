<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useGeneral } from "@/stores";

import animationJSON from "@/assets/json_backend/animations.json";

import Illustration from "@/components/chapter/Illus/IllustrationComp.vue";
import IllustrationOnScroll from "@/components/chapter/Illus/IllustrationOnScroll.vue";
import IllustrationTransition from "@/components/chapter/Illus/IllustrationTransition.vue";
gsap.registerPlugin(ScrollTrigger);

const activeAnimation = ref(null);

const store = useGeneral();
const progress = ref(0);

onMounted(() => {
  let animationTriggers = document.getElementsByClassName("animationTrigger");
  for (let trigger of animationTriggers) {
    setTimeout(() => {
      ScrollTrigger.create({
        id: "scrollTriggerAnimation",
        trigger: trigger,
        start: "top " + window.innerHeight / 2,
        end: "bottom " + window.innerHeight / 2,
        srub: 0,
        markers: false,
        onToggle: (self) => {
          if (self.isActive) {
            trigger.classList.add("active");
            activeAnimation.value = self.trigger.id
              .replace("trigger", "")
              .toLowerCase();
            store.animationActive = true;
          } else {
            trigger.classList.remove("active");
            activeAnimation.value = null;
            store.animationActive = false;
          }
        },
        onUpdate: (self) => {},
      });
    }, 500);
  }
  let animationAnchors = document.getElementsByClassName(
    "animationScrollAnchor"
  );
  for (let trigger of animationAnchors) {
    ScrollTrigger.create({
      id: "scrollTriggerAnimation",
      trigger: trigger,
      start: "top " + window.innerHeight / 2,
      end: "bottom " + window.innerHeight / 2,
      scrub: 1,
      markers: false,
      onToggle: (self) => {},
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });
  }

  let triggerFull = document.getElementById("container");
  let bgGradient = document.getElementById("bgGradient");
  ScrollTrigger.create({
    id: "scrollTriggerFull",
    trigger: triggerFull,
    start: "top " + window.innerHeight / 2,
    end: "bottom " + window.innerHeight / 2,
    scrub: 2,
    markers: false,
    onToggle: () => {},
    onUpdate: (self) => {
      // if (!activeAnimation.value) {
      // let r = Math.floor(151 + Math.sin(self.progress * 50) * 40);
      // let g = Math.floor(71 + Math.sin(self.progress * 50) * 40);
      // let b = Math.floor(230 + Math.sin(self.progress * 50) * 40);
      let r = Math.floor(255 - self.progress * 70);
      let g = Math.floor(255 - self.progress * 70);
      let b = Math.floor(255 - self.progress * 70);
      if (!bgGradient) return;
      bgGradient.style.backgroundColor =
        "rgba(" + r + "," + g + "," + b + ", 0.7)";
      // } else {
      //   bgGradient.style.backgroundColor = "#F4F4F4";
      // }
    },
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getById("scrollTriggerAnimation").kill();
  ScrollTrigger.getById("scrollTriggerFull").kill();
});
</script>

<template>
  <div
    v-if="!store.isScrolling"
    class="fixed top-0 left-0 h-screen w-1/2 z-30 pointer-events-none font-mono"
  >
    <template v-for="animation in animationJSON.animations" :key="animation">
      <template
        v-if="
          !animation.fullscreen && !animation.scroll && !animation.isTransition
        "
      >
        <transition name="fade" mode="out-in">
          <Illustration
            v-if="activeAnimation === animation.id.toLowerCase()"
            :animation="animation"
            :active-animation="activeAnimation"
            class="max-w-[1000px] m-auto"
          />
        </transition>
      </template>
      <template
        v-if="
          !animation.fullscreen && animation.scroll && !animation.isTransition
        "
      >
        <transition name="fade" mode="out-in">
          <IllustrationOnScroll
            v-if="activeAnimation === animation.id.toLowerCase()"
            :animation="animation"
            :progress="progress"
            :active-animation="activeAnimation"
            class="max-w-[1000px] m-auto"
          />
        </transition>
      </template>
      <template
        v-if="
          !animation.fullscreen && !animation.scroll && animation.isTransition
        "
      >
        <transition name="fade" mode="out-in">
          <IllustrationTransition
            v-if="activeAnimation === animation.id.toLowerCase()"
            :animation="animation"
            :progress="progress"
            :active-animation="activeAnimation"
            class="max-w-[1000px] m-auto"
          />
        </transition>
      </template>
    </template>
  </div>
</template>

<style scoped></style>
