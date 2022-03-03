import "./App.css";

import firebase from "./firebaseconfig";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Board from "./components/board";
import Temp from "./components/temp";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/:id" element={<Temp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
