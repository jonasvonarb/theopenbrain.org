<template>
  <div
    :id="'point-' + id"
    ref="point"
    class="punktComment z-50 text-black icon"
    @mouseenter="animationStore.enterHoverPoint(id)"
    @mouseleave="animationStore.leaveHoverPoint(id)"
    @click="commentStore.openCommentSection(id)"
  >
    <div
      v-if="getComments?.includes(id)"
      class="rounded-full bg-violet z-40 w-3 h-3 absolute -right-0.5 -top-0.5"
    />
    N
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useAnimation, useCom } from "@/stores";
const animationStore = useAnimation();
const commentStore = useCom();

const getComments = ref(localStorage.getItem("comments"));
watch(
  () => commentStore.comments,
  () => {
    getComments.value = localStorage.getItem("comments");
  },
  { deep: true }
);

let point = ref(0);
let pos = ref(0);
const props = defineProps({
  id: String,
});

let hId = "highlight-" + props.id;
onMounted(() => {
  setPosition(hId);
});

watch;

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
<style scoped></style>
