<template>
  <div
    v-if="activeHover"
    ref="img"
    class="fixed w-[400px] z-[70] bg-black p-4 text-white flex flex-col gap-4"
  >
    <template
      v-if="infos.images.find((x) => x.title === activeHover).noImage !== true"
    >
      <div class="w-full">
        <img
          loading="lazy"
          class="w-full"
          :src="'/publicAssets/hoverImges/' + activeHover + '.jpg'"
        />
      </div>
    </template>
    <p
      class="w-full max-w-[400px] -mt-[3px] text-small break-words	"
      v-html="infos.images.find((x) => x.title === activeHover).text"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useMouse } from "@vueuse/core";
import infos from "@/assets/json_backend/infosImages.json";

const { x, y } = useMouse();
const img = ref(null);
watch(x, (x) => {
  if (!img.value) return;
  const hImg = img.value.getBoundingClientRect().height;
  const offsetX = window.innerWidth / 2 >= 400 ? 400 : window.innerWidth / 2;
  const offsetY =
    y.value - window.scrollY + hImg <= window.innerHeight
      ? 0
      : y.value - window.scrollY + hImg - window.innerHeight + 20;
  img.value.style.top = y.value - window.scrollY - offsetY + "px";
  if (window.innerWidth / 2 <= x) {
    img.value.style.left = x - offsetX + "px";
  } else {
    img.value.style.left = x + offsetX - 400 + "px";
  }
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
