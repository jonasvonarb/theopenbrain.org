<template>
  <div id="quiz" class="py-12 p-20 w-full border-t border-black">
    <TitleIllus title="Quiz" class="pb-6" />
    <p>
      Here you can test your knowledge in a
      <RouterLink class="text-primaryMed" to="quiz">QUIZ</RouterLink>!
    </p>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import TitleIllus from "../../UI/TitleIllus.vue";
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
