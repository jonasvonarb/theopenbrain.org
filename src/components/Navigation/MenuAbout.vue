<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGeneral } from "@/stores";
import IIcon from "@/icons/custom/IIcon.vue";
import OpenArrowIcon from "@/icons/custom/OpenArrowIcon.vue";

const route = useRoute();
const store = useGeneral();

const openAbout = () => {
  store.activeMenu = false;
  store.activeAbout = true;
};
</script>

<template>
  <div
    class="fixed flex bottom-4 z-[60] text-base duration-300"
    :class="
      route.name === 'about' || store.activeAbout
        ? 'left-4'
        : route.name === 'home'
        ? store.activeMenu
          ? 'left-6'
          : 'left-6'
        : store.activeMenu
        ? '-left-24 ml-4'
        : 'left-24'
    "
  >
    <IIcon
      v-if="!store.activeAbout"
      @click="openAbout()"
      class="icon iconInvert"
    />
    <!-- <BiExclamationCircleFill " /> -->
    <OpenArrowIcon
      class="icon iconInvert z-[60]"
      v-else
      @click="store.activeAbout = false"
    />
    <!-- menu open/close -->

    <div
      class="fixed h-screen bg-violet text-white overflow-y-scroll overflow-x-hidden scrollbar top-0 left-0 text-medium duration-300 border-r border-black snap-x"
      :class="[store.activeAbout ? 'w-[50vw] ml-0' : 'w-[0]']"
    >
      <div class="px-24 pt-12 pb-56 w-[50vw] max-w-[800px]">
        <div class="font-sans">
          <h2>About</h2>
          <section class="pb-56">
            <h3>
              <em>The Open Brain</em> is an Open Access neuroscience textbook.
            </h3>
            <p class="pb-42 text-base">
              While we currently only have one chapter online, we are actively
              seeking funding in order to expand the book with many more
              chapters covering the breadth of neuroscience topics. Stay tuned
              for more!
            </p>
          </section>
          <section>
            <h4 class="text-medium font-medium">OPEN ACCESS</h4>
            <p>
              theopenbrain.org is licensed under a reative
              <a
                class="hover:no-underline hover:italic"
                href="http://creativecommons.org/licenses/by/4.0/"
                target="_blank"
              >
                Commons Attribution 4.0 International License C,
              </a>
              which permits use, sharing, adaptation, distribution and
              reproduction in any medium or format, as long as you give
              appropriate credit to the original author(s) and the source,
              provide a link to the Creative Commons license, and indicate if
              changes were made.
            </p>
          </section>
          <section>
            <h4 class="text-medium font-medium">FUNDING</h4>
            <p>
              theopenbrain.org is funded by the
              <a
                class="hover:no-underline hover:italic"
                href="https://www.mcgill.ca/neuro/open-science/tanenbaum-open-science-institute-tosi"
                target="_blank"
              >
                Tanenbaum Open Science Institute
              </a>
              which is based at the
              <a
                class="hover:no-underline hover:italic"
                href="https://www.mcgill.ca/neuro/"
                target="_blank"
                >Montreal Neurological Institute
              </a>
              which is part of
              <a
                class="hover:no-underline hover:italic"
                href="http://www.mcgill.ca/"
                target="_blank"
                >McGill University </a
              >.
            </p>
          </section>
          <section>
            <h4 class="text-medium font-medium">CONTACT</h4>
            <p>Coming soon!</p>
          </section>
          <section>
            <h4 class="text-medium font-medium">CREDITS</h4>
            <span>
              <p>
                Editor:
                <a
                  class="hover:no-underline hover:italic"
                  href="http://www.trenholmlab.com/"
                  target="_blank"
                >
                  Stuart Trenholm
                </a>
              </p>
              <p>Chapter authors: Arjun Krishnaswamy, Stuart Trenholm</p>
              <p>Copy editor: Leah LeFort</p>
              <br />
              <p>
                Designed and developed by
                <a
                  class="hover:no-underline hover:italic"
                  href="https://malpeso.info/"
                  target="_blank"
                >
                  Malpeso.Studio
                </a>
              </p>
              <p>
                Creative Direction & Illustration:
                <a
                  class="hover:no-underline hover:italic"
                  href="https://malpeso.info/"
                  target="_blank"
                >
                  Sonia Malpeso
                </a>
              </p>
              <p>
                Development & Web Design:
                <a
                  class="hover:no-underline hover:italic"
                  href="http://www.jonasvonarb.ch/"
                  target="_blank"
                >
                  Jonas von Arb
                </a>
              </p>
              <p>
                Animation:
                <a
                  class="hover:no-underline hover:italic"
                  href="https://timorick.ch/"
                  target="_blank"
                >
                  Timo Rick
                </a>
              </p>
            </span>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: underline;
}
.listItem {
  display: block;
}

li {
  padding-bottom: 1rem;
}

.widthAbout {
  width: calc(100vw - 2 * 1.9rem);
}
section {
  display: block;
  padding-bottom: 4rem;
  min-height: unset;
}

section:first-of-type {
  display: block;
  padding-bottom: 8rem;
  min-height: unset;
}
</style>
