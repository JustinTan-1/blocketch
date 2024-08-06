const container = document.querySelector(".container");

function createBoxes(number) {
  for (i = 0; i < number; i++) {
    container.appendChild(document.createElement("div"));
  }
  container.childNodes.forEach((element) => {
    element.classList.add("box");
  });
}

createBoxes(16);
