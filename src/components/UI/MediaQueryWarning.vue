<template>
  <div class="w-screen h-screen text-center bg-img bg-cover bg-opacity-50">
    <div
      class="fixed flex flex-col top-0 left-0 pt-0 text-white text-base bg-black h-full w-full justify-center items-center overflow-scroll"
    >
      <div class="bg-img h-12 w-full"></div>
      <div class="w-[400px] max-w-full px-6">
        <h3>
          <em>The Open Brain</em>
          is an interactive, open access neuroscience learning tool (i.e. it’s
          the natural evolution of a textbook).
        </h3>
        <p class="pb-6 text-base !noHyphens">
          Our first chapter is officially online! We are now fundraising in
          order to produce an entire ‘textbook’ worth of materal.
        </p>
        <p class="pb-6 text-base !noHyphens">
          This current chapter, while completely functional, is only a prototype
          and not yet accessible on mobile screens. For the best user experience
          at this stage, we invite you to visit our site using a desktop Chrome
          browser and to set your browser screen size width to a minimum of
          1320px.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.noHyphens {
  hyphens: none;
}
.bg-img {
  background-color: black;
  background-image: url("/publicAssets/images/animationEye.gif");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 300%;
}
</style>
