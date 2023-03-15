<template>
  <div
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen"
  >
    <template v-for="(question, index) in quiz" :key="index + '-question'">
      <Question
        class="duration-500"
        @next="nextQuestion"
        :class="[
          activeQuestion > index && '-translate-y-[100vh]',
          activeQuestion === index && '-translate-y-[0]',
          activeQuestion < index && 'translate-y-[100vh]',
        ]"
        :question="question"
        :num="index"
        :activeQuestion="activeQuestion"
      />
    </template>
    <div class="fixed top-6 left-12">
      <span class="font-bold"> The Retina Quiz </span>
      | Q - {{ activeQuestion + 1 }} / {{ quiz.length }}
    </div>
    <button class="fixed top-6 right-12" @click="router.go(-1)">
      <PlusIcon class="icon rotate-45" />
    </button>
  </div>
</template>

<script setup>
import PlusIcon from "../icons/custom/PlusIcon.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Question from "../components/quiz/Question.vue";

const router = useRouter();
const activeQuestion = ref(0);
const quiz = [
  { q: "How is a Question", a: { a: "Good", b: "Bad", c: "Nothing" }, c: "c" },
  {
    q: "Why is a Question",
    a: { a: "Because", b: "Why not", c: "Because not" },
    c: "a",
  },
  {
    q: "Question 3",
    a: { a: "Because", b: "Wy not", c: "Because not" },
    c: "a",
  },
];



const nextQuestion = () => {
  if (activeQuestion.value <= quiz.length - 2) {
    activeQuestion.value++;
  } else {
    activeQuestion.value = 0;
  }
};
</script>

<style scoped></style>
