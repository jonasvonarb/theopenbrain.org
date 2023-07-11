<template>
  <div class="z-50">
    <p
      v-for="(state, index) in states"
      :key="state"
      class="hover:border-primaryMed text-center hover:text-primaryMed select-none text-small cursor-pointer mb-6 border-black border p-6 py-3 flex flex-row justify-center gap-4 items-center"
      :class="
        activeState == index
          ? 'font-semibold bg-primaryMed border-primaryMed text-black pointer-events-none'
          : ''
      "
      @click="$emit('onClick', { index, activeState })"
    >
      {{ state }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  states: Object,
  activeState: Number,
  praefix: String,
  iconsIndex: Object,
});

defineEmits(["onClick"]);
</script>

<style scoped></style>
