import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Board from "./components/board";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
