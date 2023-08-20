<template>
  <div
    id="acknowledgements"
    class="py-12 p-20 w-full border-t border-black bg-bgMedLi"
  >
    <TitleIllus :title="'Acknowledgements'" class="pb-6" />
    <p class="font">
      AK and ST acknowledge support from the Canada Research Chairs program
      <a
        class="underline hover:text-primaryLi"
        href="www.chairs-chaires.gc.ca"
        target="_blank"
        >Canada Research Chairs</a
      >
      program and
      <a
        class="underline hover:text-primaryLi"
        href=" https://sloan.org/fellowships"
        target="_blank"
      >
        the Sloan Research Fellowships program.
      </a>
      We thank the
      <a
        class="underline hover:text-primaryLi"
        href="https://www.mcgill.ca/neuro/open-science/tanenbaum-open-science-institute-tosi"
        target="_blank"
        >Tanenbaum Open Science Institute (TOSI)</a
      >
      and the
      <a
        class="underline hover:text-primaryLi"
        href="https://visionnetwork.ca/"
        target="_black"
        >Vision Health Research Network</a
      >
      for financial support for the generation of the online chapter. We thank
      Gautam Awatramani for providing helpful feedback on the text. We thank Tom
      Baden, John Dowling, and Maureen and Jay Neitz for providing videos.
    </p>
  </div>
</template>
<script setup>
import TitleIllus from "../../UI/TitleIllus.vue";
</script>

<style scoped></style>
