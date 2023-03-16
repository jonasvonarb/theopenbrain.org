<template>
  <div id="further-reading" class="py-12 p-20 w-full border-t border-black">
    <h4 class="font-semibold pb-6">Quiz</h4>
    <p>
      Here you can test your knowledge in a
      <RouterLink class="text-violet" to="/quiz">QUIZ</RouterLink>!
    </p>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
