<script setup>
import { useGeneral } from "@/stores";
import { useRouter } from "vue-router";
const store = useGeneral();
const router = useRouter();
</script>

<template>
  <div class="about bg-white w-screen h-screen overflow-hidden flex">
    <h1
      class="fixed top-6 left-0 w-screen text-center flex justify-start px-7"
    ></h1>
    <h1
      class="fixed top-6 left-1/2 w-screen text-center flex justify-start px-7"
    >
      <div
        class="bg-white top-2 rounded-xl border border-black ml-8 px-2 py-3 font-bold"
      >
        The Website
      </div>
    </h1>
    <div class="w-full h-full text-left flex justify-center">
      <div class="w-1/2 h-full p-20 pr-24 pt-44 overflow-scroll P"></div>
      <div
        class="w-1/2 h-full p-20 pr-24 pt-44 border-l border-black overflow-scroll P"
      >
        <div class="max-w-[600px]">
          <h2>The Project</h2>
          <p>
            theopenbrain.org is an Open Access neuroscience textbook. While we
            currently only have one chapter online, we are actively seeking
            funding in order to expand the book with many more chapters covering
            the breadth of neuroscience topics. Stay tuned for more!
          </p>
          <h2>The Website</h2>
          <ul>
            <li>
              <a href="http://www.trenholmlab.com/">Editor: Stuart Trenholm</a>
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

          <h2>Colophon</h2>
          <p>
            The present copy of the Psalms, adorned with beauty of capital
            letters and sufficiently picked out with rubrics, has thus been
            fashioned by an ingenious method of printing and stamping without
            any driving of the pen, and to the worship of God has been
            diligently completed by Johannes Fust, citizen of Mainz, and Peter
            Schoeffer of Gernsheym, in the year of the Lord 1457 on the Vigil of
            the Assumption [i.e., August 14].
          </p>
          <h2>Imprint</h2>
          <ul>
            <h3>The imprint (Contact Page) should always contain:</h3>
            <li>Business name</li>
            <li>Business address</li>
            <li>Email address</li>
            <li>Phone number</li>
          </ul>
          <ul>
            <h3>
              The name of your supervising authority, if your business requires
              a licence
            </h3>
            <li>Your license numbers or trade registry numbers</li>
            <li>
              In the case of a legal person (corporate entity), you should state
              the legal form (full legal corporate name) and the authorised
              representative(s) of the business
            </li>
            <li>Your VAT number</li>
            <li>
              Your company registration number (or equivalent state-issued
              number)
            </li>
            <li>The professional bodies of which you are a member</li>
            <li>The names of the company’s directors</li>
          </ul>
          <h2>Licence</h2>
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
            appropriate credit to the original author(s) and the source, provide
            a link to the Creative Commons license, and indicate if changes were
            made. Funding: theopenbrain.org is funded by the
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h2,
h3 {
  font-weight: bold;
}
h2,
p {
  padding-bottom: 2rem;
}

h3,
ul {
  padding-bottom: 1rem;
}
li {
  list-style: circle inside;
}
</style>
