import { defineStore } from "pinia";

export const useCom = defineStore("comments", {
  state: () => ({
    comments: localStorage.comments ? JSON.parse(localStorage.comments) : {},
    commentsId: [],
    activeCom: null,
  }),
  getters: {},
  actions: {
    closeCommentSection() {
      this.activeCom = null;
    },
    openCommentSection(id) {
      this.activeCom = id;
      if (this.comments[id]) return;
      this.comments[id] = "";
    },
    getCom() {
      return this.comments[this.activeCom];
    },
    allCom() {
      return this.comments;
    },
    updateCom(input, event) {
      if (input.length !== 0) {
        this.comments[this.activeCom] = input;
      } else {
        if (!this.comments[this.activeCom]) return;
        delete this.comments[this.activeCom];
      }
      localStorage.setItem("comments", JSON.stringify(this.comments));
    },
  },
});
