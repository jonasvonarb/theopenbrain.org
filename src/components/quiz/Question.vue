<template>
  <div class="absolute flex flex-row justify-center gap-12 w-full">
    <div
      class="flex flex-row justify-center border-black p-12 rounded-3xl w-full gap-32"
    >
      <div class="w-1/2 h-1/2 max-w-[800px]">
        <label class="pb-12 w-1/2 tex-left font-bold" v-html="question.q" />
        <div v-if="question.img">
          <img
            loading="lazy"
            class="w-full max-h-[400px] max-w-[700px] pt-12 object-contain object-left"
            :src="`/publicAssets/images/quiz/${question.img}.png`"
          />
        </div>
      </div>
      <div class="w-1/2 max-w-[800px]">
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
            <span class="hover:opacity-50 cursor-pointer">{{ a }}</span>
          </label>
        </fieldset>
        <div class="flex gap-4">
          <div
            v-if="props.num !== 1"
            class="border border-black w-32 text-center cursor-pointer mt-12 uppercase hover:bg-primaryMed hover:text-white"
            @click="prev"
          >
            back
          </div>
          <div
            :class="!active && 'opacity-20 pointer-events-none'"
            class="border border-black w-32 text-center cursor-pointer mt-12 uppercase hover:bg-primaryMed hover:text-white"
            @click="next"
          >
            next
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  question: Object,
  num: Number,
  quizLength: Number,
});

const active = ref(false);

const changeHandler = (ev) => {
  active.value = ev.target.classList.contains("isTrue");
};

const next = () => {
  if (props.num >= props.quizLength) {
    router.replace({ path: "/quiz", query: { q: 1 } });
  } else {
    router.replace({ path: "/quiz", query: { q: props.num + 1 } });
  }
};

const prev = () => {
  router.replace({ path: "/quiz", query: { q: props.num - 1 } });
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
  white-space: break-spaces;
  padding-right: 1em;
  cursor: pointer;
}

.radio label span {
  position: relative;
  display: inline-block;
  /* margin-left: -32px; */
  padding-left: 32px;
}
.radio label span:before,
.radio label span:after {
  content: "";
}

.radio label span:before {
  border: 1px solid #222021;
  width: 1em;
  height: 1em;
  top: 5px;
  left: 0px;
  margin-right: 10px;
  display: inline-block;
  position: absolute;
  border-radius: 200px;
  /* vertical-align: top; */
}

.radio label span:after {
  background: #8f9e9d;
  width: calc(1em + 2px);
  height: calc(1em + 2px);
  position: absolute;
  top: calc(5px - 1px);
  left: -1px;
  transition: 300ms;
  opacity: 0;
  border-radius: 200px;
}
.radio label input:checked + span {
  color: #8f9e9d;
}

.radio label.isTrue input:checked + span {
  color: #00d9b8;
}

.radio label.isTrue span:after {
  background: #00d9b8;
}

.radio label input:checked + span:after {
  opacity: 1;
}
</style>
