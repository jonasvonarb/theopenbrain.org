<script setup>
import lottie from "lottie-web";
import { onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import animationJSON from "/src/assets/animations.json";
gsap.registerPlugin(ScrollTrigger);

const activeAnimation = ref(null);

const animations = ref({});

onMounted(() => {
  for (let animationJson of animationJSON.animations) {
    let svgContainer = document.getElementById(animationJson.id);
    animations.value[animationJson.id.toLowerCase()] = lottie.loadAnimation({
      id: animationJson.id,
      speed: 3,
      wrapper: svgContainer,
      animType: "svg",
      loop: false,
      autoplay: false,
      path: "/assets/animations/" + animationJson.id + ".json",
      rendererSettings: {
        progressiveLoad: true, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
      },
    });

    animations.value[animationJson.id.toLowerCase()].setSubframe(true);
    animations.value[animationJson.id.toLowerCase()].setSpeed(1);
  }

  let animationTriggers = document.getElementsByClassName("animationTrigger");
  for (let trigger of animationTriggers) {
    ScrollTrigger.create({
      id: "scrollTriggerAnimation",
      trigger: trigger,
      start: "top " + window.innerHeight * 0.4,
      end: "bottom " + window.innerHeight / 4,
      srub: 0,
      markers: false,
      onToggle: (self) => {
        if (self.isActive) {
          trigger.classList.add("active");
          activeAnimation.value = self.trigger.id
            .replace("trigger", "")
            .toLowerCase();
          animations.value[activeAnimation.value].goToAndPlay(0, true);
        } else {
          trigger.classList.remove("active");
          activeAnimation.value = null;
        }
      },
      onUpdate: (self) => {},
    });
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
        } else {
          trigger.classList.remove("active");
          activeAnimation.value = null;
        }
      },
      onUpdate: (self) => {
        if (!activeAnimation.value) return;
        const map = (value, x1, y1, x2, y2) =>
          ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
        let totalFrames = animations.value[activeAnimation.value].totalFrames;

        animations.value[activeAnimation.value].goToAndStop(
          map(self.progress, 0, 1, 0, totalFrames / 10),
          true
        );
      },
    });
  }
});

const activeState = ref({
  state: 0,
});

const setState = (index, state) => {
  const totalFrames = animations.value[activeAnimation.value].totalFrames / 5;
  const currentFrame = animations.value[activeAnimation.value].currentFrame;
  const pos = (totalFrames.value / 3) * index;
  const posAfter = (totalFrames.value / 3) * (index + 1);
  activeState.value.state = index;
  animations.value[activeAnimation.value].playSegments([pos, posAfter], true);
};

const replay = () => {
  const info = animationJSON.animations.find((x) => {
    return x.id.toLowerCase() == activeAnimation.value;
  });
  console.log(info, animationJSON, activeAnimation.value);
  if (!info.loopSection) {
    animations.value[activeAnimation.value].goToAndPlay(0, true);
  } else {
    console.log(info.loopSection);
    animations.value[activeAnimation.value].playSegments(
      info.loopSection,
      true
    );
  }
};

onBeforeUnmount(() => {
  ScrollTrigger.getById("scrollTriggerAnimation").kill();
});
</script>

<template>
  <div
    class="fixed top-0 left-0 h-screen w-1/2 z-30 pointer-events-none bg-gray-100"
  >
    <template v-for="animation in animationJSON.animations">
      <transition name="fade">
        <template v-if="!animation.fullscreen && !animation.scroll">
          <div
            class="px-24 w-full flex flex-col h-full pointer-events-auto"
            v-show="activeAnimation === animation.id.toLowerCase()"
          >
            <div
              class="px-24 z-50 fixed flex w-[50vw] justify-between top-12 left-0"
            >
              <span>{{ animation.title }}</span>
              <span
                v-if="animation.loop"
                class="hover:underline"
                @click="replay()"
                >replay</span
              >
              <div v-if="animation.states">
                <p
                  @click="setState(index, state)"
                  class="hover:underline duration-300"
                  v-for="(state, index) in animation.states"
                  :class="
                    activeState.state == index
                      ? 'italic font-bold'
                      : 'blur-xs opacity-30'
                  "
                >
                  {{ state }}
                </p>
              </div>
            </div>
            <div :id="animation.id" class="w-full h-full" />
          </div>
        </template>
      </transition>

      <template v-if="!animation.fullscreen && animation.scroll">
        <transition name="fade">
          <div
            class="px-24 w-[50vw] flex flex-col h-full pointer-events-auto"
            v-show="activeAnimation === animation.id.toLowerCase()"
          >
            <div
              class="px-24 z-50 fixed flex w-1/2 justify-between top-12 left-0"
            >
              <span>{{ animation.title }}</span>
            </div>
            <div :id="animation.id" class="w-full h-full" />
          </div>
        </transition>
      </template>
    </template>
  </div>
</template>

<style scoped></style>
