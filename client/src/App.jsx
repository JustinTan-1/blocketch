
import React from "react"
import Pixel from "./components/Pixel"
import { nanoid } from 'nanoid'
import Color from "./components/Color"

function App() {
  const [color, setColor] = React.useState("white")
  const [gridSize, setGridSize] = React.useState(15)
  const [grid, setGrid] = React.useState(generateArray(gridSize)) 
  const [userGridSize, setUserGridSize] = React.useState(15)


function paintBox(id) {
  setGrid((oldGrid) => {
    return (
    oldGrid.map((box) => {
      return (
      box.id == id ? {...box, color: color} : {...box}
      )
    })
  )
  })
}

function changeColor(color) {
  setColor(color)
}

function generateBox() {
  return {color: "white", id: nanoid()}
}

function generateArray(gridSize) {
    let array = []
    for (let i = 0; i < gridSize**2; i++) {
      array[i] = generateBox();
    }
  return array
  }

function handleSubmit(e) {
  e.preventDefault()
  if (!(userGridSize > 0 && userGridSize < 100)) {
    return
  }
  else {
    setGridSize(userGridSize)
    setGrid(generateArray(userGridSize))
  }
}

function handleChange(e) {
  const {value} = e.target
  setUserGridSize(value)
}

  const diceArray = grid.map((element) => {
    return(<Pixel key={element.id} size = {gridSize} color={element.color} paintBox={() => paintBox(element.id)}></Pixel>)
  })  


  return (
    <>
    <Color color="green" changeColor = {() => changeColor("green")}></Color>
    <Color color="white" changeColor = {() => changeColor("white")}></Color>
    <form onSubmit={handleSubmit}>
    <input placeholder="grid size" value={userGridSize} onChange={handleChange}></input>
    <button type="submit">Change Grid Size</button>
    </form>
    <div className="grid" style={{display: "grid", gridTemplateColumns: `repeat(${gridSize}, ${50/gridSize}vw)`, gridTemplateRows: `repeat(${gridSize}, ${50/gridSize}vw)`}}>{diceArray}</div>
    </>
  )
}

export default App
