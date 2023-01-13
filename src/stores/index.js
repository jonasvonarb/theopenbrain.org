import { defineStore } from "pinia";
import jsonText from "@/assets/text/text.json";
import { saveAs } from "file-saver";
import { useAnimation } from "./animation";
import { useCom } from "./comments";

export { useAnimation, useCom };

export const useGeneral = defineStore("main", {
  state: () => ({
    activeMenu: false,
    activeAbout: false,
    superScriptActive: false,
    animationActive: false,
    isTop: true,
    startIsActive: true,
    autoScrolling: false,
    activeMenuIndex: null,
    activeSidebar: false,
    activeImportMenu: false,
    count: 0,
    imgActive: false,
    currentSubChapter: null,
    progress: 0,
    isScrolling: false,
    isNextBack: false,
    savedPosition: undefined,
  }),
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
    toggleImport() {
      this.activeImportMenu = !this.activeImportMenu;
    },
    changeMenuIndex(index) {
      if (this.activeMenuIndex === index) {
        this.activeMenuIndex = null;
      } else {
        this.activeMenuIndex = index;
      }
    },
    toggle(_target) {
      this[_target] = !this[_target];
    },
  },
});

export const useText = defineStore("text", {
  state: () => ({
    text: localStorage.sections ? JSON.parse(localStorage.sections) : jsonText,
    source: jsonText,
    selectionIds: localStorage.selection
      ? JSON.parse(localStorage.selection)
      : [],
    currentId: null,
  }),

  getters: {},
  actions: {
    saveLocalstorage() {
      let data = {
        selection: JSON.parse(localStorage.selection),
        sections: JSON.parse(localStorage.sections),
        comments: JSON.parse(localStorage.comments),
      };
      var blob = new Blob([JSON.stringify(data)], {
        type: "text/json;charset=utf-8",
      });
      var currentdate = new Date();
      var date =
        currentdate.getFullYear() +
        "" +
        currentdate.getMonth() +
        "" +
        currentdate.getDate();
      let time =
        ("0" + currentdate.getHours()).slice(-2) +
        "" +
        ("0" + currentdate.getMinutes()).slice(-2) +
        "" +
        ("0" + currentdate.getSeconds()).slice(-2);

      saveAs(blob, date + "_" + time + "_theOpenBrainOrg_markedText.json");
    },
    importLocalstorage(newCont) {
      const _newCont = JSON.parse(newCont);
      localStorage.setItem("selection", JSON.stringify(_newCont.selection));
      localStorage.setItem("sections", JSON.stringify(_newCont.sections));
      localStorage.setItem("comments", JSON.stringify(_newCont.comments));
      this.router.go();
    },
    clearTextMarking() {
      localStorage.setItem("sections", JSON.stringify(this.source));
      localStorage.setItem("comments", JSON.stringify({}));
      var localSource = localStorage.getItem("sections");
      this.updateText("sections", JSON.parse(localSource).sections);
      localStorage.removeItem("selection");
      this.selectionIds = [];
    },
    updateText(part, textNew) {
      if (part != "*") {
        this.text[part] = textNew;
        let _newLoaclText = JSON.stringify(this.text);
        localStorage.setItem("sections", _newLoaclText);
      } else {
        this.text = textNew;
      }
    },
    removeSelection(target) {
      const parent = target.parentElement;
      const id = parent.id;
      const markId = target.id;
      const sectionId = target.parentNode.closest("SECTION").id;

      let newString = remove(parent.innerHTML, target.outerHTML, markId);

      let entries = this.updateSectionsObj(
        this.text.sections,
        newString,
        id,
        sectionId
      );

      function remove(init, str, id) {
        let classList = target.classList;
        let newStr = str
          .replace('<mark id="' + id + '" class="' + classList + '">', "")
          .replace("</mark>", "");
        var result = init.replace(str, newStr);
        return result;
      }

      let punkt = document.getElementById("punkt-" + markId);
      this.updateText("text", entries);
      //update selctions in store
      var _newSelection = this.selectionIds.filter((i) => {
        return i != markId.replace("highlight-", "");
      });
      this.selectionIds = _newSelection;

      localStorage.setItem("selection", JSON.stringify(_newSelection));
    },
    addSelection(selection) {
      const _selectionString = selection.toString();
      const minLength = 10;
      const id = selection.baseNode.parentNode.id;

      if (
        _selectionString.length <= minLength ||
        selection.anchorNode != selection.extentNode ||
        id.includes("highlight")
      )
        return;

      const sectionId = selection.baseNode.parentNode.closest("SECTION").id;
      let newString;
      let storedSelection = {
        id: id,
        selection: _selectionString,
      };

      let target = selection.anchorNode.parentElement.innerHTML,
        _selection = storedSelection.selection,
        _target = target,
        positionMark = _target.indexOf(_selection),
        lengthMark = _selection.length;

      newString = add(_target, _selection, positionMark, lengthMark);

      function add(init, str, index, length) {
        var result =
          init.slice(0, index) +
          "<mark id=highlight-" +
          id +
          "-" +
          index +
          " class=markerComment>" +
          str +
          "</mark>" +
          init.slice(index + length, init.length);
        return result;
      }

      let entries = this.updateSectionsObj(
        this.text.sections,
        newString,
        id,
        sectionId
      );

      var _baseId = id.replace("highlight-", "");
      this.updateText("text", entries);
      this.selectionIds.push(_baseId + "-" + positionMark);
      localStorage.setItem("selection", JSON.stringify(this.selectionIds));
    },
    updateSectionsObj(sections, newString, id, sectionId) {
      let entries = Object.entries(sections);

      //check sections
      for (var i = 0; i < entries.length; i++) {
        let section = entries[i][1];
        let _sectionId = section.id;
        if (sectionId === _sectionId) {
          //check paragraphs
          let subEntries = Object.entries(section.paragraphs);
          for (let subEntrie of subEntries) {
            let paragraph = subEntrie[1];
            let _paragraphId = paragraph.id;

            if (id === _paragraphId) {
              paragraph.text = newString;
            } else {
              if (subEntrie[1].subSection) {
                let subSection = subEntrie[1].subSection;
                for (let i in Object.values(subSection)) {
                  let subSetcion = subSection[i];
                  if (id === subSetcion.id) {
                    paragraph.text = newString;
                  } else {
                    let subSectionParagraphs = subSetcion.paragraphs;
                    for (let i in Object.values(subSectionParagraphs)) {
                      let subParagraph = subSectionParagraphs[i];
                      if (id === subParagraph.id) {
                        subParagraph.text = newString;
                      } else {
                        if (subParagraph.subSubSection) {
                          for (let i in Object.values(
                            subParagraph.subSubSection
                          )) {
                            if (id === subParagraph.subSubSection[i].id) {
                              subParagraph.subSubSection[i].text = newString;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return entries;
    },
  },
});
