<template>
  <figure
    :key="paragraph.id + 'img'"
    v-if="paragraph?.img"
    :class="!inlineImageActive ? 'w-60 h-60' : 'imageW  h-[50vh] '"
    class="no-select z-[60] absolute right-0 duration-200 border -mr-[1px] border-black flex flex-col justify-center items-center bg-white overflow-hidden"
  >
    <img
      @click="!inlineImageActive ? openImage() : ''"
      class="w-full h-full object-contain"
      :class="!inlineImageActive ? 'opacity-40' : ''"
      :src="'/assets/images/' + paragraph.img + '.png'"
    />
    <figcaption
      v-if="inlineImageActive"
      class="imgDesription px-5 py-2 font-mono text-small w-full"
    >
      <span class="max-w-[600px] block">
        <strong>Info:</strong> {{ paragraph?.imgCap }}
      </span>
    </figcaption>
    <div
      @click="toggleImage()"
      class="opacity-100 absolute bg-white hover:bg-violet hover:text-white rounded-full top-0 right-0 m-6 flex justify-center items-center"
    >
      <BiArrowDownLeftCircle v-if="!inlineImageActive" class="" />
      <BiArrowUpRightCircle v-else class="" />
    </div>
  </figure>
</template>

<script setup>
import { ref } from "vue";
import BiArrowDownLeftCircle from "@/icons/BiArrowDownLeftCircle.vue";
import BiArrowUpRightCircle from "@/icons/BiArrowUpRightCircle.vue";

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
  width: calc(50vw - 4rem + 2px);
}
</style>
