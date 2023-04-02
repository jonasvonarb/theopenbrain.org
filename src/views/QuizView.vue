<template>
  <div
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen"
  >
    <div class="border-l border-black h-screen fixed left-1/2" />
    <template v-for="(question, index) in quiz" :key="index + '-question'">
      <Question
        class="duration-500"
        :class="[
          route.query.q > index + 1 && '-translate-y-[100vh]',
          route.query.q === index + 1 && '-translate-y-[0]',
          route.query.q < index + 1 && 'translate-y-[100vh]',
        ]"
        :question="question"
        :num="index + 1"
        :quizLength="quiz.length"
      />
    </template>
    <div class="fixed top-6 left-12">
      <span class="font-bold"> The Retina Quiz </span>
      | Q - {{ route.query.q }} / {{ quiz.length }}
    </div>
    <div class="fixed bottom-6 left-12">
      This Question links to
      <RouterLink
        class="hover:opacity-50 underline cursor-pointer"
        :to="{ path: '/chapter', query: { s: quiz[route.query.q - 1]?.s } }"
        >Section {{ quiz[route.query.q - 1]?.s }}</RouterLink
      >
    </div>
    <button class="fixed top-6 right-12" @click="router.go(-1)">
      <PlusIcon class="icon rotate-45" />
    </button>
  </div>
</template>

<script setup>
import PlusIcon from "../icons/custom/PlusIcon.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Question from "../components/quiz/Question.vue";

import quiz from "@/assets/json_backend/quiz.json";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (!route.query.q) {
    router.replace({ path: "/quiz", query: { q: 1 } });
  }
});
</script>

<style scoped></style>
