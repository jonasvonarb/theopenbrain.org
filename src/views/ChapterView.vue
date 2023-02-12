<script setup>
import Text from "@/components/chapter/TextComp.vue";
import ExportField from "@/components/chapter/ExportField.vue";
import Illustration from "@/components/chapter/Illus/IllustrationsComp.vue";
import EyeStart from "@/components/chapter/text/EyeStart.vue";

import { useGeneral, useText, useCom } from "@/stores";
import ActionButton from "../components/UI/ActionButton.vue";
import Comment from "../components/chapter/text/CommentComp.vue";
import FootNotesWindow from "../components/chapter/text/FootNotesWindow.vue";
import MenuTutorial from "../components/Navigation/MenuTutorial.vue";

const store = useGeneral();
const storeText = useText();
const commentStore = useCom();
</script>

<template>
  <div>
    <div
      :class="
        store.isScrolling
          ? 'backdrop-blur-[0] grayscale	opacity-100'
          : 'backdrop-blur-[0] graysclae-0 duration-300 opacity-0'
      "
      class="pointer-events-none bg-gray-900/20 fixed w-[200vw] h-[200vh] -top-[0] -left-[0] z-[50] duration-Fix"
    ></div>
    <!-- text -->
    <Illustration />
    <EyeStart />
    <Text />
    <FootNotesWindow  />
    <Comment v-if="commentStore.activeCom" />

    <div
      class="fixed z-40 bottom-4 right-6 flex gap-2 justify-end items-end w-full"
      :class="store.imgActive ? 'opacity-0' : ''"
    >
      <MenuTutorial />
      <ActionButton
        :text="'Clear'"
        :help="helpClear"
        @action="storeText.clearTextMarking()"
      />
      <ActionButton
        :text="'Export'"
        :help="helpExport"
        @action="storeText.saveLocalstorage()"
      />
      <ActionButton
        :text="'Import'"
        :help="helpImport"
        @action="store.toggleImport()"
      />
    </div>
    <ExportField />
  </div>
</template>

<script>
export default { components: { Comment, FootNotesWindow, MenuTutorial } };
const helpClear =
  "Clear will <strong>delete all</strong> your personal markings and comments. If you did not export them befor they will be gone.";
const helpExport =
  "Export will export the whole text, with your comments and markings from your local storage as a json-file. This can be then be imported on to an other computer or an other browser.";
const helpImport =
  "Here you can import a previously exported json-file. This will <strong>delete all</strong> your personal markings and comments currently in your local storage.";
</script>

<style scoped>
.duration-Fix {
  transition: all 0s !important;
  transition-delay: 0;
}
</style>
