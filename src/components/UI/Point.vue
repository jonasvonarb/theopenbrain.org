<template>
  <div
    ref="point"
    @mouseenter="animationStore.enterHoverPoint(id)"
    @mouseleave="animationStore.leaveHoverPoint(id)"
    @click="commentStore.openCommentSection(id)"
    class="punktComment z-50 text-black"
    :id="'point-' + id"
  >
    <div
      v-if="getComments?.includes(id)"
      class="rounded-full bg-violet-500 z-40 w-4 h-4 absolute -right-1 -top-1"
    />
    C
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { useAnimation, useCom } from "@/stores";
import { storeToRefs } from "pinia";
const animationStore = useAnimation();
const commentStore = useCom();

const { comments } = storeToRefs(commentStore);

const getComments = ref(localStorage.getItem("comments"));

console.log(getComments.value);

let commentKeys = ref(Object.keys(comments.value));

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
    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;
      var y = element.getBoundingClientRect().y;
      pos.value = window.scrollY + y + "px";
      point.value.style.top = pos.value;
      point.value.style.display = "block";
      clearInterval(wait);
    }, 100);
  }, 1);
};
</script>
<style lang="scss" scoped></style>
