<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { toSlug, addH, removeH } from "@/helper/general";

import { useText, useGeneral } from "@/stores";

import { marker, pointAdderAnimation } from "@/helper/marking";
import Section from "./text/SectionComp.vue";
import Points from "@/components/UI/PointsComp.vue";
import HoverImg from "@/components/chapter/text/HoverImg.vue";
import FurtherReading from "./text/FurtherReading.vue";
import DownloadSection from "./text/DownloadSection.vue";

import FootNotes from "./text/FootNotes.vue";

// import noise from "@/helper/noise";

import Perlin from "@/helper/perlin.ts";
import QuizSection from "./text/QuizSection.vue";

// Seed value is optional, default is 0.
const seed = Math.random();
const noise = new Perlin(seed);

// Call the noise functions to get the noise value for that coordinates.
// noise.simplex2(x, y);
// noise.simplex3(x, y, z);

// noise.perlin2(x, y);
// noise.perlin3(x, y, z);

gsap.registerPlugin(ScrollTrigger);

const store = useGeneral();

const textStore = useText();
const text = ref(textStore.text);

const triggers = ref(null);

const source = computed(() => {
  let _textStore = textStore.text;
  return _textStore;
});
const posAugeX = ref(0);
const posAugeY = ref(0);
let intervalRandom;
onMounted(() => {
  let wait = setInterval(() => {
    const _text = document.getElementById("text");
    const container = document.getElementById("container");
    if (_text) {
      clearInterval(wait);
      pointAdderAnimation();
      marker(source, container);
      const illuHighlights = document.getElementsByClassName("animationMarker");

      for (const highlight of illuHighlights) {
        highlight.addEventListener("mouseover", (event) => addH(event));
        highlight.addEventListener("mouseleave", (event) => removeH(event));
      }

      setTimeout(() => {
        for (let trigger of document.querySelectorAll(".trigger")) {
          ScrollTrigger.create({
            id: "scrollTriggerText",
            trigger: trigger,
            start: "top +=100",
            end: "bottom +=100",
            srub: 0,
            markers: false,
            onToggle: (self) => {
              if (!self.isActive) {
                store.currentSubChapter = "intro";
              }
              if (!self.isActive) return;
              store.currentSubChapter = self.trigger.id;
            },
            onUpdate: (self) => {
              store.progress = self.progress;
            },
          });
        }
        ScrollTrigger.create({
          id: "scrollTriggerAll",
          trigger: "#scroller",
          start: "-=" + (window.innerHeight / 3) * 2 + " +=0",
          end: "bottom top",
          srub: 0,
          markers: false,
          onToggle: (self) => {},
          onUpdate: (self) => {
            store.activeMenu = false;
            store.superScriptActive = false;
          },
        });
      }, 10);
    }
  }, 1);
  let timer = 0;
  intervalRandom = setInterval(() => {
    timer = timer + 15;
    let speedX = 0.00006;
    let speedY = 0.00005;
    let x = noise.simplex2(timer * speedX, timer * speedX);
    let y = noise.simplex2(timer * speedY, timer * speedY);
    posAugeX.value = x * 20;
    posAugeY.value = y * 15;
  }, 15);
});
onBeforeUnmount(() => {
  clearInterval(intervalRandom);
  ScrollTrigger.getById("scrollTriggerText").kill();
  ScrollTrigger.getById("scrollTriggerAll").kill();
});
</script>

<template>
  <div
    id="container"
    class="absolute top-start z-40 w-[50vw] pointer-events-none font-sans"
  >
    <!-- :class="store.startIsActive ? 'fixed' : 'absolute'" -->
    <HoverImg />
    <div class="marker-center" />
    <div id="scroller" class="pointer-events-none w-full">
      <main
        id="text"
        class="text pointer-events-auto w-full text-left pt-[20vh] ml-text max-w-text z-30 border-l bg-white border-black tracking-wide pl-20 pr-24 duration-300"
      >
        <!-- intro -->
        <section
          v-for="section in text['intro']"
          :key="section.id"
          :id="section.id"
          class="overflow-y-visible max-w-[780px]"
        >
          <div
            class="TN shadow-md border border-black bg-white rounded-full absolute -translate-x-[8.6rem] -translate-y-[0.9rem] w-28 h-28 flex items-center justify-center"
          >
            <div
              :style="
                'transform: translate(' +
                posAugeX +
                'px, ' +
                posAugeY / 2 +
                'px);' +
                'height: ' +
                (2.5 - Math.abs(posAugeX.toFixed(2)) / 20) +
                'rem; width: ' +
                (2.5 - Math.abs(posAugeX.toFixed(2)) / 20) +
                'rem;'
              "
              class="bg-black h-14 w-14 rounded-full translate-x-2"
            />
          </div>
          <h1
            :id="'the-eye-and-retina-intro'"
            :class="store.imgActive ? 'opacity-0' : ''"
            class="z-40 text-black opacity-100 capitalize"
          >
            {{ section.title }}
          </h1>
          <span class="font-mono text-small">
            <p class="font-semibold">Arjun Krishnaswamy</p>
            <p class="pb-5">
              Department of Physiology, McGill University, Montreal, Canada
            </p>
            <p class="font-semibold">Stuart Trenholm</p>
            <p>
              Montreal Neurological Institute, McGill University, Montreal,
              Canada
            </p>
          </span>
          <br />
          <span
            id="triggerAnimationDragon"
            class="animationTrigger block noHighlight"
          >
            <p
              v-for="paragraph in section.paragraphs"
              :id="paragraph.id"
              :key="paragraph.id"
              class="P"
              v-html="paragraph.text"
            />
          </span>
        </section>
        <!-- text -->
        <div
          v-for="(section, index) in text['sections']"
          :id="toSlug(section.title)"
          :key="toSlug(section.title)"
          ref="triggers"
          class="trigger max-w-[780px]"
        >
          <Section :section="section" :index="index" />
        </div>
        <div class="-ml-20 w-text">
          <QuizSection />
          <DownloadSection />
          <FurtherReading :content="source['furtherReading']" />
          <FootNotes :content="source['footNotes']" />
        </div>
      </main>
      <Points />
    </div>
  </div>
</template>

<style scoped>
.top-start {
  top: calc(100vh);
}

.ml-text {
  width: min(50vw, calc(780px + 11rem));
  margin-left: calc(100vw - min(50vw, calc(780px + 11rem)));
}
</style>
