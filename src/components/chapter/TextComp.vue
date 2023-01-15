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
import FootNotes from "./text/FootNotes.vue";

gsap.registerPlugin(ScrollTrigger);

const store = useGeneral();

const textStore = useText();
const text = textStore.text;

const triggers = ref(null);

const source = computed(() => {
  let _textStore = textStore.text;
  return _textStore;
});

onMounted(() => {
  let wait = setInterval(() => {
    const text = document.getElementById("text");
    const container = document.getElementById("container");
    if (text) {
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
            start: "top top",
            end: "bottom top",
            srub: 0,
            markers: false,
            onToggle: (self) => {
              if (
                self.trigger.id == "the-eye-and-retina-1" &&
                !self.isActive &&
                self.direction === -1
              ) {
                store.currentSubChapter = null;
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
          onToggle: (self) => {
            if (!self.isActive) {
              store.isTop = true;
            } else {
              store.isTop = false;
            }
          },
          onUpdate: (self) => {
            store.activeMenu = false;
            store.superScriptActive = false;
          },
        });
      }, 100);
    }
  }, 1);
});
onBeforeUnmount(() => {
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
    <div id="scroller" class="pointer-events-none w-full">
      <main
        id="text"
        class="text pointer-events-auto w-full text-left pt-[20vh] ml-[50vw] z-30 border-l bg-white border-black tracking-wide pb-[60vh] pl-28 pr-32 duration-500"
      >
        <!-- intro -->
        <section
          v-for="section in text['intro']"
          :key="section.id"
          :id="section.id"
          class="overflow-y-visible max-w-[780px]"
        >
          <h1
            :id="'the-eye-and-retina-intro'"
            :class="store.imgActive ? 'opacity-0' : ''"
            class="z-40 text-black opacity-100"
          >
            {{ section.title }}
          </h1>
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
        <FurtherReading :content="text['furtherReading']" />
        <FootNotes :content="text['footNotes']" />
      </main>
      <Points />
    </div>
  </div>
</template>

<style scoped>
.top-start {
  top: calc(100vh);
}
</style>
