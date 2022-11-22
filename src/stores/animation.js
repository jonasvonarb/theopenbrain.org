import { defineStore } from "pinia";

export const useAnimation = defineStore("animation", {
  state: () => ({ hoverActive: null }),
  getters: {},
  actions: {
    enterHoverPoint(id) {
      this.hoverActive = id;
      document.getElementById("highlight-" + id).classList.add("hoverActive");
      document.getElementById("point-" + id).classList.add("hoverActive");
    },
    leaveHoverPoint(id) {
      this.hoverActive = null;
      document
        .getElementById("highlight-" + id)
        .classList.remove("hoverActive");
      document.getElementById("point-" + id).classList.remove("hoverActive");
    },
    enterHoverAnimation(id) {
      this.hoverActive = id;
      document.getElementById(id).classList.add("hoverActive");
      document.getElementById("punkt-" + id).classList.add("hoverActive");
    },
    leaveHoverAnimation(id) {
      this.hoverActive = null;
      document.getElementById(id).classList.remove("hoverActive");
      document.getElementById("punkt-" + id).classList.remove("hoverActive");
    },
  },
});
