<script setup>
import { computed } from "@vue/reactivity";
import Markdown from "vue3-markdown-it";
import { useText } from "@/stores";
import { useAnimation } from "@/stores/animation";
import { useCom } from "@/stores/comments";

import { onMounted } from "vue";

import { marker, pointAdderAnimation } from "@/helper/marking";
import BreakImages from "./text/BreakImages.vue";
import Comment from "./text/Comment.vue";
import Points from "@/components/UI/Points.vue";

const textStore = useText();
const animationStore = useAnimation();
const commentStore = useCom();
const options = { breaks: true, html: true };
const text = textStore.text;

// const refSource = ref(0);

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
    <div id="container">
      <main
        id="text"
        class="text w-[55vw] overflow-y-visible overflow-x-visible absolute top-6 right-0 pr-24 z-30"
      >
        <section
          v-for="(section, index) in text['sections']"
          :id="section.id"
          class="overflow-y-visible"
        >
          <h2>
            <span class="w-[15vw] pl-5 shrink-0">{{
              "Chapter " + (index + 1)
            }}</span>
            {{ section.title }}
          </h2>
          <template v-for="paragraph in section['paragraphs']">
            <p
              v-if="paragraph?.type != 'break'"
              v-html="paragraph.text"
              :id="paragraph.id"
            />
            <BreakImages v-else />
          </template>
        </section>
      </main>
    </div>
    <Points />

    <Comment v-if="commentStore.activeCom" />
  </div>
</template>

<style lang="scss" scoped></style>
