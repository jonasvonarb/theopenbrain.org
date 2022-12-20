<template>
  <div
    v-show="store.activeImportMenu"
    id="backgImport"
    class="fixed flex gap-5 justify-center items-center top-0 left-0 h-full w-full bg-black/80 z-50 p-6 pb-10 mt-0 ml-0 text-white"
    @click="handleClick()"
  >
    <div class="bg-blue h-1/2 w-[40vw] pt-2 p-5 bg-white text-black rounded-lg">
      <p>
        <label>
          Choose a file to upload
          <input ref="input" type="file" single />
        </label>
        <br />
        <button @click="submitFile()">Submit</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useText, useGeneral } from "@/stores";

const storeText = useText();
const store = useGeneral();

const input = ref(null);
const content = ref(null);
const submitFile = () => {
  const reader = new FileReader();
  reader.readAsText(input.value.files[0]);
  reader.onload = (res) => {
    content.value = res.target.result;
    storeText.importLocalstorage(content.value);
  };
};
const handleClick = () => {
  if (event.target.id != "backgImport") return;
  store.toggleImport();
};
</script>

<style lang="scss" scoped></style>
