import React, { useState, useEffect } from "react";
import "./index.css";

const Puzzle = () => {
  const gridSize = 3;
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    shuffleTiles();
  }, []);

  const shuffleTiles = () => {
    let shuffledTiles;
    let solvable = false;
    while (!solvable) {
      shuffledTiles = Array.from(Array(gridSize * gridSize).keys()).sort(
        () => Math.random() - 0.5
      );
      solvable = checkIfSolvable(shuffledTiles);
    }
    setTiles(shuffledTiles);
  };

  const resetGame = () => {
    shuffleTiles();
  };

  const checkIfSolvable = (tiles) => {
    let inversions = 0;
    for (let i = 0; i < tiles.length - 1; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[i] > tiles[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
  };

  const moveTile = (index) => {
    const blankIndex = tiles.indexOf(gridSize * gridSize - 1);
    const canMove =
      (index % gridSize === blankIndex % gridSize ||
        Math.floor(index / gridSize) === Math.floor(blankIndex / gridSize)) &&
      (Math.abs(index - blankIndex) === 1 ||
        Math.abs(index - blankIndex) === gridSize);

    if (canMove) {
      const newTiles = [...tiles];
      [newTiles[blankIndex], newTiles[index]] = [
        newTiles[index],
        newTiles[blankIndex],
      ];
      setTiles(newTiles);

      if (isGameWon(newTiles)) {
        setTimeout(() => {
          alert("Congratulations! You solved the puzzle!");
        }, 100);
      }
    }
  };

  const isGameWon = (tiles) => {
    return tiles.every((value, index) => value === index);
  };

  return (
    <div className="puzzle-container">
      <div className="puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={tile}
            className={`puzzle-tile ${
              tile === gridSize * gridSize - 1
                ? "puzzle-tile-blank"
                : "puzzle-tile-filled"
            }`}
            onClick={() => moveTile(index)}
          >
            {tile + 1 === gridSize * gridSize ? "" : tile + 1}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">
        Reset Game
      </button>
    </div>
  );
};

export default Puzzle;
