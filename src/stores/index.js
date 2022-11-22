import { defineStore } from "pinia";

export const useGeneralStore = defineStore("main", {
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
