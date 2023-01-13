<script setup>
import { useRoute, useRouter } from "vue-router";
import BiDashCircleFill from "../../icons/BiDashCircleFill.vue";
import EpCirclePlusFilled from "../../icons/EpCirclePlusFilled.vue";
const route = useRoute();
const router = useRouter();

const props = defineProps({
  target: String,
  pos: String,
  text: String,
});
</script>

<template>
  <!-- menu links -->
  <div>
    <RouterLink
      class="w-full text-center"
      v-if="route.name !== target"
      :to="'/' + target"
    >
      <EpCirclePlusFilled class="w-6 h-6" v-if="text === 'open'" />
      <BiDashCircleFill class="w-6 h-6" v-else />
    </RouterLink>
    <div v-else @click="router.go(-1)">
      <EpCirclePlusFilled class="w-6 h-6" v-if="text === 'open'" />
      <BiDashCircleFill class="w-6 h-6" v-else />
    </div>
  </div>
</template>

<style scoped></style>
