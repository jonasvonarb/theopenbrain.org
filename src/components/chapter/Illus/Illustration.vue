<template>
  <div class="fixed top-0 left-0 h-screen w-[45vw] px-5 z-20">
    <div id="animationWindowDouble" class="w-full h-full" />
  </div>
</template>

<script setup>
import lottie from "lottie-web";
import { onMounted } from "vue";

onMounted(() => {
  const animActive = true;
  var svgContainer = document.getElementById("animationWindowDouble");
  var animation = lottie.loadAnimation({
    speed: 3,
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    autoplay: true,
    path: "/assets/lottietest-2-jva.json",
  });
  animation.setSubframe(false);
  animation.setSpeed(1);

  animation.play();

  var frameRate = 30;
  var frameTotal = animation.totalFrames;
  var scetionLength = frameRate * 10;
  var overlayLength = frameRate * 5;

  var sections = document.getElementsByTagName("section");
  // for (var i = 0; i < sections.length; i++) {
  //   ScrollTrigger.create({
  //     trigger: sections[i],
  //     start: "top 100%",
  //     end: "top 60%",
  //     srub: 0.2,
  //     markers: false,
  //     onToggle: (self) => {
  //       var num = self.trigger.dataset.nummer * 40;
  //     },
  //     onUpdate: (self) => {
  //       animation.setSpeed(self.direction);
  //       var num = self.trigger.dataset.nummer;
  //       var range = this.mapRange(
  //         self.progress,
  //         0,
  //         1,
  //         scetionLength * (num - 1),
  //         scetionLength * (num - 1) + overlayLength * (num - 1)
  //       );
  //       animation.goToAndStop(+range.toFixed(0), true);
  //     },
  //   });
  // }
  console.log(animation);
});
</script>

<style scoped></style>
