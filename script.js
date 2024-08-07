const container = document.querySelector(".container");
const changeGridButton = document.querySelector(".changeGrid");

changeGridButton.addEventListener("click", (e) => {
  if (e.target.classList == "changeGrid") {
    changeGrid();
  }
});

function changeGrid() {
  let sideNum = parseInt(
    prompt("How many squares would you like on each edge?")
  );
  if (parseInt(sideNum) <= 100) {
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }

    let newBoxLength = 800 / sideNum;
    createBoxes(newBoxLength);
  }
}

function createBoxes(length) {
  let totalBoxes = 640000 / length ** 2;
  for (i = 0; i < totalBoxes; i++) {
    container.appendChild(document.createElement("div"));
  }
  container.childNodes.forEach((element) => {
    element.style.width = `${length}px`;
    element.style.height = `${length}px`;
    element.classList.add("blankBox");
    element.addEventListener("mouseover", () => {
      element.classList.add("hoverBlackBox");
    });
    element.addEventListener("mouseleave", () => {
      element.classList.remove("hoverBlackBox");
    });
    element.addEventListener("click", () => {
      element.classList.remove("blankBox");
      element.classList.add("permBlackBox");
      element.style.opacity = "100%";
    });
  });
}

createBoxes(50);
