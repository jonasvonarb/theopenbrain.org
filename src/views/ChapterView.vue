<script setup>
import Text from "../components/chapter/Text.vue";
import ExportField from "../components/chapter/ExportField.vue";
import Illustration from "../components/chapter/Illus/Illustration.vue";
import EyeStart from "@/components/chapter/text/EyeStart.vue";

import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

import { useGeneral, useText, useCom } from "@/stores";
import ActionButton from "../components/UI/ActionButton.vue";
import Comment from "../components/chapter/text/Comment.vue";

const store = useGeneral();
const storeText = useText();
const commentStore = useCom();

const { getactiveMenu } = store;
</script>

<template>
  <div>
    <div
      :class="
        store.isScrolling
          ? 'backdrop-blur-[40px] grayscale	opacity-100	'
          : 'backdrop-blur-[0] graysclae-0 duration-500 opacity-0'
      "
      class="pointer-events-none bg-gray-900/20 fixed w-[200vw] h-[200vh] -top-[0] -left-[0] z-[50]"
    ></div>
    <!-- text -->
    <EyeStart />
    <Text />
    <Illustration />
    <Comment v-if="commentStore.activeCom" />

    <div
      class="fixed z-40 bottom-2 flex justify-end w-full"
      :class="store.imgActive ? 'opacity-0' : ''"
    >
      <ActionButton :text="'Clear'" @action="storeText.clearTextMarking()" />
      <ActionButton :text="'Export'" @action="storeText.saveLocalstorage()" />
      <ActionButton :text="'Import'" @action="store.toggleImport()" />
    </div>
    <ExportField />
  </div>
</template>

<script>
export default { components: { Comment } };
</script>

<style scoped></style>
