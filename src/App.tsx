import { useState } from "react";
import "./style.css";

const gridSize = 10;

const generateShips = () => {
  const ships: number[][] = [];
  for (let i = 0; i < gridSize; i++) {
    ships.push([]);
    for (let j = 0; j < gridSize; j++) {
      ships[i].push(Math.random() < 0.5 ? 1 : 0);
    }
  }
  return ships;
};

const App = () => {
  const [ships, setShips] = useState(generateShips());

  const showClickResult = (row: number, col: number) => {
    const content = ships[row][col];
    const gridItem = document.querySelector(
      `.cell-${row}-${col}`,
    ) as HTMLElement;

    if (content === 1) {
      gridItem.style.backgroundColor = "red";
    } else {
      gridItem.style.backgroundColor = "white";
    }
  };

  const refreshGrid = () => {
    setShips(generateShips());

    const gridItems = document.querySelectorAll(
      ".grid-item",
    ) as NodeListOf<HTMLElement>;

    gridItems.forEach(item => (item.style.backgroundColor = "blue"));
  };

  return (
    <div className="app">
      <div className="grid">
        {ships.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((_, colIndex) => {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`grid-item cell-${rowIndex}-${colIndex}`}
                  onClick={() => showClickResult(rowIndex, colIndex)}
                  style={{ backgroundColor: "blue" }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <button className="refresh-button" onClick={refreshGrid}>
        Refresh
      </button>
    </div>
  );
};

export default App;
