import React from "react";
import "./App.css";
import Puzzle from "./components/Puzzle";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tile Slide Puzzle</h1>
        <Puzzle />
      </header>
    </div>
  );
}

export default App;
