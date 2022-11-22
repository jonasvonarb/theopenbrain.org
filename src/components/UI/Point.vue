<template>
  <div
    ref="point"
    @mouseenter="animationStore.enterHoverPoint(id)"
    @mouseleave="animationStore.leaveHoverPoint(id)"
    @click="commentStore.openCommentSection(id)"
    class="punktComment z-50"
    :id="'point-' + id"
  >
    C
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { useAnimation, useCom } from "@/stores";
const animationStore = useAnimation();
const commentStore = useCom();

let point = ref(0);
let pos = ref(0);
const props = defineProps({
  id: String,
});

let hId = "highlight-" + props.id;
onMounted(() => {
  setPosition(hId);
});

const setPosition = (id) => {
  let wait = setInterval(() => {
    const element = document.getElementById(id);
    if (!element) return;
    clearInterval(wait);
    var y = element.getBoundingClientRect().y;

    pos.value = window.scrollY + y + "px";
    point.value.style.top = pos.value;
    point.value.style.display = "block";
  }, 1);
};
</script>
<style lang="scss" scoped></style>
