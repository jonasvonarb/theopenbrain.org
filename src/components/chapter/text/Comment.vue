<template>
  <div
    class="fixed top-0 left-0 h-1/2 w-[40vw] bg-gray-700 z-50 p-4 pb-0 mt-12 ml-5 text-white rounded-lg"
  >
    <p class="pb-2">Enter your comment here for:</p>
    <p @click="storeCom.closeCommentSection()" class="absolute top-4 right-5">
      X
    </p>
    <form class="h-[90%] w-full text-black">
      <textarea
        ref="comment"
        :value="commentinStore"
        @keypress="storeCom.updateCom(comment.value)"
      />
    </form>
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
    commentinStore() {
      return storeCom.getCom();
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
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
</style>
