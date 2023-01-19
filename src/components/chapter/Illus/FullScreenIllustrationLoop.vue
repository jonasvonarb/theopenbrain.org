<template>
  <div class="w-full h-full noHyphens pb-12">
    <h4 class="absolute">{{ animation.title }}</h4>
    <div class="w-full h-full flex justify-between items-end text-small">
      <div class="w-1/3">
        <ol class="w-1/2 pl-12">
          <li
            class="list-decimal pt-6 hover:blur-xs cursor-pointer"
            v-for="state of animation.states"
            :key="state"
          >
            {{ state }}
          </li>
        </ol>
      </div>
      <div class="w-2/3 flex justify-center">
        <img
          class="max-h-[66vh] object-contain"
          src="assets/animations/animationPhototransduction.svg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  animation: Object,
});
</script>

<style scoped>
.noHyphens {
  hyphens: none;
}
</style>
