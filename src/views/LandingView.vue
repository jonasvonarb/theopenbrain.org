<script setup></script>

<template>
  <main class="fixed top-0 left-0 w-screen h-screen">
    <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <div
        class="fixed bg-blue-800 w-full h-full flex justify-center items-center text-bigest font-bold"
      >
        <div class="color uppercase text-center">
          The <br />
          Open<br />
          Brain
          <div class="text-white text-xl">Enter &#x2192;</div>
        </div>
      </div>
      <div class="video-background mix-blend-overlay">
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

<script>
export default {
  data() {
    return {
      data: null,
      database: null,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.video-background {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
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
  color: rgb(245, 177, 3);
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
