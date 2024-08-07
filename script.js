const container = document.querySelector(".container");
const changeGridButton = document.querySelector(".changeGrid");

changeGridButton.addEventListener("click", (e) => {
  if (e.target.classList == "changeGrid") {
    changeGrid();
  }
});

function changeGrid() {
  //let sidelength = prompt("How many squares would you like on each edge?");
  container.childNodes.forEach((element) => {
    container.remove(container.childNodes);
  });
}

function createBoxes(number) {
  for (i = 0; i < number; i++) {
    container.appendChild(document.createElement("div"));
  }
  container.childNodes.forEach((element) => {
    element.classList.add("blankBox");
    element.addEventListener("mouseover", () => {
      element.classList.add("hoverBlackBox");
    });
    element.addEventListener("mouseleave", () => {
      element.classList.add("blankBox");
      element.classList.remove("hoverBlackBox");
    });
    element.addEventListener("click", () => {
      element.classList.add("permBlackBox");
      element.style.opacity = "100%";
    });
  });
}

createBoxes(256);
