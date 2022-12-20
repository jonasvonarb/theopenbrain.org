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
    var lazyVideoObserver = new IntersectionObserver(function (entries) {
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
    }, optionsLazy);

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }

  let options = {
    rootMargin: "0%",
    threshold: 0.8,
  };
  let callback = (entries) => {
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
      class="w-screen h-[180vh] -translate-x-1/2 -ml-32 text-white my-[50vh]"
    >
      <div
        class="sticky flex top-0 left-0 h-screen w-full p-32"
        :class="videoPlayState ? 'text-white' : 'text-black'"
      >
        <div
          ref="video"
          class="border w-full text-violet p-6 bg-white border-violet"
        >
          <div
            class="w-full absolute p-56 z-50 top-0 left-0 flex h-screen justify-center items-center content-center flex-wrap duration-500"
          >
            <video
              poster="/assets/images/2_weich.png"
              class="h-full max-w-[95%] lazy"
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
          <p class="justify-left pointer-events-none w-full breakSectionTitle">
            <span class="block duration-500 w-full">
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
