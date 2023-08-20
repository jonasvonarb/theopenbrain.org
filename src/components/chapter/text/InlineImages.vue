<template>
  <div
    :key="paragraph.id + 'img'"
    v-if="paragraph?.img"
    class="no-select w-text z-[60] -ml-20 mb-20 right-0 duration-100 border-y border-black flex flex-col justify-center items-center bg-white"
  >
    <figure class="overflow-hidden flex flex-col h-full w-full">
      <img
        loading="lazy"
        class="imageH object-contain h-image"
        :src="'/publicAssets/images/' + paragraph.img + '.webp'"
      />
      <div
        v-if="paragraph?.imgCap"
        class="imgDesription text-justify break-before-all border-t border-black px-20 pr-28 py-4 pb-6 font-mono text-small w-full overflow-scroll"
      >
        <span v-html="paragraph?.imgCap" />
      </div>
    </figure>
  </div>
</template>

<script setup>
defineProps({
  paragraph: Object,
});
</script>

<style scoped>
.h-image {
  min-height: calc(50vw * 510 / 787);
}
</style>
