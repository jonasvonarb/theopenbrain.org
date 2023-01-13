<script setup>
import { useGeneral } from "@/stores";
import BiDashCircleFill from "../../icons/BiDashCircleFill.vue";
import EpCirclePlusFilled from "../../icons/EpCirclePlusFilled.vue";
const store = useGeneral();

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});

console.log(props.text);
</script>

<template>
  <button class="" @click="store.toggle('active' + target)">
    <EpCirclePlusFilled class="w-6 h-6" v-if="text === 'open'" />
    <BiDashCircleFill class="w-6 h-6" v-else />
  </button>
</template>

<style scoped></style>
