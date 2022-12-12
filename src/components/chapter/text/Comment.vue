<template>
  <div
    class="fixed flex flex-col gap-5 justify-center items-center top-0 left-0 h-full w-full bg-black/80 z-[60] p-6 pb-10 mt-0 ml-0 text-white"
  >
    <div class="bg-blue w-[40vw] pt-2 p-5 bg-white text-black rounded-lg">
      <p class="pb-2">This is the Text you marked:</p>

      <p>
        <mark>{{ markierung }}</mark>
      </p>
    </div>
    <div class="h-1/2 flex flex-col w-[40vw] pt-2 p-5 bg-violet-500 rounded-lg">
      <p class="pb-2 h-12">Enter your comment here:</p>
      <p
        @click="storeCom.closeCommentSection()"
        class="absolute cursor-pointer top-6 right-12 h-16 w-16 bg-white text-black text-xl rounded-full flex justify-center items-center"
      >
        X
      </p>
      <form class="w-full h-full text-black">
        <textarea
          class="bg-white"
          ref="comment"
          :value="commentInStore"
          @input="(event) => storeCom.updateCom(comment.value, event)"
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
