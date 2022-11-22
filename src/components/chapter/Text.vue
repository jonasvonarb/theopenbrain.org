<script setup>
import { computed } from "@vue/reactivity";
import Markdown from "vue3-markdown-it";
import { useText } from "@/stores";
import { useAnimation } from "@/stores";

import { onMounted } from "vue";

import { marker, pointAdder } from "@/helper/marking";
import { sectionAdder } from "@/helper/sections";

const textStore = useText();
const options = { breaks: true, html: true };

const source = computed(() => {
  let _textStore = textStore.text;
  _textStore = textStore.text.replaceAll("<h1", "<main id ='text'><h1");
  _textStore = _textStore.replaceAll("</div>", "</main></div>");
  if (_textStore.includes("<section ")) return _textStore;
  console.log("added sections");
  _textStore = _textStore.replaceAll("<h2", "<section><h2");
  _textStore = _textStore.replaceAll("<section><h2", "</section><section><h2");

  return _textStore;
});

onMounted(() => {
  let wait = setInterval(() => {
    const text = document.getElementById("text");
    const container = document.getElementById("container");

    if (text) {
      clearInterval(wait);
      console.log(container);
      sectionAdder(text, { wait });
      pointAdder();
      textStore.updateText(document.getElementById("text").innerHTML);
      marker(source, container);
    }
  }, 1);
});
</script>

<template>
  <div>
    <Markdown
      id="container"
      class="text w-[55vw] overflow-x-scroll absolute top-6 right-0 pr-24 z-10"
      :source="source"
      v-bind="options"
    />
    <div
      id="containerPunkt"
      class="w-[55vw] absolute top-6 right-0 pr-24 z-10"
    ></div>
  </div>
</template>

<style lang="scss" scoped></style>
