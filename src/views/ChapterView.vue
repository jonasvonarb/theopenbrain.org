<script setup>
import SideBar from "../components/chapter/SideBar.vue";
import MenuBar from "../components/chapter/MenuBar.vue";
import Text from "../components/chapter/Text.vue";
import ExportField from "../components/chapter/ExportField.vue";
import Illustration from "../components/chapter/Illus/Illustration.vue";

import { useGeneral, useText } from "@/stores";
import ActionButton from "../components/UI/ActionButton.vue";

const store = useGeneral();
const storeText = useText();
const { getactiveMenu } = store;
</script>

<template>
  <div>
    <!-- <MenuBar /> -->
    <!-- <SideBar /> -->

    <!-- <OpenCloseButton :target="'Sidebar'" pos="right" /> -->
    <div
      class="fixed z-50 bottom-2 flex justify-end w-full"
      :class="store.imgActive ? 'opacity-0' : ''"
    >
      <ActionButton :text="'Clear'" @action="storeText.clearTextMarking()" />
      <ActionButton :text="'Export'" @action="storeText.saveLocalstorage()" />
      <ActionButton :text="'Import'" @action="store.toggleImport()" />
    </div>
    <ExportField />
    <!-- text -->
    <Illustration />
    <Text />
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
