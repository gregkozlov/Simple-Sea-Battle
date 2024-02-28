import { useState } from "react";
import "./style.css";

const gridSize = 10;

type Ship = {
  cellId: number;
  ship: boolean;
  click: boolean;
  hit: boolean;
};

const generateShips = () => {
  let cellId = 0;
  const ships: Ship[][] = [];

  for (let i = 0; i < gridSize; i++) {
    ships.push([]);
    for (let j = 0; j < gridSize; j++) {
      ships[i].push({
        cellId: cellId++,
        ship: Math.random() < 0.3,
        click: false,
        hit: false,
      });
    }
  }

  return ships;
};

const App = () => {
  const savedShipsMap = generateShips();
  const [ships, setShips] = useState(savedShipsMap);

  const refreshGrid = () => {
    const resetedBoard = ships.map(row => {
      return row.map(cell => {
        return { ...cell, click: false, hit: false };
      });
    });

    setShips(resetedBoard);
  };

  const showClickResult = (ship: Ship) => {
    const updatedBoard = ships.filter(row => {
      return row.map(cell => {
        if (cell.cellId === ship.cellId) {
          cell.click = true;
          cell.hit = cell.ship;
        }
      });
    });

    setShips(updatedBoard);
  };

  return (
    <div className="app">
      <div className="grid">
        {ships.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((ship, colIndex) => {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`grid-item`}
                  onClick={() => showClickResult(ship)}
                  style={{
                    backgroundColor: !ship.click
                      ? "blue"
                      : ship.hit
                      ? "red"
                      : "white",
                  }}
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
