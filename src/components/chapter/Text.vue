<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { toSlug } from "@/helper/general";

import { useText, useGeneral } from "@/stores";
import { useCom } from "@/stores/comments";

import { marker, pointAdderAnimation } from "@/helper/marking";
import Section from "./text/Section.vue";
import Comment from "./text/Comment.vue";
import Points from "@/components/UI/Points.vue";
import { useRoute, useRouter } from "vue-router";
import FurtherReading from "./text/FurtherReading.vue";
import FootNotes from "./text/FootNotes.vue";

gsap.registerPlugin(ScrollTrigger);

const store = useGeneral();
const route = useRoute();
const router = useRouter();

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
          start: "+=200 +=50",
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
            if (store.activeMenu) {
              store.activeMenu = false;
            }
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
    class="absolute top-[100vh] z-40 w-[50vw] pointer-events-none"
  >
    <!-- :class="store.startIsActive ? 'fixed' : 'absolute'" -->
    <div id="scroller" class="pointer-events-none w-full">
      <div class="fixed pointer-events-auto top-6 right-12 flex justify-end">
        <button
          class="pointer-events-auto text-xl text-white bg-black rounded-full w-16 h-16"
          v-if="store.isTop"
        >
          <!-- @click="store.startIsActive = !store.startIsActive" -->
          &#x2191;
        </button>
        <RouterLink
          v-else
          class="pointer-events-auto text-xl text-white bg-black rounded-full w-16 h-16 flex justify-center items-center"
          :to="{
            name: 'chapter',
            hash: '#the-eye-and-retina-intro',
          }"
        >
          T
        </RouterLink>
      </div>
      <main
        id="text"
        class="text pointer-events-auto w-full text-left pt-[20vh] ml-[50vw] z-30 border-l bg-white border-black tracking-wide pb-[60vh] p-32 pr-15 max-w-[800px] duration-500"
      >
        <!-- :class="!store.startIsActive ? 'mt-0' : 'mt-[100vh]'" -->

        <!-- intro -->
        <section
          v-for="(section, index) in text['intro']"
          :id="section.id"
          class="overflow-y-visible"
        >
          <h1
            :class="store.imgActive ? 'opacity-0' : ''"
            :id="'the-eye-and-retina-intro'"
            class="z-40 text-black opacity-100"
          >
            {{ section.title }}
          </h1>
          <span
            class="animationTrigger mb-52 block"
            id="triggerAnimationDragon"
          >
            <p
              class="P last:pb-52"
              v-for="paragraph in section.paragraphs"
              :id="paragraph.id"
            >
              {{ paragraph.text }}
            </p>
          </span>
        </section>
        <!-- text -->
        <div
          ref="triggers"
          v-for="(section, index) in text['sections']"
          :id="toSlug(section.title)"
          class="mt-0 trigger"
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

<style lang="scss" scoped></style>
