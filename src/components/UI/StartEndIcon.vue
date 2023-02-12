<template>
  <template v-if="paragraph?.animation">
    <template v-if="art === 'start'">
      <div
        v-if="!paragraph.animation.end && !paragraph.animation.middel"
        :class="`marker-${art}`"
      />
    </template>
    <template v-else>
      <div
        v-if="!paragraph.animation.start && !paragraph.animation.middel"
        :class="`marker-${art}`"
      />
    </template>
  </template>
</template>

<script setup>
defineProps({
  paragraph: Object,
  art: String,
});
</script>

<style scoped></style>
