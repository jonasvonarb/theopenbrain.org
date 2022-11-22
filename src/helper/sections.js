const sectionAdder = (text, { wait }) => {
  const sections = text.children;

  let counter = 0;
  for (let i = 0; i < sections.length; i++) {
    //adding Section Id
    let section = sections[i];

    if (section.tagName == "SECTION") {
      if (section.id == "") {
        counter++;
        const _h2 = section.firstChild;
        _h2.innerHTML = "<span>" + _h2.innerHTML + "</span>";
        let _listElement = document.createElement("p");
        _listElement.classList.add("titleNumber");
        let _number = document.createTextNode("Chapter " + counter);
        _listElement.appendChild(_number);
        _h2.insertBefore(_listElement, _h2.firstChild);

        const _id = _h2.id;
        section.id = _id;
      }
    }
  }
};

export { sectionAdder };
