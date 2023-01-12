<template>
  <div
    :key="paragraph.id + 'img'"
    v-if="paragraph?.img"
    :class="!inlineImageActive ? 'w-60 h-60' : 'imageW  h-[50vh] pl-16 '"
    @mouseover="openImage()"
c    @click="toggleImage()"
    class="absolute right-0 duration-200 border-y border-l border-black flex justify-center items-center bg-white overflow-hidden"
  >
    <img
      class="w-full h-full object-contain"
      :src="'/assets/images/' + paragraph.img + '.png'"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  paragraph: Object,
});

const inlineImageActive = ref(false);

const toggleImage = () => {
  inlineImageActive.value = !inlineImageActive.value;
};

const openImage = () => {
  inlineImageActive.value = true;
};
const closeImage = () => {
  inlineImageActive.value = false;
};
</script>

<style scoped>
.imageW {
  width: calc(50vw - 4rem);
}
</style>
