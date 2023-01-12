<script setup>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ref, onMounted, defineProps, nextTick } from "vue";
import { useGeneral } from "@/stores";

gsap.registerPlugin(ScrollTrigger);

const trigger = ref(null);
const video = ref(null);
const videoPlayState = ref(false);
const store = useGeneral();

const props = defineProps({
  title: String,
});

// onMounted(() => {
//   var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
//   let optionsLazy = {
//     rootMargin: "0px",
//     threshold: 0.0001,
//   };

//   if ("IntersectionObserver" in window) {
//     var lazyVideoObserver = new IntersectionObserver(function (entries) {
//       entries.forEach(function (video) {
//         if (video.isIntersecting) {
//           for (var source in video.target.children) {
//             var videoSource = video.target.children[source];
//             if (
//               typeof videoSource.tagName === "string" &&
//               videoSource.tagName === "SOURCE"
//             ) {
//               videoSource.src = videoSource.dataset.src;
//             }
//           }

//           video.target.load();
//           video.target.classList.remove("lazy");
//           lazyVideoObserver.unobserve(video.target);
//         }
//       });
//     }, optionsLazy);

//     lazyVideos.forEach(function (lazyVideo) {
//       lazyVideoObserver.observe(lazyVideo);
//     });
//   }

//   let options = {
//     rootMargin: "0%",
//     threshold: 0.8,
//   };
//   let callback = (entries) => {
//     entries.forEach((entry) => {
//       videoPlayState.value = entry.isIntersecting;
//     });
//   };

//   let observer = new IntersectionObserver(callback, options);
//   observer.observe(video.value);
// });
</script>

<template>
  <div>
    <div
      class="w-screen h-[50vh] flex justify-center items-center -translate-x-1/2 -ml-28 p-52 my-24 text-small"
    >
      <div
        class="w-full h-full flex flex-col justify-center items-center bg-light border border-dark"
      >
        <span
          class="text-white text-base block duration-500 w-1/2 max-w-[780px] text-center pb-6"
        >
          {{ title }}
        </span>
        <button
          class="px-6 py-1 bg-white text-black border border-black rounded-xl hover:bg-light hover:text-white hover:border-black"
        >
          <RouterLink to="chapter/break/file_example_MP4_1920_18MG">
            Break-Video
          </RouterLink>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.z-60 {
  z-index: 60;
}
</style>
