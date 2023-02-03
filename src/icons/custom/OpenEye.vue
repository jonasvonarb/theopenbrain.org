<template>
  <svg
    id="Layer_1"
    data-name="Layer 1"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.89 21.18"
  >
    <circle class="cls-3" cx="10.97" cy="10.64" r="10" />
    <circle class="cls-1" cx="10.97" cy="10.64" r="4.6" />
    <circle class="cls-2" cx="10.97" cy="10.64" r="2.2" />
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
