<template>
  <div
    class="flex flex-col justify-start gap-9 w-64 py-2 px-2 items-start left-20"
  >
    <div class="flex gap-2" @click="openLegend">
      <PlusIcon class="icon duration-300" :class="open ? '-rotate-45' : ''" />
      <LegendIcion1 class="icon ohne" />
      <LegendIcion2 class="icon ohne -ml-4" />
    </div>
    <div class="overflow-hidden h-0 -ml-5 -mt-3" id="inhaltLegend">
      <div
        v-for="icon in legend"
        :key="icon"
        class="text-smaller flex pb-4 flex-row items-center justify-start opacity-60 text-center"
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
import { ref } from "vue";
import LegendIcion1 from "../../icons/custom/LegendIcion1.vue";
import LegendIcion2 from "../../icons/custom/LegendIcion2.vue";
import PlusIcon from "../../icons/custom/PlusIcon.vue";

defineProps({
  legend: Object,
  iconPraefix: String,
});
const open = ref(false);
// const openLegend = () => {
//   open.value = !open.value;
// };

const openLegend = () => {
  const el = document.getElementById("inhaltLegend");
  open.value = !open.value;
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
