<template>
  <div
    class="absolute flex flex-col justify-center border-black border-4 p-12 rounded-3xl"
  >
    <label class="pb-12">{{ question.q }}?</label>
    <fieldset ref="formElemnt" class="radio flex flex-col">
      <label
        v-for="(a, index) in question.a"
        :for="a + '-' + num"
        :key="a + '-' + num"
        :class="index === question.c && 'isTrue'"
        ref="input"
      >
        <input
          type="radio"
          :id="a + '-' + num"
          :name="'question-' + num"
          :value="a"
          @change="changeHandler"
          :class="index === question.c && 'isTrue'"
        />
        <span>{{ a }}</span>
      </label>
    </fieldset>
    <div
      :class="!active && 'opacity-20 pointer-events-none'"
      class="border border-black w-32 text-center cursor-pointer mt-12 uppercase hover:bg-violet hover:text-white"
      @click="next"
    >
      next
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";

const props = defineProps({
  question: Object,
  num: Number,
});

const active = ref(false);

const changeHandler = (ev) => {
  console.log();
  active.value = ev.target.classList.contains("isTrue");
};

const emits = defineEmits(["next"]);
const next = () => {
  emits("next");
};
</script>

<style scoped>
.radio {
  flex-shrink: 0;
  flex-grow: 1;
  resize: none;
}
.radio {
  padding: 0;
}

/* radio */
.radio input {
  display: none;
}

.radio label {
  white-space: nowrap;
  padding-right: 1em;
  cursor: pointer;
}

.radio label span {
  position: relative;
}
.radio label span:before,
.radio label span:after {
  content: "";
}

.radio label span:before {
  border: 1px solid #222021;
  width: 1em;
  height: 1em;
  margin-right: 10px;
  display: inline-block;
  /* vertical-align: top; */
}

.radio label span:after {
  background: red;
  width: 1em;
  height: calc(1em + 1px);
  position: absolute;
  top: 0px;
  left: 0px;
  transition: 300ms;
  opacity: 0;
}
.radio label input:checked + span {
  color: red;
}

.radio label.isTrue input:checked + span {
  color: green;
}

.radio label.isTrue span:after {
  background: green;
}

.radio label input:checked + span:after {
  opacity: 1;
}
</style>
