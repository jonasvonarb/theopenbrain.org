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

onMounted(() => {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
  let optionsLazy = {
    rootMargin: "0px",
    threshold: 0.0001,
  };

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    },
    optionsLazy);

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }

  let options = {
    rootMargin: "0%",
    threshold: 0.8,
  };
  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      videoPlayState.value = entry.isIntersecting;
    });
  };

  let observer = new IntersectionObserver(callback, options);
  observer.observe(video.value);
});
</script>

<template>
  <div>
    <div
      ref="trigger"
      class="w-screen h-[180vh] -translate-x-1/2 -ml-32 text-black my-96 py-[5vh]"
    >
      <div
        class="sticky h-screen w-full top-0"
        :class="videoPlayState ? 'text-white' : 'text-black'"
      >
        <div
          ref="video"
          class="text-white top-0 z-60 w-screen h-full opacity-0.2 bg-gray-900"
        >
          <div
            class="w-full absolute z-50 top-0 flex h-screen justify-center bg-gray-900 items-center content-center flex-wrap duration-500"
          >
            <video
              poster="/assets/images/2_weich.png"
              class="w-2/3 lazy"
              autoplay
              muted
              controls
              loop
            >
              <source
                data-src="assets/video/file_example_MP4_1920_18MG.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <p
            v-if="store.imgActive == false"
            class="absolute z-40 top-0 h-full justify-left z-60 duration-500 pointer-events-none w-full left-0"
          >
            <span
              class="text-center block m-auto duration-500 w-1/2 text-white"
            >
              {{ title }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.z-60 {
  z-index: 60;
}
</style>
