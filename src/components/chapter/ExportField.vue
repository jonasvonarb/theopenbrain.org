<template>
  <div
    v-show="store.activeImportMenu"
    id="backgImport"
    class="fixed flex gap-5 justify-center items-center top-0 left-0 h-full w-full bg-black/40 backdrop-blur-md z-[61] p-6 pb-10 mt-0 ml-0 text-white"
    @click="handleClick()"
  >
    <div class="w-[40vw] pt-2 p-5 text-white text-center">
      <p>
        <label for="file-upload" class="custom-file-upload inline hover:blur-xs"
          ><span class="pr-2 inline-block">Choose a file to upload </span>
          <BiUpload
            :class="!isFilled ? 'text-black' : 'bg-violet'"
            class="inline bg-white p-2 rounded-full"
          />
        </label>
        <br />
        <input
          accept=".json"
          id="file-upload"
          class="input"
          ref="input"
          type="file"
          single
          @change="fileChange"
        />
        <button
          class="hover:blur-xs"
          :class="
            !isFilled ? 'text-white/40 pointer-events-none' : 'text-white'
          "
          @click="submitFile()"
        >
          Submit
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useText, useGeneral } from "@/stores";
import BiUpload from "../../icons/BiUpload.vue";

const storeText = useText();
const store = useGeneral();
const isFilled = ref(0);

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

const fileChange = () => {
  if (input.value?.files.length === 1) {
    isFilled.value = true;
  } else {
    isFilled.value = false;
  }
};
</script>

<style scoped>
.custom-file-upload {
  display: inline;
}
input {
  all: unset;
  opacity: 0;
  height: 0;
  overflow: hidden;
  width: 0;
}
</style>
