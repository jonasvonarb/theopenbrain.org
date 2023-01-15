<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGeneral } from "@/stores";
import BiArrowLeftCircle from "@/icons/BiArrowLeftCircle.vue";
import BiInfoCircleFill from "../../icons/BiInfoCircleFill.vue";

const route = useRoute();
const router = useRouter();
const store = useGeneral();

const openAbout = () => {
  store.activeMenu = false;
  store.activeAbout = true;
};
</script>

<template>
  <div
    class="fixed flex bottom-4 z-[60] text-base duration-500"
    :class="
      route.name === 'about' || store.activeAbout
        ? 'left-6'
        : route.name === 'home'
        ? store.activeMenu
          ? 'left-6'
          : 'left-6'
        : 'left-20'
    "
  >
    <!-- menu open/close -->
    <BiInfoCircleFill
      v-if="!store.activeAbout"
      @click="openAbout()"
      class="h-10 w-10 text-dark hover:blur-xs z-[60]"
    />
    <BiArrowLeftCircle
      class="h-10 w-10 text-dark hover:blur-xs z-[60]"
      v-else
      @click="store.activeAbout = false"
    />
    <div
      class="fixed h-screen overflow-y-scroll overflow-x-hidden bg-white scrollbar top-0 left-0 text-baseMono font-mono duration-500 border-r border-black snap-x"
      :class="[store.activeAbout ? 'w-[35vw] bg-white ml-0' : 'w-[0] bg-white']"
    >
      <div class="pl-28 pr-28 pb-56 w-[35vw]">
        <div class="text-small">
          <h3>The Project</h3>
          <p>
            theopenbrain.org is an Open Access neuroscience textbook. While we
            currently only have one chapter online, we are actively seeking
            funding in order to expand the book with many more chapters covering
            the breadth of neuroscience topics. Stay tuned for more!
          </p>
          <section>
            <h4>The Website</h4>
            <ul>
              <li>
                <a href="http://www.trenholmlab.com/"
                  >Editor: Stuart Trenholm</a
                >
              </li>
              <li>
                <a href="https://malpeso.info/" target="_blank"
                  >Art Direction: Sonia Malpeso</a
                >
              </li>
              <li>
                <a href="https://timorick.ch/" target="_blank"
                  >Animation and 3D Design: Timo Rick</a
                >
              </li>
              <li>
                <a href="https://jonasvonarb.ch/" target="_blank"
                  >Coding and Web Design: Jonas von Arb</a
                >
              </li>
            </ul>
          </section>
          <section>
            <h4>Colophon</h4>
            <p>
              The present copy of the Psalms, adorned with beauty of capital
              letters and sufficiently picked out with rubrics, has thus been
              fashioned by an ingenious method of printing and stamping without
              any driving of the pen, and to the worship of God has been
              diligently completed by Johannes Fust, citizen of Mainz, and Peter
              Schoeffer of Gernsheym, in the year of the Lord 1457 on the Vigil
              of the Assumption [i.e., August 14].
            </p>
          </section>
          <section>
            <h4>Imprint</h4>
            <ul>
              <li>Business name</li>
              <li>Business address</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>
                The name of your supervising authority, if your business
                requires a licence
              </li>
              <li>Your license numbers or trade registry numbers</li>
              <li>
                In the case of a legal person (corporate entity), you should
                state the legal form (full legal corporate name) and the
                authorised representative(s) of the business
              </li>
              <li>Your VAT number</li>
              <li>
                Your company registration number (or equivalent state-issued
                number)
              </li>
              <li>The professional bodies of which you are a member</li>
              <li>The names of the company’s directors</li>
            </ul>
          </section>
          <section>
            <h4>Licence</h4>
            <p>
              Open Access: theopenbrain.org is licensed under a
              <a
                target="_blank"
                href="http://creativecommons.org/licenses/by/4.0/"
              >
                Creative Commons Attribution 4.0 International License
              </a>
              , which permits use, sharing, adaptation, distribution and
              reproduction in any medium or format, as long as you give
              appropriate credit to the original author(s) and the source,
              provide a link to the Creative Commons license, and indicate if
              changes were made. Funding: theopenbrain.org is funded by the
              <a
                target="_blank"
                href="https://www.mcgill.ca/neuro/open-science/tanenbaum-open-science-institute-tosi"
              >
                Tanenbaum Open Science Institute
              </a>

              which is based at the
              <a target="_blank" href="https://www.mcgill.ca/neuro/">
                Montreal Neurological Institute
              </a>
              which is part of
              <a target="_blank" href="https://www.mcgill.ca/">
                McGill University </a
              >.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listItem {
  display: block;
}
p {
  padding-bottom: 0;
}

li {
  padding-bottom: 1rem;
}

.proper {
  transition-property: heigh width;
}
.widthAbout {
  width: calc(100vw - 2 * 1.9rem);
}
section {
  padding-top: 4rem;
  min-height: unset;
  padding-bottom: unset;
}
h4 {
  padding-bottom: 2rem;
}
</style>
