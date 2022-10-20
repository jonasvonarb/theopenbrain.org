<script setup>
import { useGeneral } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
const store = useGeneral();

const { activeMenu } = storeToRefs(store);

console.log(activeMenu.value);

watch(
  () => activeMenu.value,
  (n) => console.log(n, " value changed")
);

const props = defineProps({
  target: String,
  pos: String,
});
</script>

<template>
  <button
    @click="store.toggle('active' + props.target)"
    :class="pos == 'left' ? 'left-2' : 'right-2'"
    class="fixed z-50 bottom-2 px-3 py-1 float-right m-2 bg-black text-white border-2 rounded-full hover:bg-red-600"
  >
    <template v-if="store['active' + target]">H</template>
    <template v-else>{{
      props.target + " " + store["active" + target]
    }}</template>
  </button>
</template>

<script>
export default {};
</script>

<style scoped></style>
