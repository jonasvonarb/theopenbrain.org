<script setup>
import { computed } from "@vue/reactivity";
import { useText, useGeneral } from "@/stores";
import { useCom } from "@/stores/comments";

import { onMounted } from "vue";

import { marker, pointAdderAnimation } from "@/helper/marking";
import Section from "./text/Section.vue";
import Comment from "./text/Comment.vue";
import Points from "@/components/UI/Points.vue";

const store = useGeneral();

const textStore = useText();
const commentStore = useCom();
const text = textStore.text;

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
    }
  }, 1);
});
</script>

<template>
  <div id="container" class="w-screen h-screen bg-white">
    <main
      id="text"
      class="text w-1/2 overflow-y-visible overflow-x-visible absolute top-0 right-0 z-30 border-l border-black tracking-wide"
    >
      <!-- intro -->
      <section
        v-for="(section, index) in text['intro']"
        :id="section.id"
        class="overflow-y-visible m-20"
      >
        <h1
          :class="store.imgActive ? 'opacity-0' : ''"
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
        v-for="(section, index) in text['sections']"
        :id="'the-eye-and-retina-' + (index + 1)"
        class="m-20 mt-0 pt-20"
      >
        <Section :section="section" :index="index" />
      </div>
    </main>
    <Points />
    <Comment v-if="commentStore.activeCom" />
  </div>
</template>

<style lang="scss" scoped></style>
