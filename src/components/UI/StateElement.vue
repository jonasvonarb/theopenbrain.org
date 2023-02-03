<template>
  <div class="absolute top-36 left-20 z-50">
    <p
      v-for="(state, index) in states"
      :key="state"
      class="hover:text-violet text-small cursor-pointer pb-6"
      :class="
        activeState == index ? 'underline pointer-events-none text-violet' : ''
      "
      @click="$emit('onClick', { index, activeState })"
    >
      {{ state }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  states: Object,
  activeState: Number,
});

defineEmits(["onClick"]);
</script>

<style scoped></style>
