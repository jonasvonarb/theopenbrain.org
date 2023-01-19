<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useGeneral } from "@/stores";

import animationJSON from "@/assets/animations.json";

import Illustration from "@/components/chapter/Illus/IllustrationComp.vue";
import IllustrationOnScroll from "@/components/chapter/Illus/IllustrationOnScroll.vue";
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
      start: "top " + window.innerHeight * 0.4,
      end: "bottom " + window.innerHeight / 3,
      srub: 0,
      markers: false,
      onToggle: (self) => {
        if (self.isActive) {
          trigger.classList.add("active");
          activeAnimation.value =
            "animation" + self.trigger.id.replace("anchor", "").toLowerCase();
          store.animationActive = true;
        } else {
          trigger.classList.remove("active");
          activeAnimation.value = null;
          store.animationActive = false;
        }
      },
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getById("scrollTriggerAnimation").kill();
});
</script>

<template>
  <div
    class="fixed top-0 left-0 h-screen w-1/2 z-30 pointer-events-none font-mono"
  >
    <transition name="fade">
      <video
        autoplay
        muted
        loop
        class="absolute top-0 left-0 h-screen w-full object-cover"
        id="myVideo"
        v-if="!activeAnimation"
      >
        <source
          src="/assets/video/bgCell.mp4"
          type="video/mp4"
          playbackspeed="0.1"
        />
        Your browser does not support HTML5 video.
      </video>
    </transition>
    <template v-for="animation in animationJSON.animations" :key="animation">
      <template v-if="!animation.fullscreen && !animation.scroll">
        <transition name="fade">
          <Illustration
            v-if="activeAnimation === animation.id.toLowerCase()"
            :animation="animation"
            :active-animation="activeAnimation"
            class="bg-white"
          />
        </transition>
      </template>

      <template v-if="!animation.fullscreen && animation.scroll">
        <transition name="fade">
          <IllustrationOnScroll
            v-if="activeAnimation === animation.id.toLowerCase()"
            :animation="animation"
            :progress="progress"
            :active-animation="activeAnimation"
            class="bg-white"
          />
        </transition>
      </template>
    </template>
  </div>
</template>

<style scoped></style>
