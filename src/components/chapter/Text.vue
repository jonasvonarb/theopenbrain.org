<script setup>
import { computed } from "@vue/reactivity";
import Markdown from "vue3-markdown-it";
import { useText } from "@/stores";
import { useAnimation } from "@/stores";

import { onMounted } from "vue";

const textStore = useText();
const animationStore = useAnimation();
const options = { breaks: true, html: true };

const source = computed(() => {
  var _textStore = textStore.text.replaceAll("<h1", "<main id ='text'><h1");
  _textStore = _textStore.replaceAll("</div>", "</main></div>");
  _textStore = _textStore.replaceAll("<h2", "<section><h2");
  _textStore = _textStore.replaceAll("<section><h2", "</section><section><h2");
  return _textStore;
});

onMounted(() => {
  var wait = setInterval(() => {
    const text = document.getElementById("text");

    if (text) {
      const sections = text.children;
      clearInterval(wait);
      var _counter = 0;
      for (var i = 0; i < sections.length; i++) {
        //adding Section Id
        if (sections[i].tagName == "SECTION") {
          _counter++;
          const _section = sections[i];
          const _h2 = _section.firstChild;
          _h2.innerHTML = "<span>" + _h2.innerHTML + "</span>";
          var _listElement = document.createElement("p");
          _listElement.classList.add("titleNumber");
          var _number = document.createTextNode("Chapter " + _counter);
          _listElement.appendChild(_number);
          _h2.insertBefore(_listElement, _h2.firstChild);

          const _id = _h2.id;
          _section.id = _id;
        }
      }

      // add Point
      var trigger = document.getElementById("animation-1-structures");
      trigger.addEventListener("mouseenter", () => {
        animationStore.enterHoverPunkt("animation-1-structures");
      });

      trigger.addEventListener("mouseleave", () => {
        animationStore.leaveHoverPunkt("animation-1-structures");
      });

      var triggerB = trigger.getBoundingClientRect();
      var _container = document.getElementById("container").firstChild;
      var punkt = document.createElement("div");
      punkt.classList.add("punkt");
      punkt.id = "punkt-" + trigger.id;
      punkt.style.top =
        window.scrollY + triggerB.y - triggerB.height / 2 + "px";

      punkt.addEventListener("mouseenter", () => {
        animationStore.enterHoverPunkt("animation-1-structures");
      });
      punkt.addEventListener("mouseleave", () => {
        animationStore.leaveHoverPunkt("animation-1-structures");
      });

      _container.appendChild(punkt);

      console.log(window.scrollY, triggerB.y, _container);
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
  </div>
</template>

<style lang="scss" scoped></style>
