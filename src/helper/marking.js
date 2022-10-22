import { useText } from "../stores";

const textStore = useText();

const marker = (text, container) => {

  let _wait = setInterval(() => {
    if (container) {
      clearInterval(_wait);
      container.addEventListener("click", () => {
        let selection = document.getSelection();
        let base = selection.baseNode.parentElement;
        let extend = selection.extentNode.parentElement;

        if (base != extend) {
          alert("it is onyl supported to mark inside a paragraph");
        } else {
          textStore.addSelection(selection);
        }
      });
    }
  }, 1);

  return "Test";
};

const pointAdder = () => {
  let trigger = document.getElementById("animation-1-structures");
  trigger.addEventListener("mouseenter", () => {
    animationStore.enterHoverPunkt("animation-1-structures");
  });

  trigger.addEventListener("mouseleave", () => {
    animationStore.leaveHoverPunkt("animation-1-structures");
  });

  let triggerB = trigger.getBoundingClientRect();
  let _container = document.getElementById("containerPunkt");
  let punkt = document.createElement("div");
  punkt.classList.add("punkt");
  punkt.id = "punkt-" + trigger.id;
  punkt.style.top = window.scrollY + triggerB.y - triggerB.height / 2 + "px";

  punkt.addEventListener("mouseenter", () => {
    animationStore.enterHoverPunkt("animation-1-structures");
  });
  punkt.addEventListener("mouseleave", () => {
    animationStore.leaveHoverPunkt("animation-1-structures");
  });

  _container.appendChild(punkt);
};

export { marker, pointAdder };
