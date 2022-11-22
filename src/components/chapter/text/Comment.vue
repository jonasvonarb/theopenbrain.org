<template>
  <div
    class="fixed flex gap-5 justify-center items-center top-0 left-0 h-full w-full bg-black/80 z-50 p-6 pb-10 mt-0 ml-0 text-white"
  >
    <div class="bg-blue h-1/2 w-[40vw] pt-2 p-5 bg-white text-black rounded-lg">
      <p class="pb-2">This is the Text you marked:</p>

      <p>
        <mark>{{ markierung }}</mark>
      </p>
    </div>
    <div class="h-1/2 w-[40vw] pt-2 p-5 bg-red-300 rounded-lg">
      <p class="pb-2 h-12">Enter your comment here:</p>
      <p
        @click="storeCom.closeCommentSection()"
        class="absolute top-8 right-12"
      >
        X
      </p>
      <form class="w-full text-black">
        <textarea
          class="bg-white"
          ref="comment"
          :value="commentInStore"
          @keypress="storeCom.updateCom(comment.value)"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const comment = ref(null);
</script>

<script>
import { useCom } from "@/stores/comments";
const storeCom = useCom();

export default {
  computed: {
    commentInStore() {
      return storeCom.getCom();
    },
    markierung() {
      return document.getElementById("highlight-" + storeCom.activeCom)
        .innerText;
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 0;
  border-radius: 0.5rem;
  font-size: 16px;
  resize: none;
  --tw-bg-opacity: 1;
}
</style>
