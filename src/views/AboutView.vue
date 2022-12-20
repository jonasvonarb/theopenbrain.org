<script setup>
import { useGeneral } from "@/stores";
import { useRouter } from "vue-router";
const store = useGeneral();
const router = useRouter();
</script>

<template>
  <div
    class="about p-32 bg-white w-screen flex justify-center h-screen overflow-scroll"
  >
    <div class="w-[50vw] text-center">
      <h1 class="pb-12">The Open Brain . org</h1>
      <p>
        This Site is Designed by <br /><br />
        <a target="_blank" href="https://malpeso.info/"
          >Sonia Malpeso (Artdirection)</a
        >,<br /><br />
        <a target="_blank" href="https://timorick.ch/"
          >Timo Rick (Animation and 3D)</a
        >,<br /><br />
        <a target="_blank" href="https://jonasvonarb.ch/"
          >Jonas von Arb (Code and Webdesign)</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
