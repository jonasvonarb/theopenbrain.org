import { useGeneral } from "../stores";

const toSlug = (str) => {
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
};

const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replaceAll("-", "")
    .replaceAll(")", "")
    .replaceAll("(", "");
};

const addH = (event) => {
  const store = useGeneral();
  if (!store.animationActive) return;
  let paths = document.getElementsByClassName(event.target.id + "Highlight");
  let text = event.target;

  if (paths.length === 0) {
    paths = document.getElementsByClassName(
      event.target.closest(".highlighterIllu").classList[0]
    );
    text = document.getElementById(
      event.target
        .closest(".highlighterIllu")
        .classList[0].replace("Highlight", "")
    );
  }
  for (const path of paths) {
    path.classList.add("highlightIllu");
    text.classList.add("highlightText");
  }
};
const removeH = (event) => {
  const store = useGeneral();
  if (!store.animationActive) return;
  let paths = document.getElementsByClassName(event.target.id + "Highlight");
  let text = event.target;

  if (paths.length === 0) {
    paths = document.getElementsByClassName(
      event.target.closest(".highlighterIllu").classList[0]
    );
    text = document.getElementById(
      event.target
        .closest(".highlighterIllu")
        .classList[0].replace("Highlight", "")
    );
  }
  for (const path of paths) {
    path.classList.remove("highlightIllu");
    text.classList.remove("highlightText");
  }
};

export { toSlug, addH, removeH, toCamelCase };
