<template>
  <div
    :key="paragraph.id + 'img'"
    v-if="paragraph?.img"
    :class="!inlineImageActive ? 'w-36 h-60' : 'imageW  '"
    class="no-select z-[60] absolute right-0 mt-24 duration-100 border -mr-[1px] border-black flex flex-col justify-center items-center bg-white"
  >
    <figure class="overflow-hidden flex flex-col h-full w-full">
      <img
        @click="!inlineImageActive ? openImage() : ''"
        class=""
        :class="
          !inlineImageActive
            ? 'opacity-40 h-full object-cover grayscale'
            : 'imageH object-contain'
        "
        :src="'/assets/images/' + paragraph.img + '.png'"
      />
      <div
        v-if="inlineImageActive"
        class="imgDesription break-before-all border-t border-black relative block px-4 py-2 pb-6 font-mono text-small w-full overflow-scroll"
      >
        <span v-if="paragraph?.imgCap" class="max-w-[750px] block">
          {{ paragraph?.imgCap }}
        </span>
      </div>
    </figure>

    <div
      @click="toggleImage()"
      class="opacity-100 absolute bg-white rounded-full top-0 right-0 -m-4 flex justify-center items-center"
    >
      <OpenArrowIcon v-if="!inlineImageActive" class="icon" />
      <CloseArrowIcon v-else class="icon" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CloseArrowIcon from "@/icons/custom/CloseArrowIcon.vue";
import OpenArrowIcon from "@/icons/custom/OpenArrowIcon.vue";

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
</script>

<style scoped>
.imageW {
  width: calc(50vw - 3rem + 4px);
}
</style>
