<template>
  <div
    class="flex flex-col justify-start gap-9 w-64 py-1 px-1 items-start left-left"
  >
    <div class="flex justify-center items-center gap-2" @click="openLegend">
      <PlusIcon class="icon duration-300" :class="open ? '-rotate-45' : ''" />
      <p class="text-small pl-5">Legend</p>
    </div>
    <div class="overflow-hidden h-0 -ml-5 -mt-3" id="inhaltLegend">
      <div
        v-for="icon in legend"
        :key="icon"
        class="text-small flex pb-4 flex-row items-center justify-start opacity-100 text-center"
      >
        <img
          class="h-8 w-20 mr-2 my-0.5"
          :src="
            '/publicAssets/icons/' + iconPraefix + '/' + toSlug(icon) + '.svg'
          "
        />
        <p class="h-6 whitespace-nowrap">
          {{ icon !== "special" ? icon : "Spike train" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toSlug } from "@/helper/general";
import gsap from "gsap";
import { ref, onMounted } from "vue";
import PlusIcon from "../../icons/custom/PlusIcon.vue";
import { useGeneral } from "../../stores";

defineProps({
  legend: Object,
  iconPraefix: String,
});
const open = ref(false);
const store = useGeneral();

onMounted(() => {
  store.legendIsActive = false;
});

const openLegend = () => {
  const el = document.getElementById("inhaltLegend");
  open.value = !open.value;
  store.legendIsActive = open.value;

  if (open.value) {
    gsap.to(el, {
      duration: 0.3,
      height: "auto",
    });
  } else {
    gsap.to(el, {
      duration: 0.3,
      height: 0,
    });
  }
};
</script>

<style lang="scss" scoped></style>
