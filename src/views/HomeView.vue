<template>
  <main class="fixed top-0 left-0 w-screen h-screen">
    <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <div
        v-show="!store.activeMenu"
        class="fixed h-full w-full flex justify-center items-center text-bigest font-semibold"
      >
        <div class="color uppercase text-center duration-300">
          The <br />
          Open<br />
          Brain
        </div>
        <div
          class="text-white hover:text-violet text-center text-xl mt-12 fixed bottom-12 cursor-pointer"
        >
          <BiArrowRightCircleFill @click="enter()" />
        </div>
      </div>
      <div
        :class="store.activeMenu ? 'w-[65vw]' : 'w-full'"
        class="video-background w-full absolute mix-blend-overlay pointer-events-none duration-300 right-0"
      >
        <iframe
          class="pointer-event-none"
          src="https://player.vimeo.com/video/594238871?background=1&controls=0"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useGeneral } from "@/stores/index";
import BiArrowRightCircleFill from "@/icons/BiArrowRightCircleFill.vue";


const store = useGeneral();

const enter = () => {
  store.isNextBack = false;
  store.activeMenu = !store.activeMenu;
};
</script>

<style scoped>
.video-background {
  overflow: hidden;
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
    width: 100vw;
  }
}
@media (max-aspect-ratio: 16/9) {
  .video-background iframe {
    /* width = 100 / (9 / 16) = 177.777777 */
    width: 177.78vh;
  }
}
</style>
