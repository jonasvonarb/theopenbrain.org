<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useText, useGeneral } from "@/stores";
import { useCom } from "@/stores/comments";

import { onMounted } from "vue";

import { marker, pointAdderAnimation } from "@/helper/marking";
import Section from "./text/Section.vue";
import Comment from "./text/Comment.vue";
import Points from "@/components/UI/Points.vue";

gsap.registerPlugin(ScrollTrigger);

const store = useGeneral();

const textStore = useText();
const commentStore = useCom();
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
      setTimeout(() => {
        for (let trigger of document.querySelectorAll(".trigger")) {
          ScrollTrigger.create({
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
      }, 100);
    }
  }, 1);
});
</script>

<template>
  <div
    id="container"
    class="z-40 overflow-y-scroll overflow-x-hidden w-screen h-screen"
  >
    <main
      id="text"
      class="text w-1/2 overflow-y-visible overflow-x-visible absolute top-0 right-0 z-30 border-l border-black tracking-wide pb-[60vh]"
    >
      <!-- intro -->
      <section
        v-for="(section, index) in text['intro']"
        :id="section.id"
        class="overflow-y-visible m-32 pr-20"
      >
        <h1
          :class="store.imgActive ? 'opacity-0' : ''"
          :id="'the-eye-and-retina-intro'"
          class="z-40 text-black opacity-100"
        >
          {{ section.title }}
        </h1>
        <p v-for="paragraph in section.paragraphs" :id="paragraph.id">
          {{ paragraph.text }}
        </p>
      </section>
      <!-- text -->
      <div
        ref="triggers"
        v-for="(section, index) in text['sections']"
        :id="'the-eye-and-retina-' + (index + 1)"
        class="m-32 mt-0 pr-20 trigger"
      >
        <Section :section="section" :index="index" />
      </div>
    </main>
    <Points />
    <Comment v-if="commentStore.activeCom" />
  </div>
</template>

<style lang="scss" scoped></style>
