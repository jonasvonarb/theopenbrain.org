import { defineStore } from "pinia";
import text from "@/assets/text/textHTML.md?raw";

export const useGeneral = defineStore("main", {
  state: () => ({ activeMenu: false, activeSidebar: false, count: 0 }),
  getters: {
    getactiveMenu: (state) => state.activeMenu,
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    unSetMenu() {
      this.activeMenu = false;
    },
    toggle(_target) {
      this[_target] = !this[_target];
    },
  },
});

export const useText = defineStore("text", {
  state: () => ({ text: text }),
  getters: {},
  actions: {},
});

export const useAnimation = defineStore("animation", {
  state: () => ({ hoverActive: null }),
  getters: {},
  actions: {
    enterHoverPunkt(id) {
      this.hoverActive = id;
      document.getElementById(id).classList.add("hoverActive");
      document.getElementById("punkt-" + id).classList.add("hoverActive");
    },
    leaveHoverPunkt(id) {
      this.hoverActive = null;
      document.getElementById(id).classList.remove("hoverActive");
      document.getElementById("punkt-" + id).classList.remove("hoverActive");
    },
  },
});
