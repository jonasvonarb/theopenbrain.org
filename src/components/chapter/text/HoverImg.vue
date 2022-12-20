<template>
  <div
    v-if="activeHover"
    ref="img"
    class="fixed z-[70] bg-black p-4 text-white w-1/2 max-w-[600px] flex gap-4"
  >
    <div class="w-1/3 max-w-[200px]">
      <img class="w-full" :src="'/assets/hoverImges/' + activeHover + '.jpg'" />
    </div>
    <p class="w-2/3 max-w-[400px] -mt-[3px] text-small">
      {{ infos.images.find((x) => x.title === activeHover).text }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useMouse } from "@vueuse/core";
import infos from "@/assets/infosImages.json";

const { x, y } = useMouse();
const img = ref(null);
watch(x, (x, prevX) => {
  if (!img.value) return;
  const offset = window.innerWidth / 2 >= 600 ? 600 : window.innerWidth / 2;
  img.value.style.top = y.value - window.scrollY + "px";
  img.value.style.left = x - offset + "px";
});
const activeHover = ref(null);
onMounted(() => {
  const anchors = document.getElementsByClassName("hoverImg");
  let hover = (event) => {
    activeHover.value = event.target.id;
  };
  let leaveHover = (event) => {
    activeHover.value = null;
  };
  for (const anchor of anchors) {
    anchor.addEventListener("mouseover", (event) => hover(event));
    anchor.addEventListener("mouseleave", (event) => leaveHover(event));
  }
});
</script>

<style lang="scss" scoped></style>
