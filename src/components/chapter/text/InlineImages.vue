<template>
  <div
    :key="paragraph.id + 'img'"
    v-if="paragraph?.img"
    class="no-select w-[50vw] z-[60] -ml-20 mb-20 right-0 duration-100 max-w-[900px] border-y border-black flex flex-col justify-center items-center bg-white"
  >
    <figure class="overflow-hidden flex flex-col h-full w-full">
      <img
        class="imageH object-contain"
        :src="'/publicAssets/images/' + paragraph.img + '.png'"
      />
      <div
        v-if="paragraph?.imgCap"
        class="imgDesription text-justify break-before-all border-t border-black px-4 py-4 pb-6 font-mono text-small w-full overflow-scroll"
      >
        {{ paragraph?.imgCap }}
      </div>
    </figure>
  </div>
</template>

<script setup>
const props = defineProps({
  paragraph: Object,
});
</script>

<style scoped></style>
