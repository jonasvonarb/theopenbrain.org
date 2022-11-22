<script setup>
import SideBar from "../components/chapter/SideBar.vue";
import MenuBar from "../components/chapter/MenuBar.vue";
import OpenCloseButton from "../components/UI/openCloseButton.vue";

import { useGeneralStore } from "@/stores";

const store = useGeneralStore();
const { getactiveMenu } = store;
</script>

<template>
  <div>
    {{ store }}
    <MenuBar />
    <SideBar />
    <OpenCloseButton :target="'Menu'" pos="left" />
    <OpenCloseButton :target="'Sidebar'" pos="right" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
