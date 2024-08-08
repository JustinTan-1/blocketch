const container = document.querySelector(".container");
const changeGridButton = document.querySelector(".changeGrid");
const selectors = document.querySelectorAll(".selector");

let pixelColor = "black";

selectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    let split = selector.className.split(" ");
    pixelColor = split[0];
  });
});

changeGridButton.addEventListener("click", (e) => {
  if (e.target.classList == "changeGrid") {
    changeGrid();
  }
});

function changeGrid() {
  let sideNum = parseInt(
    prompt("How many squares would you like on each edge? (Max 100)")
  );
  if (parseInt(sideNum) <= 100) {
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }

    let newBoxLength = 800 / sideNum;
    createBoxes(newBoxLength);
  } else {
    alert("ERROR");
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
    element.addEventListener("mousedown", () => {
      element.classList.remove(...element.classList);
      element.classList.add(pixelColor);
    });
  });
}

createBoxes(50);
