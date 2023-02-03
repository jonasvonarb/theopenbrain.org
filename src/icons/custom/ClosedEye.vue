<template>
  <svg
    id="Layer_1"
    data-name="Layer 1"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.89 21.18"
  >
    <path class="cls-2" d="m20.61,3.08c0,5.52-4.48,10-10,10S.61,8.61.61,3.08" />
    <line class="cls-1" x1=".36" y1="14.13" x2="3.81" y2="10.48" />
    <line class="cls-1" x1="17.97" y1="9.94" x2="21.53" y2="13.48" />
    <line class="cls-1" x1="11.12" y1="18.1" x2="11.12" y2="13.08" />
  </svg>
</template>
<script>
export default {
  name: "closedEye",
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
  fill: #333;
}

.cls-1,
.cls-2 {
  stroke: #fff;
  stroke-miterlimit: 10;
}

.cls-2 {
  fill: none;
}
</style>
