import { defineStore } from "pinia";
import text from "@/assets/text/textHTML.md?raw";
import { saveAs } from "file-saver";
import { sectionAdder } from "../helper/sections";

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
  state: () => ({
    text: localStorage.text ? localStorage.text : text,
    source: text,
    selectionText: { selected: [] },
  }),
  getters: {},
  actions: {
    saveLocalstorage() {
      let data = this.selectionText["selected"];
      console.log(data);

      var blob = new Blob(
        [
          // localStorage.text,
          data,
        ],
        {
          type: "text/json;charset=utf-8",
        }
      );
      saveAs(blob, "static.txt");
    },
    clearTextMarking() {
      localStorage.removeItem("text");
      this.updateText(this.source);
    },
    updateText(textNew) {
      this.text = textNew;
      localStorage.setItem("text", textNew);
    },
    addSelection(selection) {
      console.log("test");
      const _selectionString = selection.toString();
      const minLength = 10;
      if (_selectionString.length <= minLength) return;
      const id = selection.baseNode.parentNode.id;
      const storedSelection = this.selectionText.selected;

      if (!storedSelection[id]) {
        storedSelection[id] = {
          id: id,
          selection: [_selectionString],
        };
      } else {
        storedSelection[id].selection.push(_selectionString);
      }

      let target = selection.anchorNode.parentElement.outerHTML,
        _Array = storedSelection[id].selection;

      let _target = target;
      let newString;

      for (var i = 0; i < _Array.length; i++) {
        let positionMark = _target.indexOf(_Array[i]);
        let lengthMark = _Array[i].length;
        newString = add(target, _Array[i], positionMark, lengthMark);
      }

      function add(init, str, index, length) {
        var result =
          init.slice(0, index) +
          "<mark>" +
          str +
          "</mark>" +
          init.slice(index + str.length, init.length);

        return result;
      }

      let posNewParagrahp = this.text.indexOf(id);
      let oldString = this.text.substr(
        posNewParagrahp - 7,
        newString.length - 13
      );
      this.selectionText["selected"] = JSON.parse(
        JSON.stringify(storedSelection)
      );

      const newText = this.text.replace(oldString, newString);

      this.updateText(newText);
    },
  },
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
