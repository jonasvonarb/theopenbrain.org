<template>
  <main class="bg-violett fixed top-0 left-0 w-screen h-screen">
    <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <div
        class="fixed h-full w-full flex justify-center items-center text-bigest font-bold"
      >
        <div
          v-show="!store.activeMenu"
          class="color uppercase text-center duration-500"
        >
          The <br />
          Open<br />
          Brain
          <div class="text-white text-xl mt-12">
            <span
              @click="enter()"
              class="bg-violett border-2 border-white rounded-full hover:bg-white text-white hover:text-black cursor-pointer px-6"
            >
              Enter &#x2192;
            </span>
          </div>
        </div>
      </div>
      <div class="video-background mix-blend-overlay pointer-events-none">
        <iframe
          class="pointer-event-none"
          src="https://player.vimeo.com/video/594238871?background=1&controls=0"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useGeneral } from "@/stores/index";
const store = useGeneral();

const enter = () => {
  store.activeMenu = !store.activeMenu;
};
</script>

<style scoped>
.video-background {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/images/1287468234rqwifhucsaud.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.video-background iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
}
.color {
  color: #9747ff;
}

@media (min-aspect-ratio: 16/9) {
  .video-background iframe {
    /* height = 100 * (9 / 16) = 56.25 */
    height: 56.25vw;
  }
}
@media (max-aspect-ratio: 16/9) {
  .video-background iframe {
    /* width = 100 / (9 / 16) = 177.777777 */
    width: 177.78vh;
  }
}
</style>
