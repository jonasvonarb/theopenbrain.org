<template>
  <div
    class="fixed flex gap-5 justify-center items-center top-0 left-0 h-full w-full bg-black/40 backdrop-blur-md z-[61] p-6 pb-10 mt-0 ml-0 text-white"
  >
    <div class="flex h-1/2 justify-center items-start ml-8 gap-8">
      <div class="w-[40vw] text-white">
        <p class="pb-2 font-semibold">This is the Text you marked:</p>
        <p>
          <mark class="text-white comment">"{{ markierung }}"</mark>
        </p>
      </div>
      <div class="h-full flex flex-col w-[40vw]">
        <p class="pb-2 font-semibold">Enter your note here:</p>

        <form class="w-full h-full text-black pt-2">
          <textarea
            ref="comment"
            class="bg-lighter"
            :value="commentInStore"
            @input="(event) => storeCom.updateCom(comment.value, event)"
          />
        </form>
      </div>
      <p
        class="h-8 w-8 mt-4 text-white hover:blur-xs z-[49] cursor-pointer duration-300"
        @click="storeCom.closeCommentSection()"
      >
        <BiPlusCircleFill
          v-if="!storeCom.comments[storeCom.activeCom]?.length"
          class="w-full h-full rotate-45"
        />
        <BiCheckCircle v-else class="w-full h-full" />
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const comment = ref(null);
</script>

<script>
import { useCom } from "@/stores/comments";
import BiCheckCircle from "../../../icons/BiCheckCircle.vue";
import BiPlusCircleFill from "../../../icons/BiPlusCircleFill.vue";
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
  components: { BiCheckCircle, BiPlusCircleFill },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 0;
  border-radius: 0rem;
  font-size: 16px;
  resize: none;
  --tw-bg-opacity: 1;
}

textarea:focus {
  border: none;
  outline: none;
}
</style>
