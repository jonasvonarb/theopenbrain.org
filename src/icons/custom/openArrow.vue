<template>
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 21"
    class="icon"
  >
    <circle class="cls-2" cx="10.5" cy="10.5" r="10" />
    <path
      class="cls-1"
      d="m5.43,9.79h1.35v2.41l-.12,1.29.06.02,1.27-1.42,6.65-6.65.95.95-6.65,6.65-1.42,1.27.02.06,1.29-.12h2.41v1.35h-5.8v-5.8Z"
    />
  </svg>
</template>
<script>
export default {
  name: "BiArrowDownCircle",
};
</script>

<style scoped>
:root {
  --violet: rgb(151, 71, 255);
}
.icon:hover > .cls-2 {
  fill: var(--violet);
  stroke: var(--violet);
}
.icon:hover > .cls-1 {
  fill: white;
}
.cls-1 {
  fill: #010101;
}

.cls-2 {
  fill: #fff;
  stroke: #010101;
  stroke-miterlimit: 10;
}
</style>
