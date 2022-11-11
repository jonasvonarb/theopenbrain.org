<script setup>
import { computed } from "@vue/reactivity";
import { useText, useGeneral } from "@/stores";
import { useCom } from "@/stores/comments";

import { onMounted } from "vue";

import { marker, pointAdderAnimation } from "@/helper/marking";
import BreakImages from "./text/BreakImages.vue";
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
  <div>
    <div id="container" class="w-screen h-screen">
      <main
        id="text"
        class="text w-[55vw] overflow-y-visible overflow-x-visible absolute top-12 right-0 pr-24 z-30"
      >
        <section
          v-for="(section, index) in text['intro']"
          :id="section.id"
          class="overflow-y-visible"
        >
          <h1
            :class="store.imgActive ? 'opacity-0' : ''"
            class="durattion-500 z-40 text-black opacity-100"
          >
            <span class="w-[10vw] pl-5 shrink-0"></span>
            {{ section.title }}
          </h1>
          <p v-for="paragraph in section.paragraphs" :id="paragraph.id">
            {{ paragraph.text }}
          </p>
        </section>
        <div
          v-for="(section, index) in text['sections']"
          :id="'the-eye-and-retina-' + (index + 1)"
          class=""
        >
          <section :id="section.id" class="overflow-y-visible">
            <h2
              :class="store.imgActive ? 'opacity-0' : ''"
              class="durattion-500 z-40 subChapter"
            >
              <span class="w-[10vw] pl-5 shrink-0">{{ index + 1 }}</span>
              {{ section.title }}
            </h2>
            <template v-for="paragraph in section['paragraphs']">
              <BreakImages v-if="paragraph?.type == 'break'" :title="paragraph.text" />
              <p v-else v-html="paragraph.text" :id="paragraph.id" />
            </template>
          </section>
        </div>
        <Points />
      </main>
    </div>
    <Comment v-if="commentStore.activeCom" />
  </div>
</template>

<style lang="scss" scoped></style>
