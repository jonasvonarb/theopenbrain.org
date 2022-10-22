<script setup>
import SideBar from "../components/chapter/SideBar.vue";
import MenuBar from "../components/chapter/MenuBar.vue";
import OpenCloseButton from "../components/UI/OpenCloseButton.vue";
import Text from "../components/chapter/Text.vue";
import Illustration from "../components/chapter/Illus/Illustration.vue";

import { useGeneral } from "@/stores";
import ActionButton from "../components/UI/ActionButton.vue";

const store = useGeneral();
const { getactiveMenu } = store;
</script>

<template>
  <div>
    <MenuBar />
    <SideBar />
    <OpenCloseButton :target="'Menu'" pos="left" />
    <OpenCloseButton :target="'Sidebar'" pos="right" />
    <ActionButton pos="center" />

    <!-- text -->
    <Illustration />
    <Text />
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
