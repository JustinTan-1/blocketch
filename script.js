const container = document.querySelector(".container");

function createBoxes(number) {
  for (i = 0; i < number; i++) {
    container.appendChild(document.createElement("div"));
  }
  const testArray = container.childNodes;
  console.log(testArray);
  container.childNodes.forEach((element) => {
    element.classList.add("box");
    element.addEventListener("mouseover", () => {
      element.style.backgroundColor = "black";
    });
  });
}

createBoxes(256);
